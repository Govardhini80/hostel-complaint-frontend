/** Values must match the backend ComplaintCategory / ComplaintStatus enums exactly. */

export const CATEGORIES = [
  'ELECTRICITY',
  'PLUMBING',
  'WATER_SUPPLY',
  'CLEANLINESS',
  'FURNITURE',
  'OTHER',
]

export const STATUSES = ['PENDING', 'IN_PROGRESS', 'RESOLVED']

/** Friendly labels for display. */
export const CATEGORY_LABELS = {
  ELECTRICITY: 'Electricity',
  PLUMBING: 'Plumbing',
  WATER_SUPPLY: 'Water Supply',
  CLEANLINESS: 'Cleanliness',
  FURNITURE: 'Furniture',
  OTHER: 'Other',
}

export const STATUS_LABELS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
}
