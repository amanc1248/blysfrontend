import { formatDate, isOverdue, getPriorityStyles, daysUntilDeadline } from '../../utils/helpers'

export default function TaskItem({ task, onEdit, onDelete }) {
  const priorityStyles = getPriorityStyles(task.priority)
  const overdue = isOverdue(task.endDate)
  const daysLeft = daysUntilDeadline(task.endDate)

  return (
    <div
      className={`card hover:shadow-lg transition-shadow ${
        overdue ? 'border-l-4 border-red-500' : ''
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div className="flex-1 mb-4 md:mb-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
            <span
              className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${priorityStyles.bg} ${priorityStyles.text} capitalize`}
            >
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className={overdue ? 'text-red-600 font-semibold' : ''}>
                {formatDate(task.endDate)}
              </span>
            </div>

            {overdue ? (
              <span className="text-red-600 font-semibold text-xs">
                Overdue by {Math.abs(daysLeft)} day{Math.abs(daysLeft) !== 1 ? 's' : ''}
              </span>
            ) : daysLeft === 0 ? (
              <span className="text-orange-600 font-semibold text-xs">Due Today</span>
            ) : daysLeft === 1 ? (
              <span className="text-orange-600 font-semibold text-xs">Due Tomorrow</span>
            ) : daysLeft <= 3 ? (
              <span className="text-yellow-600 font-semibold text-xs">
                {daysLeft} days left
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex space-x-2 md:ml-4">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

