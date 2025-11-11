export default function TaskFilters({ sortBy, order, onSortChange }) {
  const handleSortChange = (e) => {
    const value = e.target.value
    const [newSortBy, newOrder] = value.split('-')
    onSortChange(newSortBy, newOrder)
  }

  const currentValue = `${sortBy}-${order}`

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Sort by:
        </label>
        <select
          id="sort"
          value={currentValue}
          onChange={handleSortChange}
          className="input-field text-sm"
        >
          <option value="end_date-asc">Due Date (Earliest First)</option>
          <option value="end_date-desc">Due Date (Latest First)</option>
          <option value="priority-desc">Priority (High to Low)</option>
          <option value="priority-asc">Priority (Low to High)</option>
          <option value="created_at-desc">Recently Created</option>
          <option value="created_at-asc">Oldest First</option>
        </select>
      </div>
    </div>
  )
}

