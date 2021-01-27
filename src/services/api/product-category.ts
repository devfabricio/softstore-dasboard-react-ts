import api from './index'
import { apiRoutes } from '../../data/api-routes'

export interface ProductCategoryResponse {
  product: string
  category: string
}

export const listProductCategories = async (productId: string, callback: (data?: ProductCategoryResponse[], errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.get(`${apiRoutes.productCategory}/product/${productId}`)
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}
