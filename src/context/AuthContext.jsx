import { createContext, useState, useContext, useEffect } from 'react'
import { login as loginAPI, register as registerAPI, getCurrentUser } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        try {
          const response = await getCurrentUser()
          setUser(response.user)
          setToken(storedToken)
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await loginAPI(email, password)
      const { token: newToken, user: userData } = response
      
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('token', newToken)
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.'
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await registerAPI(name, email, password)
      const { token: newToken, user: userData } = response
      
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('token', newToken)
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

