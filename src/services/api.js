import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for cookies
})

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ============= AUTH ENDPOINTS =============

export const register = async (name, email, password) => {
  return await api.post('/auth/register', { name, email, password })
}

export const login = async (email, password) => {
  return await api.post('/auth/login', { email, password })
}

export const logout = async () => {
  return await api.post('/auth/logout')
}

export const getCurrentUser = async () => {
  return await api.get('/auth/me')
}

// ============= TASK ENDPOINTS =============

export const getTasks = async (params = {}) => {
  const { page = 1, limit = 10, sortBy = 'end_date', order = 'asc' } = params
  return await api.get('/tasks', {
    params: { page, limit, sortBy, order }
  })
}

export const getTask = async (id) => {
  return await api.get(`/tasks/${id}`)
}

export const createTask = async (taskData) => {
  return await api.post('/tasks', taskData)
}

export const updateTask = async (id, taskData) => {
  return await api.put(`/tasks/${id}`, taskData)
}

export const deleteTask = async (id) => {
  return await api.delete(`/tasks/${id}`)
}

export default api

