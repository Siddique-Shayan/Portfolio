import { useState, type ChangeEvent, type FormEvent } from 'react'

interface ContactFormValues {
  name: string
  email: string
  message: string
  company: string // honeypot — left blank by real visitors
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialValues: ContactFormValues = { name: '', email: '', message: '', company: '' }

/** Owns the contact form's state and submits it to the /api/contact serverless function. */
export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setValues(initialValues)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return { values, status, error, handleChange, handleSubmit }
}
