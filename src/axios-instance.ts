import axios from 'axios'
import { isAuthenticated, getToken } from './auth'

// суть axios-создавать обьект аксиос и при создании назначать каждому запросу обпределенные заголовки
export const axiosInstance = axios.create({
  headers: {
    // узнает авторизован ли пользователь, если да, то формируется заколовок
    Authorization: isAuthenticated() ? `Bearer ${getToken()}` : ''
  }
})
