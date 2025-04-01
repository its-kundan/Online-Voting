// Add these to your existing polls.service.js

export const getPollsByUser = async (userId) => {
  try {
    const { data } = await axios.get(`${API_URL}/polls/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch user polls')
    throw error
  }
}

export const deletePoll = async (pollId) => {
  try {
    await axios.delete(`${API_URL}/polls/${pollId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    toast.success('Poll deleted successfully')
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete poll')
    throw error
  }
}