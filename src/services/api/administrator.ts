import api from './index'
import { uuid } from 'uuidv4'
import { uploadObjectOnS3 } from '../aws/upload-object'

export interface AdministratorData {
  _id: string
  name: string
  email: string
  role: number
  password?: string
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

export const updateAdministrator = async (data: AdministratorData, callback: (data?: AdministratorData, errorMessage?: string) => void): Promise<void> => {
  try {
    delete data.password
    const response = await api.put('administrator', data)
    callback(response.data)
  } catch (error) {
    console.log(error.response)
    callback(undefined, error)
  }
}

export const updateProfilePhoto = async (data: AdministratorData, file: File, callback: (data?: AdministratorData, errorMessage?: string) => void): Promise<void> => {
  console.log(file.type)
  const ext = 'jpg'
  const filename = uuid() + '.' + ext
  const path = `uploads/images/products/${filename}`
  data.profileImg = path
  delete data.password
  try {
    await uploadObjectOnS3(file, path)
    const response = await api.put('administrator', data)
    if (response) {
      callback(data)
    }
  } catch (error) {
    callback(undefined, error.response.message)
  }
}
