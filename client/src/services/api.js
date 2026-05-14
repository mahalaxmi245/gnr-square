import axios from 'axios'

const API = axios.create({
  baseURL: 'https://gnr-square-server.onrender.com'
})

// Leads
export const submitLead = async (data) => {
  try {
    const response = await API.post('/api/leads', data)
    return response.data
  } catch (error) {
    console.error('Lead submission error:', error)
    throw error
  }
}

// Get Marriage Profiles
export const getMarriageProfiles = async () => {
  try {
    const response = await API.get('/api/marriage-profiles')
    return response.data
  } catch (error) {
    console.error('Get marriage profiles error:', error)
    throw error
  }
}

// Create Marriage Profile
export const createMarriageProfile = async (data) => {
  try {
    const response = await API.post('/api/marriage-profiles', data)
    return response.data
  } catch (error) {
    console.error('Create marriage profile error:', error)
    throw error
  }
}

export default API