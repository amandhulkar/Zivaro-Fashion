import { useEffect, useState } from 'react'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { adminApi } from '../../services/admin/adminApi'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const load = () => adminApi.listCategories().then(({ data }) => setCategories(data || [])).finally(() => setLoading(false))
  useEffect(() => { load() }, [])
  const create = async (event) => { event.preventDefault(); try { await adminApi.createCategory({ name }); setName(''); showSuccessToast('Category created'); load() } catch (error) { showErrorToast(error.response?.data?.message || 'Category failed') } }
  const toggle = async (category) => { await adminApi.updateCategoryStatus(category._id, { status: category.status === 'active' ? 'inactive' : 'active' }); load() }
  return <section><AdminPageHeader eyebrow="Catalog" title="Categories" subtitle="Create, update, enable and disable product categories." /><form onSubmit={create} className="luxury-card mb-6 flex flex-col gap-4 p-4 md:flex-row md:items-end"><Input className="flex-1" label="Category Name" value={name} onChange={(e)=>setName(e.target.value)} required /><Button type="submit">Create</Button></form><DataTable loading={loading} rows={categories} columns={[{ key: 'name', label: 'Name' }, { key: 'slug', label: 'Slug' }, { key: 'status', label: 'Status', render: (row)=><StatusBadge status={row.status} /> }, { key: 'actions', label: 'Actions', render: (row)=><Button size="sm" variant="outline" onClick={()=>toggle(row)}>{row.status === 'active' ? 'Disable' : 'Enable'}</Button> }]} /></section>
}
export default Categories
