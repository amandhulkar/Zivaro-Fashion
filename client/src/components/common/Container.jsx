const sizes = { sm:'max-w-4xl', default:'max-w-7xl', wide:'max-w-[1440px]', full:'max-w-none' }
const Container = ({ children, className = '', size = 'default', as: Tag = 'div' }) => <Tag className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}>{children}</Tag>
export default Container
