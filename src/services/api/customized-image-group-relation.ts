import api from './index'
import { apiRoutes } from '../../data/api-routes'
import { CustomizedImageResponse } from './customized-images'
import { CustomizedImageGroupResponse } from './customized-image-group'
import { GalleryImageInterface } from '../../views/pages/Products/AddCustomizedImage'

export interface CustomizedImageGroupRelationData {
  image: string | CustomizedImageResponse
  group: string | CustomizedImageGroupResponse
}

export interface CustomizedImageGroupRelationResponse extends CustomizedImageGroupRelationData {
  _id: string
}

export const listCustomizedImageGroupRelation = async (callback: (data: CustomizedImageGroupRelationResponse[]) => void): Promise<void> => {
  const response = await api.get(apiRoutes.customizedImageGroupRelation)
  callback(response.data)
}

export const createCustomizedImageGroupRelation = async (group: string, images: GalleryImageInterface[], callback: (data?: CustomizedImageGroupRelationResponse) => void): Promise<void> => {
  try {
    for (const image of images) {
      await api.post(apiRoutes.customizedImageGroupRelation, { image: image.id, group: group })
    }
    callback()
  } catch (error) {
    callback(error)
  }
}

export const deleteCustomizedImageGroupRelation = async (imageRelations: CustomizedImageGroupRelationResponse[], callback: (errorMessage?: string) => void): Promise<void> => {
  try {
    for (const imageRelation of imageRelations) {
      await api.delete(`${apiRoutes.customizedImageGroupRelation}/${imageRelation._id}`)
    }
    callback()
  } catch (error) {
    console.log(error.response.data.message)
  }
}
