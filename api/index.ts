import axios from 'axios'

const api = axios.create({ baseURL: process.env.API_URL })

export const setToken = (token: string) => {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api
