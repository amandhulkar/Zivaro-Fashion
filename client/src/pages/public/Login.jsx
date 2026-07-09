import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import PageHeader from '../../components/common/PageHeader'
import { useAuth } from '../../hooks/useAuth'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/profile'

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await login(form)
      showSuccessToast('Logged in successfully')
      navigate(from, { replace: true })
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return <><PageHeader eyebrow="Account" title="Welcome back" subtitle="Sign in securely to continue your Zivaro experience." /><section className="section-y"><Container><form onSubmit={handleSubmit} className="luxury-card mx-auto max-w-md p-8"><Input label="Email" name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required /><Input className="mt-5" label="Password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={updateField} placeholder="••••••••" required iconRight={<button type="button" onClick={()=>setShowPassword((current)=>!current)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="text-lg hover:text-accent">{showPassword ? <FiEyeOff /> : <FiEye />}</button>} /><div className="mt-4 text-right"><Link className="small-text text-accent" to="/forgot-password">Forgot password?</Link></div><Button className="mt-7 w-full" type="submit" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</Button><p className="mt-6 text-center small-text">New to Zivaro? <Link className="text-accent" to="/register">Create account</Link></p></form></Container></section></>
}

export default Login
