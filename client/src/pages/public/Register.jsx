import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import PageHeader from '../../components/common/PageHeader'
import { useAuth } from '../../hooks/useAuth'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await register(form)
      showSuccessToast('Account created successfully')
      navigate('/profile', { replace: true })
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return <><PageHeader eyebrow="Join Zivaro" title="Create your account" subtitle="Create a secure profile for faster checkout and personalized fashion picks." /><section className="section-y"><Container><form onSubmit={handleSubmit} className="luxury-card mx-auto max-w-md p-8"><Input label="Name" name="name" value={form.name} onChange={updateField} placeholder="Your name" required /><Input className="mt-5" label="Email" name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required /><Input className="mt-5" label="Phone" name="phone" value={form.phone} onChange={updateField} placeholder="9876543210" /><Input className="mt-5" label="Password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={updateField} placeholder="••••••••" hint="Use at least 8 characters with uppercase, lowercase, and a number." required iconRight={<button type="button" onClick={()=>setShowPassword((current)=>!current)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="text-lg hover:text-accent">{showPassword ? <FiEyeOff /> : <FiEye />}</button>} /><Button className="mt-7 w-full" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</Button><p className="mt-6 text-center small-text">Already registered? <Link className="text-accent" to="/login">Login</Link></p></form></Container></section></>
}

export default Register
