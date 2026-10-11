import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react'
import { RECAPTCHA_SITE_KEY } from '../config/emailjs'

const SCRIPT_URL = 'https://www.google.com/recaptcha/api.js?render=explicit'
let scriptPromise = null

export function loadRecaptchaScript() {
  if (window.grecaptcha && window.grecaptcha.render) return Promise.resolve()
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    let settled = false
    const poll = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.render) {
        settled = true
        clearInterval(poll)
        clearTimeout(timeout)
        resolve()
      }
    }, 100)
    const timeout = setTimeout(() => {
      if (!settled) {
        clearInterval(poll)
        scriptPromise = null
        reject(new Error('reCAPTCHA failed to load in time'))
      }
    }, 15000)
    if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
      const script = document.createElement('script')
      script.src = SCRIPT_URL
      script.async = true
      script.defer = true
      script.onerror = () => { clearInterval(poll); clearTimeout(timeout); scriptPromise = null; reject(new Error('reCAPTCHA script failed to load')) }
      document.head.appendChild(script)
    }
  })
  return scriptPromise
}

const RecaptchaCheckbox = forwardRef(function RecaptchaCheckbox({ siteKey = RECAPTCHA_SITE_KEY, onChange }, ref) {
  const [error, setError] = useState(false)
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)

  useImperativeHandle(ref, () => ({
    reset: () => {
      setError(false)
      if (typeof onChange === 'function') onChange('')
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current)
      }
    },
  }))

  useEffect(() => {
    let active = true
    loadRecaptchaScript()
      .then(() => {
        if (!active || !containerRef.current || !window.grecaptcha || !window.grecaptcha.render) return
        containerRef.current.innerHTML = ''
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: (token) => { if (active && typeof onChange === 'function') onChange(token) },
          'expired-callback': () => { if (active && typeof onChange === 'function') onChange('') },
          'error-callback': () => { if (active) setError(true) },
        })
      })
      .catch(() => { if (active) setError(true) })
    return () => { active = false }
  }, [siteKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div ref={containerRef} className="flex justify-center min-h-[78px]" />
      {error && (
        <p className="text-amber-600 text-xs text-center">
          Couldn't load reCAPTCHA. Please refresh the page or contact us directly.
        </p>
      )}
    </div>
  )
})

export default RecaptchaCheckbox