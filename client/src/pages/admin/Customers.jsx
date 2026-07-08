import { useEffect, useState } from 'react'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import { adminApi } from '../../services/admin/adminApi'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const load = () => adminApi.listCustomers().then(({ data }) => setCustomers(data || [])).finally(()=>setLoading(false))
  useEffect(() => { load() }, [])
  const toggle = async (customer) => { try { await adminApi.updateCustomerStatus(customer._id, { status: customer.status === 'active' ? 'blocked' : 'active' }); showSuccessToast('Customer updated'); load() } catch (error) { showErrorToast(error.response?.data?.message || 'Customer update failed') } }
  return <section><AdminPageHeader eyebrow="CRM" title="Customers" subtitle="Search, view, block and activate customers." /><DataTable loading={loading} rows={customers} columns={[{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Status', render: (row)=><StatusBadge status={row.status} /> }, { key: 'actions', label: 'Actions', render: (row)=><Button size="sm" variant="outline" onClick={()=>toggle(row)}>{row.status === 'active' ? 'Block' : 'Activate'}</Button> }]} /></section>
}
export default Customers
