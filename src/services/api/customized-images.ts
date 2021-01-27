import api from './index'
import { apiRoutes } from '../../data/api-routes'
import { deleteObjectOnS3, uploadObjectOnS3 } from '../aws/upload-object'
import { AcceptedFile } from '../../utils/format-files'
import { generateS3ImagePath, s3BaseUrl } from '../aws/config'
import imageCompression from 'browser-image-compression'
import { GalleryImageInterface } from '../../views/pages/Products/AddCustomizedImage'

export interface CustomizedImageData {
  url: string
  thumbUrl: string
  width: number
  height: number
  thumbWidth: number
  thumbHeight: number
}

export interface CustomizedImageResponse extends CustomizedImageData {
  _id: string
}

const messages = [
  {
    original: 'CustomizedImage already exists',
    translate_BR: 'A categoria já está cadastrada'
  }
]

export const listCustomizedImage = async (callback: (data: CustomizedImageResponse[]) => void): Promise<void> => {
  const response = await api.get(apiRoutes.customizedImage)
  callback(response.data)
}

export const createCustomizedImage = async (acceptedFiles: AcceptedFile[], callback: (sentCount?: number, data?: CustomizedImageData, errorMessage?: string) => void): Promise<void> => {
  let count = 0
  for (const { file } of acceptedFiles) {
    try {
      const mainFile: File = await imageCompression(file, { maxSizeMB: 0.4, maxWidthOrHeight: 1024 }) as File
      const thumbFile: File = await imageCompression(file, { maxSizeMB: 0.2, maxWidthOrHeight: 200 }) as File
      const { path, fullURL, thumbPath, fullThumbURL } = generateS3ImagePath(file, 'customized-images')
      await uploadObjectOnS3(thumbFile, thumbPath)
      await uploadObjectOnS3(mainFile, path)
      await api.post(apiRoutes.customizedImage, { url: fullURL, thumbUrl: fullThumbURL })
      count++
      callback(count)
    } catch (error) {
      console.log(error)
      const message = messages.find(message => message.original === error.response.data.message)
      callback(undefined, undefined, message?.translate_BR)
    }
  }
}

export const updateCustomizedImage = async (data: CustomizedImageData, callback: (data?: CustomizedImageData, errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.put(apiRoutes.customizedImage, data)
    callback(response.data)
  } catch (error) {
    const message = messages.find(message => message.original === error.response.data.message)
    callback(undefined, message?.translate_BR)
  }
}

export const addProductQuantityInCustomizedImage = async (id: string): Promise<void> => {
  await api.put(`${apiRoutes.customizedImage}/add-product-quantity`, { _id: id })
}

export const deleteCustomizedImage = async (galleryImages: GalleryImageInterface[], callback: (errorMessage?: string) => void): Promise<void> => {
  try {
    for (const customizedImage of galleryImages) {
      await deleteObjectOnS3(customizedImage.thumbnail.replace(`${s3BaseUrl}/`, ''))
      await deleteObjectOnS3(customizedImage.src.replace(`${s3BaseUrl}/`, ''))
      await api.delete(`${apiRoutes.customizedImage}/${customizedImage.id}`)
    }
    callback()
  } catch (error) {
    const message = messages.find(message => message.original === error.response.data.message)
    if (message) {
      callback(message.translate_BR)
    }
  }
}
