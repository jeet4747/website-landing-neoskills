import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE_INQUIRY, EMAILJS_PUBLIC_KEY } from './emailjs'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const BACKEND_TIMEOUT_MS = 6000

function getLeadMeta() {
  if (typeof window === 'undefined') return {}
  try {
    const url = new URL(window.location.href)
    const params = url.searchParams
    return {
      landingPage: url.pathname + url.search,
      pagePath: url.pathname,
      fullUrl: window.location.href,
      pageUrl: window.location.href,
      pageTitle: document.title || '',
      referrer: document.referrer || '',
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
      gclid: params.get('gclid') || '',
      fbclid: params.get('fbclid') || '',
      msclkid: params.get('msclkid') || '',
      device: /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    }
  } catch {
    return {}
  }
}

/**
 * Submit a lead.
 *
 * 1. The lead is saved on our own backend first, so it is never lost
 *    (retrievable at GET /api/leads in Admin Dashboard).
 * 2. Email delivery goes through EmailJS (or backend provider if configured).
 *
 * @param {object} lead - { name, email, phone, course, message, captchaToken, source }
 * @param {object} [opts] - { templateId, emailjsParams, source }
 */
export async function submitLead(lead, opts = {}) {
  const { templateId = EMAILJS_TEMPLATE_INQUIRY, emailjsParams, source } = opts
  const meta = getLeadMeta()

  const payload = {
    name: (lead.name || '').trim(),
    email: (lead.email || '').trim(),
    phone: (lead.phone || '').trim(),
    course: lead.course || '',
    message: lead.message || '',
    source: source || lead.source || 'website',
    'g-recaptcha-response': lead.captchaToken || '',
    ...meta,
  }

  // Populate rich parameter aliases so whichever template variables EmailJS uses will match
  const params = emailjsParams || {
    name: payload.name,
    from_name: payload.name,
    user_name: payload.name,
    phone: payload.phone,
    user_phone: payload.phone,
    contact_number: payload.phone,
    phone_number: payload.phone,
    email: payload.email || 'callback-request@neoskills.co.in',
    user_email: payload.email || 'callback-request@neoskills.co.in',
    reply_to: payload.email || 'contact@neoskills.co.in',
    course: payload.course || 'General Inquiry',
    message: payload.message || 'Counsellor callback requested',
    source: payload.source,
    'g-recaptcha-response': payload['g-recaptcha-response'],
  }

  // ── 1. Persist on the backend first (try BACKEND_URL and relative /api/leads) ──
  let storedOnBackend = false
  let backendHandlesEmail = false

  const candidateUrls = []
  if (BACKEND_URL) candidateUrls.push(`${BACKEND_URL}/api/leads`)
  if (!BACKEND_URL || BACKEND_URL.includes('localhost')) {
    candidateUrls.push('/api/leads')
  }

  for (const url of candidateUrls) {
    if (storedOnBackend) break
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), BACKEND_TIMEOUT_MS)
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      clearTimeout(timer)
      if (res.ok) {
        storedOnBackend = true
        const data = await res.json().catch(() => ({}))
        backendHandlesEmail = data.emailProvider === true
        break
      }
    } catch {
      /* try next candidate URL or fallback to EmailJS */
    }
  }

  // ── 2. Deliver the email via EmailJS unless the backend has an active provider ──
  if (backendHandlesEmail) {
    return { via: 'backend', stored: storedOnBackend }
  }

  try {
    await emailjs.send(EMAILJS_SERVICE, templateId, params, EMAILJS_PUBLIC_KEY)
    return { via: 'emailjs', stored: storedOnBackend }
  } catch (err) {
    console.warn('EmailJS delivery warning:', err?.text || err?.message || err)
    // If the lead was safely stored on backend, do NOT throw an error to the user!
    // The admin will see it in the Admin Dashboard anyway.
    if (storedOnBackend) {
      return { via: 'backend', emailSent: false, stored: true }
    }
    throw err
  }
}

export default submitLead
