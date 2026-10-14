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

  try {
    const res = await fetch(`${BACKEND_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) return { via: 'backend' }
  } catch {
    /* backend unreachable — fall back to EmailJS */
  }

  const params = emailjsParams || {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    course: payload.course,
    message: payload.message,
    'g-recaptcha-response': payload['g-recaptcha-response'],
  }
  await emailjs.send(EMAILJS_SERVICE, templateId, params, EMAILJS_PUBLIC_KEY)
  return { via: 'emailjs' }
}

export default submitLead
