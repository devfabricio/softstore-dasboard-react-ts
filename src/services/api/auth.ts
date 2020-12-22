import api from './index'
import { AdministratorData, showAdministratorProfile } from './administrator'

export const authVerify = async (token: string, userId: string, callback: (data?: AdministratorData, errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.post('administrator/auth/verify', { token })
    const { authenticated } = response.data
    if (authenticated) {
      await showAdministratorProfile(userId, (data, errorMessage) => {
        callback(data)
      })
    } else {
      callback(undefined)
    }
  } catch (error) {
    callback(undefined, error)
  }
}
