import api from './index'
import { apiRoutes } from '../../data/api-routes'

export interface ProductSpecificationResponse {
  _id: string
  product: string
  name: string
  value: string
}

export const list = async (productId: string, callback: (data?: ProductSpecificationResponse[], errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.get(`${apiRoutes.productSpecification}/product/${productId}`)
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}
