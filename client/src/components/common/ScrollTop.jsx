import { useEffect, useState } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

const ScrollTop = () => {
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.search])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <button type="button" aria-label="Scroll to top" onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-5 right-5 z-[95] rounded-full bg-accent p-4 text-secondary shadow-glow transition duration-300 hover:-translate-y-1 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}><FiArrowUp /></button>
}

export default ScrollTop
