import api from './index'
import { apiRoutes } from '../../data/api-routes'

export interface CustomizedImageGroupData {
  name: string
  label: string
}

export interface CustomizedImageGroupResponse extends CustomizedImageGroupData {
  _id: string
}

export const listCustomizedImageGroup = async (callback: (data: CustomizedImageGroupResponse[]) => void): Promise<void> => {
  const response = await api.get(apiRoutes.customizedImageGroup)
  callback(response.data)
}

export const createCustomizedImageGroup = async (data: CustomizedImageGroupData, callback: (data: CustomizedImageGroupResponse) => void): Promise<void> => {
  try {
    const response = await api.post(apiRoutes.customizedImageGroup, data)
    callback(response.data)
  } catch (error) {
    callback(error)
  }
}
