const AdminPageHeader = ({ eyebrow, title, subtitle, action }) => <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="small-text">{eyebrow}</p><h2 className="font-serif text-3xl text-primary">{title}</h2>{subtitle && <p className="mt-2 text-muted">{subtitle}</p>}</div>{action}</div>
export default AdminPageHeader
