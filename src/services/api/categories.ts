import api from './index'

export interface CategoryData {
  _id: string
  name: string
  slug: string
  productCounter: number
}

export interface CreateCategoryData {
  name: string
  parent?: string
}

const categoryUrl = 'category'

const messages = [
  {
    original: 'Category already exists',
    translate_BR: 'A categoria já está cadastrada'
  }
]

export const listCategory = async (callback: (data: CategoryData[]) => void): Promise<void> => {
  const response = await api.get(categoryUrl)
  callback(response.data)
}

export const createCategory = async (data: CreateCategoryData, callback: (data?: CategoryData, errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.post(categoryUrl, data)
    callback(response.data)
  } catch (error) {
    const message = messages.find(message => message.original === error.response.data.message)
    callback(undefined, message?.translate_BR)
  }
}

export const updateCategory = async (data: CreateCategoryData, id: string, callback: (data?: CategoryData, errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.put(categoryUrl, { ...data, _id: id })
    callback(response.data)
  } catch (error) {
    const message = messages.find(message => message.original === error.response.data.message)
    callback(undefined, message?.translate_BR)
  }
}

export const addProductQuantityInCategory = async (id: string): Promise<void> => {
  await api.put(`${categoryUrl}/add-product-quantity`, { _id: id })
}

export const deleteCategory = async (id: string, callback: (errorMessage?: string) => void): Promise<void> => {
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
