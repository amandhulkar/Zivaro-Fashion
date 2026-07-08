import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import PageHeader from '../../components/common/PageHeader'
import { showInfoToast } from '../../utils/toast'
const Checkout = () => <><PageHeader eyebrow="Checkout" title="Secure checkout preview" subtitle="A premium frontend-only checkout layout. Payment and orders are intentionally not implemented yet." breadcrumbs={[{label:'Home',to:'/'},{label:'Checkout'}]} /><section className="section-y"><Container><div className="grid gap-8 lg:grid-cols-[1fr_380px]"><div className="luxury-card space-y-5 p-6"><Input label="Email" placeholder="you@example.com"/><Input label="Full name" placeholder="Your name"/><Input label="Address" placeholder="Street address"/><div className="grid gap-5 sm:grid-cols-2"><Input label="City"/><Input label="PIN code"/></div></div><aside className="luxury-card h-fit p-6"><h2 className="text-xl font-semibold">Order summary</h2><div className="mt-6 space-y-3 small-text"><p>Subtotal preview</p><p>Shipping calculated later</p><p>Secure payment module pending</p></div><Button className="mt-8 w-full" onClick={()=>showInfoToast('Checkout is UI-only in this phase.')}>Continue Securely</Button></aside></div></Container></section></>
export default Checkout
