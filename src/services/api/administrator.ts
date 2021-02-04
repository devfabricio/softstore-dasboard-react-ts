import api from './index'
import { uuid } from 'uuidv4'
import { AWSDataResponse, uploadObjectOnS3 } from '../aws/upload-object'
import imageCompression from 'browser-image-compression'
import { apiRoutes } from '../../data/api-routes'

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
    const response = await api.get(`${apiRoutes.administrator}/${id}`)
    callback(response.data)
  } catch (error) {
    callback(undefined, error)
  }
}

export const updateAdministrator = async (data: AdministratorData, callback: (data?: AdministratorData, errorMessage?: string) => void): Promise<void> => {
  try {
    delete data.password
    const response = await api.put(`${apiRoutes.administrator}`, data)
    callback(response.data)
  } catch (error) {
    console.log(error.response)
    callback(undefined, error)
  }
}

const compressionOptions = {
  maxSizeMB: 0.4,
  maxWidthOrHeight: 1024
}

export const updateProfilePhoto = async (data: AdministratorData, file: File, callback: (data?: AdministratorData, errorMessage?: string) => void): Promise<void> => {
  const ext = file.name.substr(file.name.length - 3)
  const filename = uuid() + '.' + ext
  const path = `uploads/images/users/profile/${filename}`
  delete data.password
  const body = { ...data, profileImg: path }
  const response = await api.get('app-data/aws')
  const awsData: AWSDataResponse = response.data
  try {
    const compressedFile: File = await imageCompression(file, compressionOptions) as File
    await uploadObjectOnS3(compressedFile, path, awsData)
    const response = await api.put(`${apiRoutes.administrator}`, body)
    if (response) {
      callback(body)
    }
  } catch (error) {
    callback(undefined, error.response.message)
  }
}
