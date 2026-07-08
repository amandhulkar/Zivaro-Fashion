import { useEffect, useState } from 'react'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { adminApi } from '../../services/admin/adminApi'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([])
  const [form, setForm] = useState({ name: '', phone: '', email: '', gstNumber: '' })
  const [loading, setLoading] = useState(true)
  const load = () => adminApi.listSuppliers().then(({ data }) => setSuppliers(data || [])).finally(()=>setLoading(false))
  useEffect(() => { load() }, [])
  const update = (event) => setForm((current)=>({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event) => { event.preventDefault(); try { await adminApi.createSupplier(form); setForm({ name: '', phone: '', email: '', gstNumber: '' }); showSuccessToast('Supplier created'); load() } catch (error) { showErrorToast(error.response?.data?.message || 'Supplier save failed') } }
  return <section><AdminPageHeader eyebrow="Purchasing" title="Suppliers" subtitle="Manage supplier contact and GST information." /><form onSubmit={submit} className="luxury-card mb-6 grid gap-4 p-4 md:grid-cols-5"><Input label="Name" name="name" value={form.name} onChange={update} required /><Input label="Phone" name="phone" value={form.phone} onChange={update} /><Input label="Email" name="email" value={form.email} onChange={update} /><Input label="GST Number" name="gstNumber" value={form.gstNumber} onChange={update} /><Button type="submit">Create</Button></form><DataTable loading={loading} rows={suppliers} columns={[{ key: 'name', label: 'Supplier' }, { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' }, { key: 'gstNumber', label: 'GST' }, { key: 'status', label: 'Status', render: (row)=><StatusBadge status={row.status} /> }]} /></section>
}
export default Suppliers
