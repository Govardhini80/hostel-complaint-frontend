import { useState } from 'react'
import { CATEGORIES, CATEGORY_LABELS } from '../constants'

const EMPTY = {
  studentName: '',
  hostelBlock: '',
  roomNumber: '',
  category: '',
  description: '',
}

export default function ComplaintForm({ onCreate }) {
  const [form, setForm] = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setSuccess('')
    setError('')
    setFieldErrors({})
    try {
      await onCreate({
        studentName: form.studentName.trim(),
        hostelBlock: form.hostelBlock.trim(),
        roomNumber: form.roomNumber.trim(),
        category: form.category,
        description: form.description.trim(),
      })
      setSuccess('Complaint submitted successfully!')
      setForm(EMPTY)
    } catch (err) {
      setError(err.message || 'Failed to submit complaint.')
      if (err.fieldErrors) setFieldErrors(err.fieldErrors)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="complaint-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="studentName">Student Name *</label>
        <input
          id="studentName"
          type="text"
          value={form.studentName}
          onChange={(e) => update('studentName', e.target.value)}
          maxLength={100}
          placeholder="e.g. Asha Kumar"
        />
        {fieldErrors.studentName && <span className="field-error">{fieldErrors.studentName}</span>}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="hostelBlock">Hostel Block *</label>
          <input
            id="hostelBlock"
            type="text"
            value={form.hostelBlock}
            onChange={(e) => update('hostelBlock', e.target.value)}
            maxLength={50}
            placeholder="e.g. Block A"
          />
          {fieldErrors.hostelBlock && <span className="field-error">{fieldErrors.hostelBlock}</span>}
        </div>

        <div className="field">
          <label htmlFor="roomNumber">Room Number *</label>
          <input
            id="roomNumber"
            type="text"
            value={form.roomNumber}
            onChange={(e) => update('roomNumber', e.target.value)}
            maxLength={20}
            placeholder="e.g. 101"
          />
          {fieldErrors.roomNumber && <span className="field-error">{fieldErrors.roomNumber}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          value={form.category}
          onChange={(e) => update('category', e.target.value)}
        >
          <option value="">Select a category…</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
        {fieldErrors.category && <span className="field-error">{fieldErrors.category}</span>}
      </div>

      <div className="field">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          rows={4}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          maxLength={1000}
          placeholder="Describe the problem in detail…"
        />
        {fieldErrors.description && <span className="field-error">{fieldErrors.description}</span>}
      </div>

      {error && <p className="error-banner">{error}</p>}
      {success && <p className="success-banner">{success}</p>}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Complaint'}
      </button>
    </form>
  )
}
