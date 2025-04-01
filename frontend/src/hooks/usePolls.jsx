import { useState, useEffect } from 'react'
import { getPolls, getPollsByUser } from '../services/polls.service'

export const usePolls = (userId = null) => {
  const [polls, setPolls] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const data = userId 
          ? await getPollsByUser(userId)
          : await getPolls()
        setPolls(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPolls()
  }, [userId])

  return { polls, isLoading, error }
}