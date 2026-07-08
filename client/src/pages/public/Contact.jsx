import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import PageHeader from '../../components/common/PageHeader'
import { showSuccessToast } from '../../utils/toast'
import { clientCare } from '../../constants/siteData'
const Contact = () => <><PageHeader eyebrow="Client care" title="We are here for every styling question." subtitle="Connect with Zivaro for appointments, support and atelier enquiries." breadcrumbs={[{label:'Home',to:'/'},{label:'Contact'}]} /><section className="section-y"><Container><div className="grid gap-8 lg:grid-cols-[1fr_.8fr]"><div className="luxury-card space-y-5 p-6"><Input label="Name" placeholder="Your name"/><Input label="Email" placeholder="you@example.com"/><Input as="textarea" label="Message" placeholder="How can we help?"/><Button onClick={()=>showSuccessToast('Message preview captured.')}>Send Message</Button></div><aside className="space-y-6"><div className="luxury-card p-7"><p className="flex items-center gap-3 small-text"><FiMail className="text-accent"/> amandhulkar0079@gmail.com</p><p className="mt-4 flex items-center gap-3 small-text"><FiPhone className="text-accent"/> +91 89520 04922</p><p className="mt-4 flex items-center gap-3 small-text"><FiMapPin className="text-accent"/> Jaipur, Rajasthan</p></div><div className="grid gap-3">{clientCare.map(x=><div key={x} className="rounded-2xl bg-secondary p-4 shadow-soft"><p className="font-medium">{x}</p></div>)}</div></aside></div></Container></section></>
export default Contact
