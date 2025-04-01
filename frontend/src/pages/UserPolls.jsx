import { useEffect, useState } from 'react'
import { getPollsByUser } from '../services/polls.service'
import PollList from '../components/polls/PollList'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/ui/Loader'

const UserPolls = () => {
  const { user } = useAuth()
  const [polls, setPolls] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserPolls = async () => {
      try {
        const data = await getPollsByUser(user._id)
        setPolls(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserPolls()
  }, [user._id])

  if (isLoading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Polls</h1>
      {polls.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't created any polls yet.</p>
          <Link 
            to="/dashboard" 
            className="text-primary hover:underline font-medium"
          >
            Create your first poll
          </Link>
        </div>
      ) : (
        <PollList polls={polls} />
      )}
    </div>
  )
}

export default UserPolls