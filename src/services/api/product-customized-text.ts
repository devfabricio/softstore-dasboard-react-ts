import api from './index'
import { apiRoutes } from '../../data/api-routes'

export interface ProductCustomizedTextResponse {
  product: string
  label: string
}

export const listProductCustomizedTexts = async (productId: string, callback: (data?: ProductCustomizedTextResponse[], errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.get(`${apiRoutes.productCustomizedText}/product/${productId}`)
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}
