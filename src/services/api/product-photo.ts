import api from './index'
import { apiRoutes } from '../../data/api-routes'

export interface ProductPhoto {
  path: string
  thumbPath: string
  width: number
  height: number
  thumbWidth: number
  thumbHeight: number
  product: string
}

export interface ProductPhotoResponse extends ProductPhoto{
  _id: string
}

export const listProductPhotos = async (productId: string, callback: (data?: ProductPhotoResponse[], errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.get(`${apiRoutes.productPhoto}/product/${productId}`)
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}
