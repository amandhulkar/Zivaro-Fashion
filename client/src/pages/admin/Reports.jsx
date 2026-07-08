import { useEffect, useState } from 'react'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import CsvExportButton from '../../components/admin/CsvExportButton'
import DataTable from '../../components/admin/DataTable'
import { adminApi } from '../../services/admin/adminApi'

const Reports = () => {
  const [type, setType] = useState('sales')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { setLoading(true); adminApi.getReport(type).then(({ data }) => setRows(data?.rows || [])).finally(()=>setLoading(false)) }, [type])
  return <section><AdminPageHeader eyebrow="Analytics" title="Reports" subtitle="Download sales, product, customer, inventory and revenue reports." action={<CsvExportButton href={adminApi.reportCsvUrl(type)} />} /><div className="luxury-card mb-6 p-4"><label className="block max-w-xs space-y-2"><span className="small-text font-medium text-text">Report Type</span><select value={type} onChange={(event)=>setType(event.target.value)} className="focus-ring w-full rounded-2xl border border-line bg-secondary px-4 py-3 text-sm"><option value="sales">Sales</option><option value="products">Products</option><option value="customers">Customers</option><option value="inventory">Inventory</option><option value="revenue">Revenue</option></select></label></div><DataTable loading={loading} rows={rows} columns={[{ key: 'orderNumber', label: 'Order' }, { key: 'status', label: 'Status' }, { key: 'total', label: 'Total' }, { key: 'paymentStatus', label: 'Payment' }, { key: 'createdAt', label: 'Date', render: (row)=>row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-' }]} /></section>
}
export default Reports
