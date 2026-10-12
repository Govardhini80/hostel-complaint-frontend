import { useCallback, useEffect, useState } from 'react'
import ComplaintForm from './components/ComplaintForm.jsx'
import ComplaintList from './components/ComplaintList.jsx'
import { createComplaint, listComplaints, getSummary } from './api'

export default function App() {
  const [complaints, setComplaints] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const loadComplaints = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [list, sum] = await Promise.all([
        listComplaints(statusFilter ? { status: statusFilter } : {}),
        getSummary(),
      ])
      setComplaints(list)
      setSummary(sum)
    } catch (err) {
      setError(err.message || 'Could not load complaints.')
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    loadComplaints()
  }, [loadComplaints])

  async function handleCreate(payload) {
    await createComplaint(payload)
    // Refresh the list and summary after a successful submission.
    await loadComplaints()
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Hostel Complaint System</h1>
          <p className="subtitle">
            Report and track maintenance issues in your hostel.
          </p>
        </div>
        <div className="summary-cards">
          <SummaryCard label="Total" value={summary ? summary.total : 0} />
          <SummaryCard label="Pending" value={summary ? summary.pending : 0} tone="pending" />
          <SummaryCard label="In Progress" value={summary ? summary.inProgress : 0} tone="progress" />
          <SummaryCard label="Resolved" value={summary ? summary.resolved : 0} tone="resolved" />
        </div>
      </header>

      <main className="layout">
        <section className="panel" aria-label="Submit a complaint">
          <h2>Submit a Complaint</h2>
          <ComplaintForm onCreate={handleCreate} />
        </section>

        <section className="panel" aria-label="Complaints">
          <div className="list-toolbar">
            <h2>Complaints</h2>
            <label className="filter">
              Filter by status:
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </label>
          </div>

          {error && <p className="error-banner">{error}</p>}
          {loading ? (
            <p className="muted">Loading complaints…</p>
          ) : (
            <ComplaintList complaints={complaints} />
          )}
        </section>
      </main>

      <footer className="app-footer">
        <span>Backend API: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}</span>
      </footer>
    </div>
  )
}

function SummaryCard({ label, value, tone }) {
  return (
    <div className={`summary-card ${tone || ''}`}>
      <span className="summary-value">{value}</span>
      <span className="summary-label">{label}</span>
    </div>
  )
}
