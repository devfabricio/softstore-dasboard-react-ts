import index from './index'
import { addProductQuantityInCategory, CategoryData } from './categories'
import { uploadObjectOnS3 } from '../aws/upload-object'
import { uuid } from 'uuidv4'

export interface ProductData {
  name: string
  description: string
  thumbImg: string
  category: string | CategoryData
  price: number
  oldPrice?: number
}

export interface ProductDataRequest extends ProductData{
  category: string
}

export interface ProductDataResponse extends ProductData {
  _id: string
  category: CategoryData
}

export const createProduct = async (data: ProductDataRequest, file: File, callback: (data?: ProductDataResponse, errorMessage?: string) => void): Promise<void> => {
  const ext = file.name.substr(file.name.length - 3)
  const filename = uuid() + '.' + ext
  const path = `uploads/images/products/${filename}`
  data.thumbImg = path
  try {
    const response = await index.post('product', data)
    await addProductQuantityInCategory(data.category)
    await uploadObjectOnS3(file, path)
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}

export const listProducts = async (callback: (data?: ProductDataResponse[], errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await index.get('product')
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}

export const showProduct = async (id: string, callback: (data?: ProductDataResponse, errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await index.get(`product/i/${id}`)
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}

export const updateProduct = async (data: ProductDataRequest, currentProduct: ProductDataResponse, file: File | null, callback: (data?: ProductDataResponse, errorMessage?: string) => void): Promise<void> => {
  let path: string = ''
  if (file) {
    const ext = file.name.substr(file.name.length - 3)
    const filename = uuid() + '.' + ext
    path = `uploads/images/products/${filename}`
    data.thumbImg = path
  } else {
    data.thumbImg = currentProduct.thumbImg
  }

  try {
    const response = await index.put('product', { ...data, _id: currentProduct._id })
    await addProductQuantityInCategory(data.category)
    if (file) {
      await uploadObjectOnS3(file, path)
    }
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}
