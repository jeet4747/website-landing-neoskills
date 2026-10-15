import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE_INQUIRY, EMAILJS_PUBLIC_KEY } from './emailjs'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const BACKEND_TIMEOUT_MS = 6000

/**
 * Submit a lead.
 *
 * 1. The lead is saved on our own backend first, so it is never lost
 *    (retrievable at GET /api/leads) — see server/index.cjs.
 * 2. Email delivery goes through EmailJS (works over HTTPS). The backend only
 *    sends the email itself when an email API key is configured; otherwise
 *    EmailJS is the delivery channel. This avoids double-sending.
 *
 * @param {object} lead - { name, email, phone, course, message, captchaToken, source }
 * @param {object} [opts] - { templateId, emailjsParams, source }
 */
export async function submitLead(lead, opts = {}) {
  const { templateId = EMAILJS_TEMPLATE_INQUIRY, emailjsParams, source } = opts

  const payload = {
    name: lead.name || '',
    email: lead.email || '',
    phone: lead.phone || '',
    course: lead.course || '',
    message: lead.message || '',
    source: source || lead.source || 'website',
    'g-recaptcha-response': lead.captchaToken || '',
  }

  const params = emailjsParams || {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    course: payload.course,
    message: payload.message,
    'g-recaptcha-response': payload['g-recaptcha-response'],
  }

  // ── 1. Persist on the backend (never fail the whole submit if this hiccups) ──
  let storedOnBackend = false
  let backendHandlesEmail = false
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), BACKEND_TIMEOUT_MS)
    const res = await fetch(`${BACKEND_URL}/api/leads`, {
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
    }
  } catch {
    /* backend unreachable — EmailJS still delivers the lead */
  }

  // ── 2. Deliver the email via EmailJS unless the backend is doing it ──
  if (backendHandlesEmail) return { via: 'backend', stored: storedOnBackend }

  try {
    await emailjs.send(EMAILJS_SERVICE, templateId, params, EMAILJS_PUBLIC_KEY)
    return { via: 'emailjs', stored: storedOnBackend }
  } catch (err) {
    console.error('EmailJS send failed:', err?.text || err?.message || err)
    // The lead is still stored on the backend, so the submission is not lost.
    if (storedOnBackend) return { via: 'backend', emailSent: false, stored: true }
    throw err
  }
}

export default submitLead
