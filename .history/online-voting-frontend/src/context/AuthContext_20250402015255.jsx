import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, logoutUser } from '../services/auth.service'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      // Verify token or fetch user data
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const login = async (credentials) => {
    try {
      const { data } = await loginUser(credentials)
      setUser(data.user)
      setToken(data.token)
      navigate('/dashboard')
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const { data } = await registerUser(userData)
      setUser(data.user)
      setToken(data.token)
      navigate('/dashboard')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    logoutUser()
    setUser(null)
    setToken(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)