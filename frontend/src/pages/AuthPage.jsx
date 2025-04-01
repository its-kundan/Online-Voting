import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

const AuthPage = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'login'
  const [activeTab, setActiveTab] = useState(tab)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'login' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'register' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  )
}

export default AuthPage