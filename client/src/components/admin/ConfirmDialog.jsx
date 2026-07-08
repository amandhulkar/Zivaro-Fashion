import Button from '../common/Button'
import Modal from '../common/Modal'

const ConfirmDialog = ({ open, title = 'Confirm action', message, onCancel, onConfirm, confirmText = 'Confirm' }) => <Modal open={open} onClose={onCancel} title={title}><p className="text-muted">{message}</p><div className="mt-6 flex justify-end gap-3"><Button variant="ghost" onClick={onCancel}>Cancel</Button><Button onClick={onConfirm}>{confirmText}</Button></div></Modal>
export default ConfirmDialog
