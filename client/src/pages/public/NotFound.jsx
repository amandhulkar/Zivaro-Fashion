import EmptyState from '../../components/common/EmptyState'
import Container from '../../components/common/Container'
const NotFound = () => <section className="section-y"><Container><EmptyState eyebrow="404" title="This edit is unavailable" message="The page you are looking for is not part of the current Zivaro Fashion collection." actionLabel="Return Home" actionTo="/" secondaryActionLabel="SHOP NOW" secondaryActionTo="/shop" /></Container></section>
export default NotFound
