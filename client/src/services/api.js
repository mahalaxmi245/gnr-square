import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
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