/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        primary: '#000000', secondary: '#FFFFFF', accent: '#E91E63', background: '#F8F8F8', text: '#222222',
        success: '#16A34A', warning: '#F97316', danger: '#DC2626', muted: '#6B7280', line: '#E5E7EB',
        gray: { 50:'#F9FAFB',100:'#F3F4F6',200:'#E5E7EB',300:'#D1D5DB',400:'#9CA3AF',500:'#6B7280',600:'#4B5563',700:'#374151',800:'#1F2937',900:'#111827' }
      },
      fontFamily: { sans: ['Poppins','ui-sans-serif','system-ui','sans-serif'] },
      boxShadow: { luxury:'0 30px 80px rgba(0,0,0,.14)', soft:'0 18px 45px rgba(34,34,34,.08)', glow:'0 18px 55px rgba(233,30,99,.18)' },
      backgroundImage: { 'luxury-radial':'radial-gradient(circle at top left, rgba(233,30,99,.18), transparent 34%), linear-gradient(135deg, #000000, #222222)', 'soft-pink':'linear-gradient(135deg, #fff 0%, #fff0f6 45%, #f8f8f8 100%)' }
    },
  },
  plugins: [],
}
