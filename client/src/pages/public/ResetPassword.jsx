import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import PageHeader from '../../components/common/PageHeader'
import { useAuth } from '../../hooks/useAuth'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const ResetPassword = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const { token } = useParams()
  const { resetPassword } = useAuth()
  const navigate = useNavigate()

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (form.password !== form.confirmPassword) {
      showErrorToast('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await resetPassword(token, form.password)
      showSuccessToast('Password reset successfully')
      navigate('/profile', { replace: true })
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Password reset failed')
    } finally {
      setLoading(false)
    }
  }

  return <><PageHeader eyebrow="Secure Reset" title="Choose a new password" subtitle="Create a strong password to protect your Zivaro account." /><section className="section-y"><Container><form onSubmit={handleSubmit} className="luxury-card mx-auto max-w-md p-8"><Input label="New Password" name="password" type="password" value={form.password} onChange={updateField} required /><Input className="mt-5" label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField} required /><Button className="mt-7 w-full" type="submit" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</Button></form></Container></section></>
}

export default ResetPassword
