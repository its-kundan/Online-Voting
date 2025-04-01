import PollList from '../components/polls/PollList'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Online Voting System</h1>
        <p className="text-xl text-gray-600 mb-6">
          Create, vote, and analyze polls in real-time
        </p>
        {user ? (
          <Link
            to="/dashboard"
            className="bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-primary-dark"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/auth"
            className="bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-primary-dark"
          >
            Get Started
          </Link>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-6">Recent Polls</h2>
      <PollList />
    </div>
  )
}

export default Home