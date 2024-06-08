import axios from 'axios'
import { isAuthenticated, getToken } from './auth'

export const axiosInstance = axios.create({
  headers: {
    Authorization: isAuthenticated() ? `Bearer ${getToken()}` : '',
    "ngrok-skip-browser-warning":true
  }
})
