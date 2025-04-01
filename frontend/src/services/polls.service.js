import axios from 'axios'
import { toast } from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const createPoll = async (pollData, token) => {
  try {
    const { data } = await axios.post(`${API_URL}/polls`, pollData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    toast.success('Poll created successfully!')
    return data
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create poll')
    throw error
  }
}

export const getPolls = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/polls`)
    return data
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch polls')
    throw error
  }
}

export const getPollDetails = async (pollId) => {
  try {
    const { data } = await axios.get(`${API_URL}/polls/${pollId}`)
    return data
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch poll details')
    throw error
  }
}

export const castVote = async (pollId, optionIndex, token) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/votes/${pollId}`,
      { optionIndex },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    toast.success('Vote submitted successfully!')
    return data
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to submit vote')
    throw error
  }
}