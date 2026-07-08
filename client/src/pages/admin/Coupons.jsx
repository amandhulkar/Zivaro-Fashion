import { useEffect, useState } from 'react'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { adminApi } from '../../services/admin/adminApi'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const Coupons = () => {
  const [coupons, setCoupons] = useState([])
  const [form, setForm] = useState({ code: '', discountType: 'percentage', discountValue: 10, minOrderAmount: 0 })
  const [loading, setLoading] = useState(true)
  const load = () => adminApi.listCoupons().then(({ data }) => setCoupons(data || [])).finally(()=>setLoading(false))
  useEffect(() => { load() }, [])
  const update = (event) => setForm((current)=>({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event) => { event.preventDefault(); try { await adminApi.createCoupon({ ...form, discountValue: Number(form.discountValue), minOrderAmount: Number(form.minOrderAmount) }); setForm({ code: '', discountType: 'percentage', discountValue: 10, minOrderAmount: 0 }); showSuccessToast('Coupon created'); load() } catch (error) { showErrorToast(error.response?.data?.message || 'Coupon save failed') } }
  return <section><AdminPageHeader eyebrow="Promotions" title="Coupons" subtitle="Create and manage coupon discounts." /><form onSubmit={submit} className="luxury-card mb-6 grid gap-4 p-4 md:grid-cols-5"><Input label="Code" name="code" value={form.code} onChange={update} required /><label className="block space-y-2"><span className="small-text font-medium text-text">Type</span><select name="discountType" value={form.discountType} onChange={update} className="focus-ring w-full rounded-2xl border border-line bg-secondary px-4 py-3 text-sm"><option value="percentage">Percentage</option><option value="fixed">Fixed</option></select></label><Input label="Discount" name="discountValue" type="number" value={form.discountValue} onChange={update} /><Input label="Minimum Order" name="minOrderAmount" type="number" value={form.minOrderAmount} onChange={update} /><Button type="submit">Create</Button></form><DataTable loading={loading} rows={coupons} columns={[{ key: 'code', label: 'Code' }, { key: 'discountType', label: 'Type' }, { key: 'discountValue', label: 'Value' }, { key: 'minOrderAmount', label: 'Minimum' }, { key: 'isActive', label: 'Status', render: (row)=><StatusBadge status={row.isActive ? 'active' : 'inactive'} /> }]} /></section>
}
export default Coupons
