import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPollDetails, castVote } from '../services/polls.service'
import { useAuth } from '../context/AuthContext'
import ResultsChart from '../components/ResultsChart'
import Button from '../components/ui/Button'

const PollDetails = () => {
  const { id } = useParams()
  const { token, user } = useAuth()
  const [poll, setPoll] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const data = await getPollDetails(id)
        setPoll(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPoll()
  }, [id])

  const handleVote = async () => {
    if (selectedOption === null) return
    try {
      setIsLoading(true)
      await castVote(id, selectedOption, token)
      setHasVoted(true)
      // Refresh poll data
      const updatedPoll = await getPollDetails(id)
      setPoll(updatedPoll)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!poll) return <div>Poll not found</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{poll.question}</h1>
      
      {!hasVoted && user ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Cast Your Vote</h2>
          <div className="space-y-3">
            {poll.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="poll-option"
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                  className="mr-2"
                />
                <label htmlFor={`option-${index}`}>{option.option}</label>
              </div>
            ))}
          </div>
          <Button 
            onClick={handleVote} 
            disabled={selectedOption === null || isLoading}
            className="mt-4"
          >
            Submit Vote
          </Button>
        </div>
      ) : (
        <div className="mb-8">
          {user && <p className="text-green-600 mb-4">You have already voted in this poll.</p>}
          {!user && <p className="text-blue-600 mb-4">Please login to vote in this poll.</p>}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        <ResultsChart poll={poll} />
      </div>
    </div>
  )
}

export default PollDetails