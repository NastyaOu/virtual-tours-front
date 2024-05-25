import type { ILocation } from '@/interfaces/Location'
import { axiosInstance } from './../axios-instance'

export const getLocations = async (idOrganization: number): Promise<ILocation[]> => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/organization/${idOrganization}/location`
  )
  return response.data
}

export const getLocation = async (id: number): Promise<ILocation> => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/location/${id}`)
  return response.data
}

export const createLocation = async (
  idOrganization: number,
  data: FormData
): Promise<ILocation> => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/organization/${idOrganization}/location`,
    data
  )
  return response.data
}

export const updateLocation = async (id: number, data: FormData): Promise<ILocation> => {
  const response = await axiosInstance.put(`${import.meta.env.VITE_API_URL}/location/${id}`, data)
  return response.data
}

export const deleteLocation = async (id: number) => {
  const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/location/${id}`)
  return response.data
}
