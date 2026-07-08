import { Toaster } from 'react-hot-toast'

const ToastProvider = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 2500,
      style: {
        border: '1px solid #E5E7EB',
        padding: '14px 16px',
        color: '#222222',
        fontFamily: 'Poppins',
      },
      success: {
        iconTheme: { primary: '#16A34A', secondary: '#FFFFFF' },
      },
    }}
  />
)

export default ToastProvider
