const DataTable = ({ columns, rows, loading, emptyText = 'No records found', rowKey = '_id' }) => {
  if (loading) return <div className="luxury-card p-6 text-muted">Loading...</div>
  if (!rows?.length) return <div className="luxury-card p-6 text-muted">{emptyText}</div>

  return <div className="luxury-card overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-background text-xs uppercase tracking-[0.14em] text-muted"><tr>{columns.map((column)=><th key={column.key} className="px-5 py-4 font-semibold">{column.label}</th>)}</tr></thead><tbody className="divide-y divide-line">{rows.map((row, index)=><tr key={row[rowKey] || index} className="hover:bg-background/70">{columns.map((column)=><td key={column.key} className="px-5 py-4 text-text">{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}</tbody></table></div></div>
}

export default DataTable
