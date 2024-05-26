import type { ITransition } from '@/interfaces/Location'
import { axiosInstance } from './../axios-instance'

export const createTransition = async (
  idLocation: number,
  coordX: number,
  coordY: number,
  targetLocationId: number
): Promise<ITransition> => {
  const data = {
    coordX,
    coordY,
    targetLocationId
  }

  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/location/${idLocation}/transition`,
    data
  )
  return response.data
}

export const updateTransition = async (
  id: number,
  coordX: number,
  coordY: number
): Promise<ITransition> => {
  const data = {
    coordX,
    coordY
  }

  const response = await axiosInstance.put(`${import.meta.env.VITE_API_URL}/transition/${id}`, data)
  return response.data
}

export const deleteTransition = async (id: number) => {
  const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/transition/${id}`)
  return response.data
}
