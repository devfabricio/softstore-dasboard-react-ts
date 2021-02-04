import { AWSDataResponse, deleteObjectOnS3, uploadObjectOnS3 } from '../aws/upload-object'
import api from './index'
import { apiRoutes } from '../../data/api-routes'
import { AcceptedFile } from '../../utils/format-files'
import imageCompression from 'browser-image-compression'
import { generateS3ImagePath } from '../aws/config'
import { ProductPhotoResponse } from './product-photo'

export interface Photo {
  path: string
  thumbPath: string
}

export interface PhotoResponse extends Photo{
  _id: string
}

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

export interface CreateProductData extends ProductData {
  photos: Photo[]
}

export const createProduct = async (data: CreateProductData, acceptedFiles: AcceptedFile[], callback: (data?: ProductDataResponse, errorMessage?: string) => void): Promise<void> => {
  try {
    const photosUrl: Photo[] = []
    const res = await api.get('app-data/aws')
    const awsData: AWSDataResponse = res.data
    for (const { file } of acceptedFiles) {
      const mainFile: File = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1024 }) as File
      const thumbFile: File = await imageCompression(file, { maxSizeMB: 0.5, maxWidthOrHeight: 500 }) as File
      const { path, thumbPath } = generateS3ImagePath(file, 'products')
      await uploadObjectOnS3(thumbFile, thumbPath, awsData)
      await uploadObjectOnS3(mainFile, path, awsData)
      photosUrl.push({ path, thumbPath })
    }

    data.thumbImg = photosUrl[0].path
    data.photos = photosUrl.reverse()

    const response = await api.post('product', { ...data })
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

export const updateProduct = async (data: CreateProductData, currentProduct: ProductDataResponse, currentPhotos: ProductPhotoResponse[], deletedPhotos: PhotoResponse[], acceptedFiles: AcceptedFile[], callback: (data?: ProductDataResponse, errorMessage?: string) => void): Promise<void> => {
  try {
    const photosUrl: Photo[] = []
    const res = await api.get('app-data/aws')
    const awsData: AWSDataResponse = res.data
    for (const { file } of acceptedFiles) {
      const mainFile: File = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1024 }) as File
      const thumbFile: File = await imageCompression(file, { maxSizeMB: 0.5, maxWidthOrHeight: 500 }) as File
      const { path, thumbPath } = generateS3ImagePath(file, 'products')
      await uploadObjectOnS3(thumbFile, thumbPath, awsData)
      await uploadObjectOnS3(mainFile, path, awsData)
      photosUrl.push({ path, thumbPath })
    }

    data.photos = photosUrl.reverse()

    for (const deletedPhoto of deletedPhotos) {
      await deleteObjectOnS3(deletedPhoto.path, awsData)
      await deleteObjectOnS3(deletedPhoto.thumbPath, awsData)
      await api.delete(`${apiRoutes.productPhoto}/${deletedPhoto._id}`)
    }

    if (!currentPhotos.find(it => it.path === currentProduct.thumbImg)) {
      if (currentPhotos.length > 0) {
        data.thumbImg = currentPhotos[0].thumbPath
      } else if (photosUrl.length > 0) {
        data.thumbImg = photosUrl[0].thumbPath
      }
    }

    const response = await api.put('product', { ...data, _id: currentProduct._id })
    callback(response.data)
  } catch (error) {
    console.log(error.response.data.message)
    callback(undefined, error.response.message)
  }
}

export const deleteProduct = async (product: ProductDataResponse, callback: (errorMessage?: string) => void): Promise<void> => {
  try {
    const response = await api.get('app-data/aws')
    const awsData: AWSDataResponse = response.data
    await deleteObjectOnS3(product.thumbImg, awsData)
    await api.delete(`${apiRoutes.product}/${product._id}`)
    callback()
  } catch (error) {
    console.log(error)
  }
}
