import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { createPoll } from '../../services/polls.service'
import Button from '../ui/Button'

const CreatePoll = () => {
  const { token } = useAuth()
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [isLoading, setIsLoading] = useState(false)

  const handleAddOption = () => {
    setOptions([...options, ''])
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await createPoll({ question, options }, token)
      setQuestion('')
      setOptions(['', ''])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="question">
            Question
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Options</label>
          {options.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            + Add Option
          </button>
        </div>
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Poll'}
        </Button>
      </form>
    </div>
  )
}

export default CreatePoll