import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE_INQUIRY, EMAILJS_PUBLIC_KEY } from './emailjs'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

/**
 * Submit a lead. Persists it on our own backend first (so a lead is never lost),
 * then falls back to EmailJS only if the backend is unreachable.
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

  const sendViaEmailJS = async () => {
    await emailjs.send(EMAILJS_SERVICE, templateId, params, EMAILJS_PUBLIC_KEY)
    return { via: 'emailjs' }
  }

  let storedOnBackend = false
  let emailSent = false
  try {
    const res = await fetch(`${BACKEND_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      storedOnBackend = true
      const data = await res.json().catch(() => ({}))
      emailSent = data.emailSent === true
    }
  } catch {
    /* backend unreachable — fall back to EmailJS */
  }

  // Backend stored the lead and its own email notification succeeded.
  if (storedOnBackend && emailSent) return { via: 'backend' }

  // Backend stored the lead but could NOT email it (e.g. SMTP down) — try EmailJS too
  // so the notification still reaches the inbox. Never throw here: the lead is saved.
  if (storedOnBackend) {
    try {
      await sendViaEmailJS()
      return { via: 'backend+emailjs' }
    } catch (err) {
      console.error('Lead saved on backend, but both email channels failed:', err?.text || err?.message || err)
      return { via: 'backend', emailSent: false }
    }
  }

  // Backend unreachable — EmailJS is the only channel left.
  return await sendViaEmailJS()
}

export default submitLead
