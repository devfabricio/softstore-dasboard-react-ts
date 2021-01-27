import api from './index'
import { apiRoutes } from '../../data/api-routes'

export interface ProductCustomizedImageGroupRelationResponse {
  group: string
  product: string
}

export const listProductCustomizedImageGroups = async (productId: string, callback: (data?: ProductCustomizedImageGroupRelationResponse[], errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.get(`${apiRoutes.productCustomizedImage}/product/${productId}`)
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}
