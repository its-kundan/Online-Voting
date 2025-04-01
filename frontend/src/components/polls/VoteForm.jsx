import { useState } from 'react'
import { castVote } from '../../services/polls.service'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

const VoteForm = ({ pollId, options, onVoteSuccess }) => {
  const { token } = useAuth()
  const [selectedOption, setSelectedOption] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleVote = async () => {
    if (selectedOption === null) return
    setIsLoading(true)
    try {
      await castVote(pollId, selectedOption, token)
      onVoteSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Cast Your Vote</h2>
      <div className="space-y-3 mb-6">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`option-${index}`}
              name="poll-option"
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
              className="mr-2"
            />
            <label htmlFor={`option-${index}`} className="cursor-pointer">
              {option.option}
            </label>
          </div>
        ))}
      </div>
      <Button 
        onClick={handleVote} 
        disabled={selectedOption === null || isLoading}
        className="w-full"
      >
        {isLoading ? 'Submitting...' : 'Submit Vote'}
      </Button>
    </div>
  )
}

export default VoteForm