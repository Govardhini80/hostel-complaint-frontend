/**
 * Thin API client for the Spring Boot backend.
 *
 * Endpoints are taken directly from ComplaintController / HealthController:
 *   POST   /api/complaints          create a complaint
 *   GET    /api/complaints          list (optional ?status= & ?category=)
 *   GET    /api/complaints/{id}     single complaint
 *   PATCH  /api/complaints/{id}/status   update status
 *   GET    /api/complaints/summary  dashboard counts
 *   GET    /api/health              health check
 */
import { API_BASE_URL } from './config'

async function handleResponse(response) {
  // Try to parse JSON for both success and error bodies.
  let data = null
  const text = await response.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!response.ok) {
    // Backend returns { message, fieldErrors } for validation problems.
    const message =
      (data && data.message) ||
      `Request failed with status ${response.status}`
    const error = new Error(message)
    error.status = response.status
    error.fieldErrors = (data && data.fieldErrors) || {}
    error.body = data
    throw error
  }
  return data
}

function jsonHeaders() {
  return { 'Content-Type': 'application/json' }
}

/** Create a new complaint. Body matches the ComplaintRequest DTO. */
export async function createComplaint(payload) {
  const response = await fetch(`${API_BASE_URL}/api/complaints`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}

/** List complaints, optionally filtered by status and/or category. */
export async function listComplaints({ status, category } = {}) {
  const params = new URLSearchParams()
  if (status) params.append('status', status)
  if (category) params.append('category', category)
  const query = params.toString()
  const url = `${API_BASE_URL}/api/complaints${query ? `?${query}` : ''}`
  const response = await fetch(url)
  return handleResponse(response)
}

/** Update a complaint's status (e.g. PENDING -> IN_PROGRESS -> RESOLVED). */
export async function updateStatus(id, status) {
  const response = await fetch(`${API_BASE_URL}/api/complaints/${id}/status`, {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify({ status }),
  })
  return handleResponse(response)
}

/** Dashboard summary counts. */
export async function getSummary() {
  const response = await fetch(`${API_BASE_URL}/api/complaints/summary`)
  return handleResponse(response)
}

/** Backend health check. */
export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`)
  return handleResponse(response)
}
