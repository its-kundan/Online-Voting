import { useEffect, useState } from 'react'
import { getPolls } from '../../services/polls.service'
import PollCard from './PollCard'
import Loader from '../ui/Loader'

const PollList = () => {
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

  if (isLoading) return <Loader />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {polls.map((poll) => (
        <PollCard key={poll._id} poll={poll} />
      ))}
    </div>
  )
}

export default PollList