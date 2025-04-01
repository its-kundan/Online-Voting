import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-primary">
              Voting App
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2">
                Home
              </Link>
              {user && (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-primary px-3 py-2">
                    Dashboard
                  </Link>
                  <Link to="/my-polls" className="text-gray-700 hover:text-primary px-3 py-2">
                    My Polls
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="ml-4 flex items-center">
            {user ? (
              <button
                onClick={logout}
                className="text-gray-700 hover:text-primary px-3 py-2"
              >
                Logout
              </button>
            ) : (
              <Link to="/auth" className="text-gray-700 hover:text-primary px-3 py-2">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar