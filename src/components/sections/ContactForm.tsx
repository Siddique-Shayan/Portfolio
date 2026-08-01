import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertCircle, FiCheckCircle, FiLoader, FiSend } from 'react-icons/fi'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { useContactForm } from '@/hooks/useContactForm'
import { fadeUp } from '@/animations/variants'

const inputClasses =
  'w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-primary-400'

export function ContactForm() {
  const { values, status, error, handleChange, handleSubmit } = useContactForm()
  const isSubmitting = status === 'submitting'

  return (
    <motion.div variants={fadeUp}>
      <GlassCard className="p-6 sm:p-8">
        <h3 className="mb-1 font-display text-lg font-semibold text-[var(--text-primary)]">Send a message</h3>
        <p className="mb-6 text-sm text-[var(--text-secondary)]">
          Have a project, role, or question in mind? Drop a message and I'll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Honeypot — hidden from real visitors, bots tend to fill every field they find. */}
          <input
            type="text"
            name="company"
            value={values.company}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={100}
              value={values.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              maxLength={200}
              value={values.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              maxLength={5000}
              value={values.message}
              onChange={handleChange}
              placeholder="What would you like to talk about?"
              className={`${inputClasses} resize-none`}
            />
          </div>

          <Button type="submit" variant="primary" disabled={isSubmitting} icon={isSubmitting ? <FiLoader className="animate-spin" /> : <FiSend />}>
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </Button>

          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-emerald-500"
                role="status"
              >
                <FiCheckCircle /> Message sent — thanks for reaching out! I'll reply soon.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-red-500"
                role="alert"
              >
                <FiAlertCircle /> {error}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </GlassCard>
    </motion.div>
  )
}
