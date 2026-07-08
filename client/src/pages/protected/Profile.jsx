import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import PageHeader from '../../components/common/PageHeader'
import { useAuth } from '../../hooks/useAuth'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const Profile = () => {
  const { user, updateProfile, changePassword, logout } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    country: user?.country || '',
    pincode: user?.pincode || '',
  })
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' })
  const [saving, setSaving] = useState(false)
  const [changing, setChanging] = useState(false)

  const updateProfileField = (event) => setProfile((current) => ({ ...current, [event.target.name]: event.target.value }))
  const updatePasswordField = (event) => setPasswords((current) => ({ ...current, [event.target.name]: event.target.value }))

  const handleProfileSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      await updateProfile(profile)
      showSuccessToast('Profile updated successfully')
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Profile update failed')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordSubmit = async (event) => {
    event.preventDefault()
    setChanging(true)
    try {
      await changePassword(passwords)
      setPasswords({ currentPassword: '', newPassword: '' })
      showSuccessToast('Password changed successfully')
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Password change failed')
    } finally {
      setChanging(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    showSuccessToast('Logged out successfully')
    navigate('/login', { replace: true })
  }

  return <><PageHeader eyebrow="My Account" title={`Welcome${user?.name ? `, ${user.name}` : ''}`} subtitle="Manage your profile, security and account preferences." /><section className="section-y"><Container><div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><form onSubmit={handleProfileSubmit} className="luxury-card p-8"><h2 className="font-serif text-2xl text-primary">Profile Details</h2><p className="mt-2 small-text">{user?.email} · {user?.role}</p><Input className="mt-6" label="Name" name="name" value={profile.name} onChange={updateProfileField} /><Input className="mt-5" label="Phone" name="phone" value={profile.phone} onChange={updateProfileField} /><Input className="mt-5" label="Address" name="address" value={profile.address} onChange={updateProfileField} /><div className="mt-5 grid gap-5 md:grid-cols-2"><Input label="City" name="city" value={profile.city} onChange={updateProfileField} /><Input label="State" name="state" value={profile.state} onChange={updateProfileField} /><Input label="Country" name="country" value={profile.country} onChange={updateProfileField} /><Input label="Pincode" name="pincode" value={profile.pincode} onChange={updateProfileField} /></div><Button className="mt-7" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Update Profile'}</Button></form><div className="space-y-6"><form onSubmit={handlePasswordSubmit} className="luxury-card p-8"><h2 className="font-serif text-2xl text-primary">Security</h2><Input className="mt-6" label="Current Password" name="currentPassword" type="password" value={passwords.currentPassword} onChange={updatePasswordField} required /><Input className="mt-5" label="New Password" name="newPassword" type="password" value={passwords.newPassword} onChange={updatePasswordField} required /><Button className="mt-7 w-full" type="submit" disabled={changing}>{changing ? 'Changing...' : 'Change Password'}</Button></form><div className="luxury-card p-8"><h2 className="font-serif text-2xl text-primary">Session</h2><p className="mt-2 small-text">Logout clears your secure session cookies and account state.</p><Button className="mt-6 w-full" variant="outline" onClick={handleLogout}>Logout</Button></div></div></div></Container></section></>
}

export default Profile
