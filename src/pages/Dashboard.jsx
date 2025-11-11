import { useState, useEffect } from 'react'
import Navbar from '../components/Layout/Navbar'
import TaskList from '../components/Tasks/TaskList'
import TaskForm from '../components/Tasks/TaskForm'
import TaskFilters from '../components/Tasks/TaskFilters'
import Pagination from '../components/common/Pagination'
import { getTasks, createTask, updateTask, deleteTask } from '../services/api'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalTasks, setTotalTasks] = useState(0)
  const [sortBy, setSortBy] = useState('end_date')
  const [order, setOrder] = useState('asc')
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const limit = 10

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await getTasks({
        page: currentPage,
        limit,
        sortBy,
        order
      })
      setTasks(response.tasks)
      setTotalPages(response.pagination.totalPages)
      setTotalTasks(response.pagination.totalTasks)
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [currentPage, sortBy, order])

  // Handle create/update task
  const handleSubmit = async (taskData) => {
    try {
      setFormLoading(true)
      if (editingTask) {
        await updateTask(editingTask.id, taskData)
        setSuccess('Task updated successfully!')
      } else {
        await createTask(taskData)
        setSuccess('Task created successfully!')
      }
      setShowModal(false)
      setEditingTask(null)
      fetchTasks()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task. Please try again.')
    } finally {
      setFormLoading(false)
    }
  }

  // Handle delete task
  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      await deleteTask(taskId)
      setSuccess('Task deleted successfully!')
      fetchTasks()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to delete task. Please try again.')
    }
  }

  // Handle edit task
  const handleEdit = (task) => {
    setEditingTask(task)
    setShowModal(true)
  }

  // Handle sort change
  const handleSortChange = (newSortBy, newOrder) => {
    setSortBy(newSortBy)
    setOrder(newOrder)
    setCurrentPage(1) // Reset to first page when sorting changes
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="mt-1 text-sm text-gray-500">
              {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} total
            </p>
          </div>
          <button
            onClick={() => {
              setEditingTask(null)
              setShowModal(true)
            }}
            className="mt-4 sm:mt-0 btn-primary"
          >
            + New Task
          </button>
        </div>

        {/* Filters */}
        <TaskFilters sortBy={sortBy} order={order} onSortChange={handleSortChange} />

        {/* Task List */}
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {/* Modal for Create/Edit Task */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <TaskForm
                task={editingTask}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowModal(false)
                  setEditingTask(null)
                }}
                loading={formLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {success && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md max-w-md animate-fade-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{success}</span>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md max-w-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
            <button
              onClick={() => setError('')}
              className="ml-auto text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

