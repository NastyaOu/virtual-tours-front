import type { IOrganization } from '@/interfaces/Organization'
import { axiosInstance } from './../axios-instance'

export const getOrganizations = async (): Promise<IOrganization[]> => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/organization`)
  return response.data
}

export const getOrganization = async (id: number): Promise<IOrganization> => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/organization/${id}`)
  return response.data
}

export const createOrganization = async (data: FormData): Promise<IOrganization> => {
  const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/organization`, data)
  return response.data
}

export const updateOrganization = async (id: number, data: FormData): Promise<IOrganization> => {
  const response = await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/organization/${id}`,
    data
  )
  return response.data
}

export const deleteOrganization = async (id: number) => {
  const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/organization/${id}`)
  return response.data
}
