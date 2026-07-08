import Spinner from './Spinner'
const Loader = ({ message = 'Curating Zivaro Fashion' }) => <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-background"><Spinner size="lg" /><p className="caption">{message}</p></div>
export default Loader
