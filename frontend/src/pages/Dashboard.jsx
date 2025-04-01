import { useEffect, useState } from 'react'
import { getPolls } from '../services/polls.service'
import PollList from '../components/polls/PollList'
import CreatePoll from '../components/polls/CreatePoll'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [polls, setPolls] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const data = await getPolls()
        setPolls(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPolls()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user?.username}</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          {showCreateForm ? 'Cancel' : 'Create Poll'}
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-8">
          <CreatePoll onSuccess={() => {
            setShowCreateForm(false)
            // Refresh polls list
            getPolls().then(data => setPolls(data))
          }} />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Recent Polls</h2>
      <PollList polls={polls} />
    </div>
  )
}

export default Dashboard