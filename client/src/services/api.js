import axios from 'axios'

const API = axios.create({
  baseURL: 'https://gnr-square-server.onrender.com'
})

export const submitLead = async (data) => {
  try {
    const response = await API.post('/leads', data)
    return response.data
  } catch (error) {
    console.error('Lead submission error:', error)
    throw error
  }
}

export default API
