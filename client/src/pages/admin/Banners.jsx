import { useEffect, useState } from 'react'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { adminApi } from '../../services/admin/adminApi'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const Banners = () => {
  const [banners, setBanners] = useState([])
  const [form, setForm] = useState({ title: '', subtitle: '', placement: 'home-hero', ctaText: '', ctaUrl: '' })
  const [loading, setLoading] = useState(true)
  const load = () => adminApi.listBanners().then(({ data }) => setBanners(data || [])).finally(()=>setLoading(false))
  useEffect(() => { load() }, [])
  const update = (event) => setForm((current)=>({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event) => { event.preventDefault(); try { await adminApi.createBanner(form); setForm({ title: '', subtitle: '', placement: 'home-hero', ctaText: '', ctaUrl: '' }); showSuccessToast('Banner created'); load() } catch (error) { showErrorToast(error.response?.data?.message || 'Banner save failed') } }
  return <section><AdminPageHeader eyebrow="Content" title="Banners" subtitle="Manage homepage, offer, festival and hero banners." /><form onSubmit={submit} className="luxury-card mb-6 grid gap-4 p-4 md:grid-cols-3"><Input label="Title" name="title" value={form.title} onChange={update} required /><Input label="Subtitle" name="subtitle" value={form.subtitle} onChange={update} /><label className="block space-y-2"><span className="small-text font-medium text-text">Placement</span><select name="placement" value={form.placement} onChange={update} className="focus-ring w-full rounded-2xl border border-line bg-secondary px-4 py-3 text-sm"><option value="home-hero">Homepage Hero</option><option value="home-secondary">Offer Banner</option><option value="category">Category Banner</option><option value="promo">Festival/Promo</option></select></label><Input label="CTA Text" name="ctaText" value={form.ctaText} onChange={update} /><Input label="CTA URL" name="ctaUrl" value={form.ctaUrl} onChange={update} /><Button type="submit">Create</Button></form><DataTable loading={loading} rows={banners} columns={[{ key: 'title', label: 'Title' }, { key: 'placement', label: 'Placement' }, { key: 'sortOrder', label: 'Order' }, { key: 'isActive', label: 'Status', render: (row)=><StatusBadge status={row.isActive ? 'active' : 'inactive'} /> }]} /></section>
}
export default Banners
