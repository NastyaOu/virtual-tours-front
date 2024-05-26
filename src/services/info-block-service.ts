import type { IInfoBlock } from '@/interfaces/Location'
import { axiosInstance } from './../axios-instance'

export const createInfoBlock = async (
  idLocation: number,
  text: string,
  coordX: number,
  coordY: number
): Promise<IInfoBlock> => {
  const data = {
    coordX,
    coordY,
    text
  }

  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/location/${idLocation}/info-block`,
    data
  )
  return response.data
}

export const updateInfoBlock = async (
  id: number,
  text: string,
  coordX: number,
  coordY: number
): Promise<IInfoBlock> => {
  const data = {
    coordX,
    coordY,
    text
  }

  const response = await axiosInstance.put(`${import.meta.env.VITE_API_URL}/info-block/${id}`, data)
  return response.data
}

export const deleteInfoBlock = async (id: number) => {
  const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/info-block/${id}`)
  return response.data
}
