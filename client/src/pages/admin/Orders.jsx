import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import { adminApi } from '../../services/admin/adminApi'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const load = () => adminApi.listOrders().then(({ data }) => setOrders(data || [])).finally(()=>setLoading(false))
  useEffect(() => { load() }, [])
  const accept = async (id) => { try { await adminApi.acceptOrder(id); showSuccessToast('Order accepted'); load() } catch (error) { showErrorToast(error.response?.data?.message || 'Accept failed') } }
  const reject = async (id) => { try { await adminApi.rejectOrder(id, { reason: 'Rejected by admin' }); showSuccessToast('Order rejected'); load() } catch (error) { showErrorToast(error.response?.data?.message || 'Reject failed') } }
  return <section><AdminPageHeader eyebrow="Fulfillment" title="Orders" subtitle="Accept, reject and process customer orders." /><DataTable loading={loading} rows={orders} columns={[{ key: 'orderNumber', label: 'Order' }, { key: 'user', label: 'Customer', render: (row)=>row.user?.name || row.user?.email || 'Guest' }, { key: 'status', label: 'Status', render: (row)=><StatusBadge status={row.status} /> }, { key: 'paymentStatus', label: 'Payment', render: (row)=><StatusBadge status={row.paymentStatus} /> }, { key: 'total', label: 'Total', render: (row)=>currency.format(row.total || 0) }, { key: 'actions', label: 'Actions', render: (row)=><div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" to={`/admin/orders/${row._id}`}>View</Button>{row.status === 'pending' && <><Button size="sm" onClick={()=>accept(row._id)}>Accept</Button><Button size="sm" variant="ghost" onClick={()=>reject(row._id)}>Reject</Button></>}</div> }]} /></section>
}
export default Orders
