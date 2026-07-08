import ToastProvider from './components/common/Toast'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <AppRoutes />
      <ToastProvider />
    </>
  )
}

export default App
