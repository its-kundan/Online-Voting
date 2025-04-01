import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  const { register } = useAuth()
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await register(userData)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={userData.username}
            onChange={(e) => setUserData({...userData, username: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
            minLength="6"
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account? <Link to="/auth?tab=login" className="text-primary hover:underline">Login</Link>
      </p>
    </div>
  )
}

export default RegisterForm