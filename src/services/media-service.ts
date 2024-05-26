import type { IMedia } from '@/interfaces/Location'
import { axiosInstance } from './../axios-instance'

export const createMedia = async (idLocation: number, data: FormData): Promise<IMedia> => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/location/${idLocation}/media`,
    data
  )
  return response.data
}

export const updateMedia = async (id: number, coordX: number, coordY: number): Promise<IMedia> => {
  const data = {
    coordX,
    coordY
  }

  const response = await axiosInstance.put(`${import.meta.env.VITE_API_URL}/media/${id}`, data)
  return response.data
}

export const deleteMedia = async (id: number) => {
  const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/media/${id}`)
  return response.data
}
