import axios from 'axios'
import { toast } from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const loginUser = async (credentials) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, credentials)
    return data
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed')
    throw error
  }
}

export const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/register`, userData)
    return data
  } catch (error) {
    toast.error(error.response?.data?.message || 'Registration failed')
    throw error
  }
}

export const logoutUser = () => {
  localStorage.removeItem('token')
}