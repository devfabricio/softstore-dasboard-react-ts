import api from './index'
import { apiRoutes } from '../../data/api-routes'

export interface SettingsData {
  siteTitle: string
  siteDescription: string
  address: string
  phone: string
  email: string
  openingHours: string
  about: string
  facebook: string
  instagram: string
  linkedin: string
  pinterest: string
  twitter: string
  youtube: string
}

export const updateSettings = async (data: SettingsData, callback: (data?: SettingsData, errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.put(apiRoutes.options, data)
    callback(response.data)
  } catch (error) {
    callback(error)
  }
}

export const showSettings = async (callback: (data?: SettingsData, errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.get(apiRoutes.options)
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}
