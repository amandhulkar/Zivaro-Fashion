import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import PageHeader from '../../components/common/PageHeader'
import { useAuth } from '../../hooks/useAuth'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [loading, setLoading] = useState(false)
  const { forgotPassword } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const data = await forgotPassword(email)
      setResetToken(data?.resetToken || '')
      showSuccessToast('If an account exists, password reset instructions have been sent')
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Unable to start password reset')
    } finally {
      setLoading(false)
    }
  }

  return <><PageHeader eyebrow="Account Help" title="Reset your password" subtitle="Enter your email and we will prepare secure reset instructions." /><section className="section-y"><Container><form onSubmit={handleSubmit} className="luxury-card mx-auto max-w-md p-8"><Input label="Email" type="email" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="you@example.com" required /><Button className="mt-7 w-full" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</Button>{resetToken && <p className="mt-5 rounded-2xl bg-background p-4 text-xs text-muted">Development reset token: <Link className="text-accent" to={`/reset-password/${resetToken}`}>Open reset page</Link></p>}<p className="mt-6 text-center small-text"><Link className="text-accent" to="/login">Back to login</Link></p></form></Container></section></>
}

export default ForgotPassword
