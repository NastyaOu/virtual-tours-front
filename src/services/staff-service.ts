import type { IStaff } from '@/interfaces/Staff'
import { axiosInstance } from './../axios-instance'

export const getStaff = async (): Promise<IStaff[]> => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/staff`)
  return response.data
}

export const getOneStaff = async (id: number): Promise<IStaff> => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/staff/${id}`)
  return response.data
}

export const register = async (
  name: string,
  lastname: string,
  login: string,
  password: string
): Promise<IStaff> => {
  const data = {
    name,
    lastname,
    login,
    password
  }

  const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/auth/register`, data)
  return response.data
}

export const updateStaff = async (id: number, name: string, lastname: string): Promise<IStaff> => {
  const data = { name, lastname }

  const response = await axiosInstance.put(`${import.meta.env.VITE_API_URL}/staff/${id}`, data)
  return response.data
}

export const deleteStaff = async (id: number) => {
  const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/staff/${id}`)
  return response.data
}
