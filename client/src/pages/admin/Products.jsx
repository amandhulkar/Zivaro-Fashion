import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import { adminApi } from '../../services/admin/adminApi'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

const Products = () => {
  const [products, setProducts] = useState([])
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadProducts = () => adminApi.listProducts({ limit: 50 }).then(({ data }) => setProducts(data || [])).finally(() => setLoading(false))
  useEffect(() => { loadProducts() }, [])

  const toggleStatus = async (product) => {
    try {
      await adminApi.updateProductStatus(product._id, { status: product.status === 'active' ? 'inactive' : 'active' })
      showSuccessToast('Product status updated')
      loadProducts()
    } catch (error) { showErrorToast(error.response?.data?.message || 'Status update failed') }
  }

  const duplicate = async (product) => {
    try { await adminApi.duplicateProduct(product._id); showSuccessToast('Product duplicated'); loadProducts() } catch (error) { showErrorToast(error.response?.data?.message || 'Duplicate failed') }
  }

  const visibleProducts = showAllProducts ? products : products.slice(0, 10)

  return <section><AdminPageHeader eyebrow="Catalog" title="Products" subtitle="Manage products, pricing, stock and visibility." action={<Button to="/admin/products/new">Add Product</Button>} /><DataTable loading={loading} rows={visibleProducts} columns={[{ key: 'sku', label: 'SKU' }, { key: 'title', label: 'Product' }, { key: 'price', label: 'Price', render: (row)=>currency.format(row.price || 0) }, { key: 'stock', label: 'Stock' }, { key: 'status', label: 'Status', render: (row)=><StatusBadge status={row.status} /> }, { key: 'actions', label: 'Actions', render: (row)=><div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" to={`/admin/products/${row._id}/edit`}>Edit</Button><Button size="sm" variant="ghost" onClick={()=>duplicate(row)}>Duplicate</Button><Button size="sm" variant="ghost" onClick={()=>toggleStatus(row)}>{row.status === 'active' ? 'Disable' : 'Enable'}</Button></div> }]} />{!showAllProducts && products.length > 10 && <div className="mt-4 flex justify-center"><Button variant="outline" onClick={()=>setShowAllProducts(true)}>More</Button></div>}</section>
}

export default Products
