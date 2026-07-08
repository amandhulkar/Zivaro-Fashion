import { useEffect, useState } from 'react'
import AdminPageHeader from '../../components/admin/AdminPageHeader'
import DataTable from '../../components/admin/DataTable'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { adminApi } from '../../services/admin/adminApi'
import { showErrorToast, showSuccessToast } from '../../utils/toast'

const Inventory = () => {
  const [items, setItems] = useState([])
  const [movements, setMovements] = useState([])
  const [showAllItems, setShowAllItems] = useState(false)
  const [loading, setLoading] = useState(true)
  const [adjustment, setAdjustment] = useState({ productId: '', quantity: 0, reason: '' })
  const load = () => Promise.all([adminApi.listInventory({ limit: 50 }), adminApi.listInventoryMovements()]).then(([inventory, movementData]) => { setItems(inventory.data || []); setMovements(movementData.data || []) }).finally(()=>setLoading(false))
  useEffect(() => { load() }, [])
  const adjust = async (event) => { event.preventDefault(); try { await adminApi.adjustInventory({ ...adjustment, type: Number(adjustment.quantity) >= 0 ? 'increase' : 'decrease' }); showSuccessToast('Inventory adjusted'); setAdjustment({ productId: '', quantity: 0, reason: '' }); load() } catch (error) { showErrorToast(error.response?.data?.message || 'Adjustment failed') } }
  const visibleItems = showAllItems ? items : items.slice(0, 10)
  return <section><AdminPageHeader eyebrow="Stock" title="Inventory" subtitle="Monitor low stock and maintain stock movement history." /><form onSubmit={adjust} className="luxury-card mb-6 grid gap-4 p-4 md:grid-cols-[1fr_160px_1fr_auto]"><label className="block space-y-2"><span className="small-text font-medium text-text">Product</span><select className="focus-ring w-full rounded-2xl border border-line bg-secondary px-4 py-3 text-sm" value={adjustment.productId} onChange={(e)=>setAdjustment((c)=>({...c, productId:e.target.value}))} required><option value="">Select product</option>{items.map((item)=><option key={item._id} value={item._id}>{item.title} ({item.stock})</option>)}</select></label><Input label="Qty +/-" type="number" value={adjustment.quantity} onChange={(e)=>setAdjustment((c)=>({...c, quantity:e.target.value}))} /><Input label="Reason" value={adjustment.reason} onChange={(e)=>setAdjustment((c)=>({...c, reason:e.target.value}))} /><Button type="submit">Adjust</Button></form><DataTable loading={loading} rows={visibleItems} columns={[{ key: 'sku', label: 'SKU' }, { key: 'title', label: 'Product' }, { key: 'stock', label: 'Stock' }, { key: 'minimumStockAlert', label: 'Alert' }]} />{!showAllItems && items.length > 10 && <div className="mt-4 flex justify-center"><Button variant="outline" onClick={()=>setShowAllItems(true)}>More</Button></div>}<div className="mt-6"><AdminPageHeader eyebrow="History" title="Inventory Movements" /><DataTable rows={movements} columns={[{ key: 'sku', label: 'SKU' }, { key: 'type', label: 'Type' }, { key: 'quantity', label: 'Qty' }, { key: 'previousStock', label: 'Before' }, { key: 'newStock', label: 'After' }, { key: 'reason', label: 'Reason' }]} /></div></section>
}
export default Inventory
