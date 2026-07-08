import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import { adminApi } from '../../services/admin/adminApi'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
const statuses = ['pending', 'accepted', 'packed', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded']

const OrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('')
  const load = () => adminApi.getOrder(id).then(({ data }) => { setOrder(data); setStatus(data?.status || '') })
  useEffect(() => { load() }, [id])
  const updateStatus = async () => { try { await adminApi.updateOrderStatus(id, { status }); showSuccessToast('Order status updated'); load() } catch (error) { showErrorToast(error.response?.data?.message || 'Status update failed') } }
  if (!order) return <section className="luxury-card p-6 text-muted">Loading order...</section>
  return <section><AdminPageHeader eyebrow="Fulfillment" title={`Order ${order.orderNumber || order._id}`} subtitle="Review customer details, products, payment and timeline." action={<Button variant="outline" onClick={()=>window.print()}>Print Invoice</Button>} /><div className="grid gap-6 lg:grid-cols-3"><div className="luxury-card p-6"><p className="small-text">Customer</p><h3 className="mt-2 font-serif text-xl text-primary">{order.user?.name || order.customer?.name || 'Customer'}</h3><p className="mt-2 text-sm text-muted">{order.user?.email || order.customer?.email}</p><p className="text-sm text-muted">{order.customer?.phone}</p></div><div className="luxury-card p-6"><p className="small-text">Status</p><div className="mt-3 flex gap-2"><StatusBadge status={order.status} /><StatusBadge status={order.paymentStatus} /></div><select className="mt-5 w-full rounded-2xl border border-line bg-secondary px-4 py-3 text-sm" value={status} onChange={(e)=>setStatus(e.target.value)}>{statuses.map((s)=><option key={s} value={s}>{s}</option>)}</select><Button className="mt-4 w-full" onClick={updateStatus}>Update Status</Button></div><div className="luxury-card p-6"><p className="small-text">Total</p><p className="mt-3 text-3xl font-bold text-primary">{currency.format(order.total || 0)}</p><p className="mt-2 text-sm text-muted">Payment: {order.paymentStatus}</p></div></div><div className="mt-6"><DataTable rows={order.items || []} columns={[{ key: 'title', label: 'Product' }, { key: 'sku', label: 'SKU' }, { key: 'quantity', label: 'Qty' }, { key: 'price', label: 'Price', render: (row)=>currency.format(row.price || row.unitPrice || 0) }]} /></div><div className="mt-6 luxury-card p-6"><p className="small-text">Timeline</p><div className="mt-4 space-y-3">{(order.statusHistory || []).map((entry, index)=><div key={index} className="rounded-2xl bg-background p-4"><StatusBadge status={entry.status} /><p className="mt-2 text-sm text-muted">{entry.note || 'Status updated'} · {entry.changedAt ? new Date(entry.changedAt).toLocaleString() : ''}</p></div>)}</div></div></section>
}
export default OrderDetails
