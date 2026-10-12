import { CATEGORY_LABELS, STATUS_LABELS } from '../constants'

function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? value : d.toLocaleString()
}

export default function ComplaintList({ complaints }) {
  if (!complaints || complaints.length === 0) {
    return <p className="muted">No complaints yet. Submit the first one!</p>
  }

  return (
    <ul className="complaint-list">
      {complaints.map((c) => (
        <li key={c.id} className={`complaint-card status-${(c.status || '').toLowerCase()}`}>
          <div className="complaint-card-header">
            <span className="complaint-id">#{c.id}</span>
            <span className="category-badge">{CATEGORY_LABELS[c.category] || c.category}</span>
            <span className={`status-badge status-${(c.status || '').toLowerCase()}`}>
              {STATUS_LABELS[c.status] || c.status}
            </span>
          </div>
          <p className="complaint-description">{c.description}</p>
          <div className="complaint-meta">
            <span>{c.studentName}</span>
            <span>·</span>
            <span>{c.hostelBlock} · Room {c.roomNumber}</span>
          </div>
          <div className="complaint-date">{formatDate(c.createdAt)}</div>
        </li>
      ))}
    </ul>
  )
}
