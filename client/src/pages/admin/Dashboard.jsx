import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import ChartCard from '../../components/admin/ChartCard'
import DataTable from '../../components/admin/DataTable'
import StatCard from '../../components/admin/StatCard'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import { adminApi } from '../../services/admin/adminApi'

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

const Dashboard = () => {
  const [overview, setOverview] = useState(null)
  const [products, setProducts] = useState([])
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([adminApi.overview(), adminApi.listProducts({ limit: 50 })])
      .then(([overviewResponse, productsResponse]) => {
        setOverview(overviewResponse.data)
        setProducts(productsResponse.data || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const metrics = overview?.metrics || {}
  const visibleProducts = showAllProducts ? products : products.slice(0, 10)

  return <section><AdminPageHeader eyebrow="Overview" title="Admin Dashboard" subtitle="Monitor sales, orders, stock and customers from one control center." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Products" value={metrics.totalProducts ?? 0} /><StatCard label="Categories" value={metrics.totalCategories ?? 0} /><StatCard label="Orders" value={metrics.totalOrders ?? 0} /><StatCard label="Revenue" value={currency.format(metrics.totalRevenue || 0)} /></div><div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Pending Orders" value={metrics.pendingOrders ?? 0} /><StatCard label="Completed Orders" value={metrics.completedOrders ?? 0} /><StatCard label="Cancelled Orders" value={metrics.cancelledOrders ?? 0} /><StatCard label="Low Stock" value={metrics.lowStockProducts ?? 0} /></div><div className="mt-6"><AdminPageHeader eyebrow="Catalog" title="Products" subtitle="Yahan se products dekh sakte ho, edit kar sakte ho, aur new product add kar sakte ho." action={<Button to="/admin/products/new">Add Product</Button>} /><DataTable loading={loading} rows={visibleProducts} emptyText="No products found" columns={[{ key: 'sku', label: 'SKU' }, { key: 'title', label: 'Product' }, { key: 'price', label: 'Price', render: (row)=>currency.format(row.price || 0) }, { key: 'stock', label: 'Stock' }, { key: 'status', label: 'Status', render: (row)=><StatusBadge status={row.status} /> }, { key: 'actions', label: 'Actions', render: (row)=><div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" to={`/admin/products/${row._id}/edit`}>Edit</Button><Button size="sm" variant="ghost" to="/admin/products">Manage</Button></div> }]} />{!showAllProducts && products.length > 10 && <div className="mt-4 flex justify-center"><Button variant="outline" onClick={()=>setShowAllProducts(true)}>More</Button></div>}</div><div className="mt-6 grid gap-6 xl:grid-cols-2"><ChartCard title="Monthly Sales" subtitle="Revenue trend by month"><BarChart data={overview?.monthlySales || []}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" /><YAxis /><Tooltip formatter={(value)=>currency.format(value)} /><Bar dataKey="revenue" fill="#b88a44" radius={[6,6,0,0]} /></BarChart></ChartCard><DataTable loading={loading} rows={overview?.recentOrders || []} emptyText="No recent orders" columns={[{ key: 'orderNumber', label: 'Order' }, { key: 'user', label: 'Customer', render: (row)=>row.user?.name || row.user?.email || 'Guest' }, { key: 'status', label: 'Status', render: (row)=><StatusBadge status={row.status} /> }, { key: 'total', label: 'Total', render: (row)=>currency.format(row.total || 0) }]} /></div><div className="mt-6"><DataTable loading={loading} rows={overview?.lowStockProducts || []} emptyText="No low-stock products" columns={[{ key: 'sku', label: 'SKU' }, { key: 'title', label: 'Product' }, { key: 'stock', label: 'Stock' }, { key: 'status', label: 'Status', render: (row)=><StatusBadge status={row.status} /> }]} /></div></section>
}

export default Dashboard
