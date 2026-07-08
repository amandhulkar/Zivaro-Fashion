import Button from '../common/Button'

const CsvExportButton = ({ href, children = 'Download CSV' }) => <Button as="a" variant="outline" onClick={() => { if (href) window.open(href, '_blank', 'noopener,noreferrer') }}>{children}</Button>
export default CsvExportButton
