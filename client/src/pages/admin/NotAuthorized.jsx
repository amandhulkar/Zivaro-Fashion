import Button from '../../components/common/Button'

const NotAuthorized = () => <section className="mx-auto max-w-xl luxury-card p-8 text-center"><p className="small-text">Restricted Area</p><h2 className="mt-2 font-serif text-3xl text-primary">Admin access required</h2><p className="mt-3 text-muted">Your account does not have permission to access the admin dashboard.</p><Button className="mt-7" to="/profile">Back to Profile</Button></section>
export default NotAuthorized
