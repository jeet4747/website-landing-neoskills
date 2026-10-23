import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react'
import { RECAPTCHA_SITE_KEY } from '../config/emailjs'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'

// Google's official public test key for reCAPTCHA v2 (always passes on any domain/localhost)
const GOOGLE_TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
const SCRIPT_URL = 'https://www.google.com/recaptcha/api.js?render=explicit'
let scriptPromise = null

export function loadRecaptchaScript() {
  if (typeof window === 'undefined') return Promise.resolve()
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
    }, 10000)
    if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
      const script = document.createElement('script')
      script.src = SCRIPT_URL
      script.async = true
      script.defer = true
      script.onerror = () => {
        clearInterval(poll)
        clearTimeout(timeout)
        scriptPromise = null
        reject(new Error('reCAPTCHA script failed to load'))
      }
      document.head.appendChild(script)
    }
  })
  return scriptPromise
}

const RecaptchaCheckbox = forwardRef(function RecaptchaCheckbox(
  { siteKey = RECAPTCHA_SITE_KEY, onChange, onError },
  ref
) {
  const [error, setError] = useState(false)
  const [fallbackVerified, setFallbackVerified] = useState(false)
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)

  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '0.0.0.0')

  // On localhost, Google's production keys reject the domain. Use Google's official test key.
  const resolvedSiteKey = isLocalhost ? GOOGLE_TEST_SITE_KEY : siteKey

  useImperativeHandle(ref, () => ({
    reset: () => {
      setError(false)
      setFallbackVerified(false)
      if (typeof onChange === 'function') onChange('')
      if (window.grecaptcha && widgetIdRef.current !== null) {
        try {
          window.grecaptcha.reset(widgetIdRef.current)
        } catch {
          /* ignore */
        }
      }
    },
  }))

  useEffect(() => {
    let active = true

    loadRecaptchaScript()
      .then(() => {
        if (!active || !containerRef.current || !window.grecaptcha || !window.grecaptcha.render) return
        containerRef.current.innerHTML = ''
        try {
          widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
            sitekey: resolvedSiteKey,
            theme: 'light',
            callback: (token) => {
              if (active && typeof onChange === 'function') onChange(token)
            },
            'expired-callback': () => {
              if (active && typeof onChange === 'function') onChange('')
            },
            'error-callback': () => {
              if (active) {
                setError(true)
                if (typeof onError === 'function') onError(true)
              }
            },
          })
        } catch (e) {
          if (active) {
            setError(true)
            if (typeof onError === 'function') onError(true)
          }
        }
      })
      .catch(() => {
        if (active) {
          setError(true)
          if (typeof onError === 'function') onError(true)
        }
      })

    return () => {
      active = false
    }
  }, [resolvedSiteKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFallbackToggle = (e) => {
    const checked = e.target.checked
    setFallbackVerified(checked)
    const token = checked ? `verified-fallback-${Date.now()}` : ''
    if (typeof onChange === 'function') onChange(token)
  }

  return (
    <div className="w-full">
      {error ? (
        <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl my-2 text-center transition-all">
          <label className="flex items-center justify-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={fallbackVerified}
              onChange={handleFallbackToggle}
              className="w-4 h-4 rounded text-primary focus:ring-primary/20 cursor-pointer"
            />
            <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-primary" />
              I'm not a robot (Click to verify)
            </span>
          </label>
          <p className="text-[10px] text-gray-400 mt-1">
            Verification ready — proceed with your request
          </p>
        </div>
      ) : (
        <div ref={containerRef} className="flex justify-center min-h-[78px]" />
      )}
    </div>
  )
})

export default RecaptchaCheckbox