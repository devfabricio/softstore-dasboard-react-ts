import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://api.sonhadeira.com.br/'
    : 'http://localhost:3333/'
})

export default api
