import { deleteObjectOnS3, uploadObjectOnS3 } from '../aws/upload-object'
import { uuid } from 'uuidv4'
import api from './index'
import { apiRoutes } from '../../data/api-routes'

export interface ProductData {
  name: string
  description: string
  thumbImg: string
  category: string[]
  price: number
  status: string
  oldPrice?: number
  costPerItem?: number
  quantityInStock?: number
  sku?: string
  barCode?: number
  weight?: number
  packingHeight?: number
  packingLength?: number
  packingWidth?: number
}

export interface ProductDataResponse extends ProductData {
  _id: string
}

export const createProduct = async (data: ProductData, file: File, callback: (data?: ProductDataResponse, errorMessage?: string) => void): Promise<void> => {
  const ext = file.name.substr(file.name.length - 3)
  const filename = uuid() + '.' + ext
  const path = `uploads/images/products/${filename}`
  data.thumbImg = path
  try {
    const response = await api.post('product', { ...data })
    await uploadObjectOnS3(file, path)
    callback(response.data)
  } catch (error) {
    console.log(error.response.data.message)
    callback(undefined, error.response.data.message)
  }
}

export const listProducts = async (callback: (data?: ProductDataResponse[], errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.get('product')
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}

export const showProduct = async (id: string, callback: (data?: ProductDataResponse, errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.get(`product/i/${id}`)
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}

export const updateProduct = async (data: ProductData, currentProduct: ProductDataResponse, file: File | null, callback: (data?: ProductDataResponse, errorMessage?: string) => void): Promise<void> => {
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
    const response = await api.put('product', { ...data, _id: currentProduct._id })
    if (file) {
      await uploadObjectOnS3(file, path)
    }
    callback(response.data)
  } catch (error) {
    callback(undefined, error.response.message)
  }
}

export const deleteProduct = async (product: ProductDataResponse, callback: (errorMessage?: string) => void): Promise<void> => {
  try {
    await deleteObjectOnS3(product.thumbImg)
    await api.delete(`${apiRoutes.product}/${product._id}`)
    callback()
  } catch (error) {
    console.log(error)
  }
}
