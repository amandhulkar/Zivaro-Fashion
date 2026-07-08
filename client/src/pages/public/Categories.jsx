import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import PageHeader from '../../components/common/PageHeader'
import CategoryCard from '../../components/home/CategoryCard'
import { categories } from '../../constants/siteData'
const Categories = () => <><PageHeader eyebrow="Categories" title="Designed around the way women dress." subtitle="Explore refined departments for workdays, weekends, celebrations and escapes." breadcrumbs={[{label:'Home',to:'/'},{label:'Categories'}]} /><section className="section-y"><Container><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{categories.map(c=><CategoryCard key={c.slug} category={c}/>)}</div><div className="mt-14 rounded-[2rem] bg-primary p-8 text-secondary md:p-12"><p className="caption">Style concierge</p><h2 className="mt-3 text-3xl font-semibold md:text-5xl">Not sure where to start?</h2><p className="mt-4 max-w-2xl text-white/70">Begin with dresses for instant polish, tailoring for daily confidence, or accessories for a subtle statement.</p><Button to="/shop" variant="secondary" className="mt-8">Shop all categories</Button></div></Container></section></>
export default Categories
