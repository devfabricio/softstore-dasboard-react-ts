import { SelectOptionsTypes } from '../../../../components/Common/Form/Select'
import { CustomizedImageGroupResponse } from '../../../../../services/api/customized-image-group'
import { GalleryImageInterface } from '../index'

export const selectOptions = (selectedImages: GalleryImageInterface[]): SelectOptionsTypes[] => [
  {
    key: 'Selecione uma opção',
    value: ''
  },
  {
    key: 'Exibir todas a imagens',
    value: 'show_all_images'
  },
  {
    key: 'Exibir somente do grupo',
    value: 'show_group_images'
  },
  {
    key: 'Adicionar ao grupo',
    value: 'move_to_group',
    disabled: selectedImages.length === 0
  },
  {
    key: 'Excluir',
    value: 'delete_from_gallery',
    disabled: selectedImages.length === 0
  }
]

export const getGroupOptions = (groups: CustomizedImageGroupResponse[]): SelectOptionsTypes[] => {
  const options: SelectOptionsTypes[] = []
  options.push({
    key: 'Selecione um grupo abaixo',
    value: ''
  })
  for (const group of groups) {
    options.push({
      key: group.name,
      value: group._id
    })
  }
  return options
}

export const toogleSelectAllImages = (images: GalleryImageInterface[], selectAllImages: boolean): GalleryImageInterface[] => {
  const imagesArr: GalleryImageInterface[] = []
  for (const image of images) {
    image.isSelected = !selectAllImages
    imagesArr.push(image)
  }
  return imagesArr
}

export const toogleSelectImage = (images: GalleryImageInterface[], selectAllImages: boolean): GalleryImageInterface[] => {
  const imagesArr: GalleryImageInterface[] = []
  for (const image of images) {
    image.isSelected = !selectAllImages
    imagesArr.push(image)
  }
  return imagesArr
}
