import toast from 'react-hot-toast'

const toastId = (type, message) => `${type}:${message}`

export const showSuccessToast = (message) => toast.success(message, { id: toastId('success', message) })
export const showInfoToast = (message) => toast(message, { id: toastId('info', message) })
export const showErrorToast = (message) => toast.error(message, { id: toastId('error', message) })
