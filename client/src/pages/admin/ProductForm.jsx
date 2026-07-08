import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { adminApi } from '../../services/admin/adminApi'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const initialForm = {
  sku: '', title: '', slug: '', description: '', category: '', subCategory: '', brand: '', fabric: '', sleeve: '', neck: '', pattern: '', occasion: '', purchasePrice: '', sellingPrice: '', price: '', discount: 0, gstPercent: 18, stock: 0, minimumStockAlert: 5, sizes: '', colors: '', thumbnailUrl: '', imageUrls: '', featured: false, trending: false, bestSeller: false, newArrival: false, status: 'active',
}

const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [categories, setCategories] = useState([])
  const [saving, setSaving] = useState(false)
  const isEdit = Boolean(id)

  useEffect(() => {
    adminApi.listCategories().then(({ data }) => setCategories(data || []))
    if (id) adminApi.getProduct(id).then(({ data }) => setForm((current) => ({
      ...current,
      ...data,
      category: data.category?._id || data.category || '',
      subCategory: data.subCategory?._id || data.subCategory || '',
      sizes: Array.isArray(data.sizes) ? data.sizes.join(', ') : '',
      colors: Array.isArray(data.colors) ? data.colors.map((color)=>color.name || color).join(', ') : '',
      thumbnailUrl: data.thumbnail?.url || '',
      imageUrls: Array.isArray(data.images) ? data.images.map((image)=>image.url).filter(Boolean).join('\n') : '',
    })))
  }, [id])

  const update = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      const colors = form.colors.split(',').map((name)=>name.trim()).filter(Boolean).map((name)=>({ name }))
      const images = form.imageUrls.split('\n').map((url)=>url.trim()).filter(Boolean).map((url)=>({ url, alt: form.title }))
      const payload = {
        ...form,
        price: Number(form.sellingPrice || form.price),
        sellingPrice: Number(form.sellingPrice || form.price),
        purchasePrice: Number(form.purchasePrice || 0),
        stock: Number(form.stock || 0),
        stockQuantity: Number(form.stock || 0),
        discount: Number(form.discount || 0),
        gstPercent: Number(form.gstPercent || 0),
        minimumStockAlert: Number(form.minimumStockAlert || 0),
        sizes: form.sizes.split(',').map((size)=>size.trim()).filter(Boolean),
        colors,
        thumbnail: form.thumbnailUrl ? { url: form.thumbnailUrl, alt: form.title } : undefined,
        images,
      }
      delete payload.thumbnailUrl
      delete payload.imageUrls
      if (!payload.subCategory) delete payload.subCategory
      if (isEdit) await adminApi.updateProduct(id, payload)
      else await adminApi.createProduct(payload)
      showSuccessToast(`Product ${isEdit ? 'updated' : 'created'} successfully`)
      navigate('/admin/products')
    } catch (error) { showErrorToast(error.response?.data?.message || 'Product save failed') }
    finally { setSaving(false) }
  }

  return <section><AdminPageHeader eyebrow="Catalog" title={isEdit ? 'Edit Product' : 'Add Product'} subtitle="Create complete clothing product records with pricing, inventory and storefront flags." /><form onSubmit={submit} className="space-y-6"><div className="luxury-card grid gap-5 p-6 md:grid-cols-2"><Input label="SKU" name="sku" value={form.sku} onChange={update} required /><Input label="Product Name" name="title" value={form.title} onChange={update} required /><Input label="Slug" name="slug" value={form.slug || ''} onChange={update} /><label className="block space-y-2"><span className="small-text font-medium text-text">Status</span><select name="status" value={form.status} onChange={update} className="focus-ring w-full rounded-2xl border border-line bg-secondary px-4 py-3 text-sm"><option value="active">Active</option><option value="inactive">Inactive</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label><label className="block space-y-2"><span className="small-text font-medium text-text">Category</span><select name="category" value={form.category} onChange={update} required className="focus-ring w-full rounded-2xl border border-line bg-secondary px-4 py-3 text-sm"><option value="">Select category</option>{categories.map((category)=><option key={category._id} value={category._id}>{category.name}</option>)}</select></label><label className="block space-y-2"><span className="small-text font-medium text-text">Sub Category</span><select name="subCategory" value={form.subCategory || ''} onChange={update} className="focus-ring w-full rounded-2xl border border-line bg-secondary px-4 py-3 text-sm"><option value="">None</option>{categories.map((category)=><option key={category._id} value={category._id}>{category.name}</option>)}</select></label><Input label="Brand" name="brand" value={form.brand || ''} onChange={update} /><Input label="Fabric" name="fabric" value={form.fabric || ''} onChange={update} /><Input label="Sleeve" name="sleeve" value={form.sleeve || ''} onChange={update} /><Input label="Neck" name="neck" value={form.neck || ''} onChange={update} /><Input label="Pattern" name="pattern" value={form.pattern || ''} onChange={update} /><Input label="Occasion" name="occasion" value={form.occasion || ''} onChange={update} /><Input className="md:col-span-2" as="textarea" label="Description" name="description" value={form.description} onChange={update} required /></div><div className="luxury-card grid gap-5 p-6 md:grid-cols-4"><Input label="Purchase Price" name="purchasePrice" type="number" value={form.purchasePrice || ''} onChange={update} /><Input label="Selling Price" name="sellingPrice" type="number" value={form.sellingPrice || form.price || ''} onChange={update} required /><Input label="Discount %" name="discount" type="number" value={form.discount || 0} onChange={update} /><Input label="GST %" name="gstPercent" type="number" value={form.gstPercent || 18} onChange={update} /><Input label="Stock Quantity" name="stock" type="number" value={form.stock || 0} onChange={update} /><Input label="Low Stock Alert" name="minimumStockAlert" type="number" value={form.minimumStockAlert || 5} onChange={update} /><Input label="Sizes (comma separated)" name="sizes" value={form.sizes || ''} onChange={update} /><Input label="Colors (comma separated)" name="colors" value={form.colors || ''} onChange={update} /></div><div className="luxury-card grid gap-5 p-6"><Input label="Thumbnail URL" name="thumbnailUrl" value={form.thumbnailUrl || ''} onChange={update} /><Input as="textarea" label="Image URLs (one per line)" name="imageUrls" value={form.imageUrls || ''} onChange={update} /><div className="grid gap-4 md:grid-cols-4">{['featured','trending','bestSeller','newArrival'].map((field)=><label key={field} className="flex items-center gap-3 rounded-2xl border border-line p-4 text-sm capitalize"><input type="checkbox" name={field} checked={Boolean(form[field])} onChange={update} />{field.replace(/([A-Z])/g, ' $1')}</label>)}</div><div className="flex gap-3"><Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Product'}</Button><Button variant="outline" to="/admin/products">Cancel</Button></div></div></form></section>
}

export default ProductForm
