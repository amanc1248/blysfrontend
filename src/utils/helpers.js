/**
 * Format date to readable format
 * @param {string} date - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

/**
 * Check if a date is overdue
 * @param {string} endDate - ISO date string
 * @returns {boolean} True if overdue
 */
export const isOverdue = (endDate) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  return end < today
}

/**
 * Get priority color classes
 * @param {string} priority - Priority level (low, medium, high)
 * @returns {object} Tailwind CSS classes
 */
export const getPriorityStyles = (priority) => {
  const styles = {
    low: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300'
    },
    medium: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300'
    },
    high: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300'
    }
  }
  return styles[priority] || styles.medium
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Calculate days until deadline
 * @param {string} endDate - ISO date string
 * @returns {number} Days until deadline (negative if overdue)
 */
export const daysUntilDeadline = (endDate) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  const diffTime = end - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

