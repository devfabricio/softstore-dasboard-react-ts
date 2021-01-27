import api from './index'
import { CategoryData } from './categories'

export interface CategoryRelationshipData {
  category: string | CategoryData
  parent?: string | CategoryData
  level?: number
  count: number
}

export interface CategoryRelationshipResponse extends CategoryRelationshipData {
  _id: string
  category: CategoryData
  parent?: CategoryData
}

const categoryUrl = 'category-relationship'

const messages = [
  {
    original: 'CategoryRelationship already exists',
    translate_BR: 'A categoria já está cadastrada'
  }
]

export const listCategoryRelationship = async (callback: (data: CategoryRelationshipResponse[]) => void): Promise<void> => {
  const response = await api.get(categoryUrl)
  callback(response.data)
}

export const updateCategoryRelationship = async (data: CategoryRelationshipData, callback: (data?: CategoryRelationshipData, errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.put(categoryUrl, data)
    callback(response.data)
  } catch (error) {
    const message = messages.find(message => message.original === error.response.data.message)
    callback(undefined, message?.translate_BR)
  }
}

export const addProductQuantityInCategoryRelationship = async (id: string): Promise<void> => {
  await api.put(`${categoryUrl}/add-product-quantity`, { _id: id })
}

export const deleteCategoryRelationship = async (id: string, callback: (errorMessage?: string) => void): Promise<void> => {
  try {
    await api.delete(`${categoryUrl}/${id}`)
    callback()
  } catch (error) {
    const message = messages.find(message => message.original === error.response.data.message)
    if (message) {
      callback(message.translate_BR)
    }
  }
}
