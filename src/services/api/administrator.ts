import api from './index'

export interface AdministratorData {
  _id: string
  name: string
  email: string
  password: string
  role: number
  profileImg?: string
}

export const showAdministratorProfile = async (id: string, callback: (data?: AdministratorData, errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.get(`administrator/${id}`)
    callback(response.data)
  } catch (error) {
    callback(undefined, error)
  }
}
