import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { Form } from '@unform/web'
import { Button, Select } from '../../../../components/Common/Form'
import PageCard from '../../../../components/Common/PageCard'
import { GalleryImageInterface } from '../index'
import SweetAlert from 'react-bootstrap-sweetalert'
import { deleteCustomizedImage } from '../../../../../services/api/customized-images'
import { FormHandles } from '@unform/core'
import { useFeedback } from '../../../../context/FeedbackProvider'
import { CustomizedImageGroupResponse } from '../../../../../services/api/customized-image-group'
import { getGroupOptions, selectOptions } from './options'
import {
  createCustomizedImageGroupRelation,
  CustomizedImageGroupRelationResponse, deleteCustomizedImageGroupRelation
} from '../../../../../services/api/customized-image-group-relation'
// @ts-ignore
import Gallery from 'react-grid-gallery'

interface ImageGalleryProps {
  listImages: () => void
  listImageGroupRelations: () => void
  groups: CustomizedImageGroupResponse[]
  imageGroupRelations: CustomizedImageGroupRelationResponse[]
  galleryImages: GalleryImageInterface[]
  setGalleryImages: Dispatch<SetStateAction<GalleryImageInterface[]>>
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  listImages, listImageGroupRelations, setGalleryImages, galleryImages, groups, imageGroupRelations
}) => {
  const selectFormRef = useRef<FormHandles>(null)
  const [selectAllImages, setSelectAllImages] = useState(false)
  const [selectedImages, setSelectedImages] = useState<GalleryImageInterface[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImageInterface[]>([])
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showGroupSelectInput, setShowGroupSelectInput] = useState(false)
  const [currentGroupSelected, setCurrentGroupSelected] = useState('')
  const { openToast, showBackdrop, dismissBackdrop } = useFeedback()

  useEffect(() => {
    setSelectAllImages(selectedImages.length === galleryImages.length)
  }, [galleryImages.length, selectedImages])

  const handleChangeSelectAction = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    selectFormRef.current?.clearField('group')
    if (value === 'move_to_group' || value === 'show_group_images') {
      setShowGroupSelectInput(true)
    } else {
      setShowGroupSelectInput(false)
    }
  }, [])

  const handleChangeSelectGroup = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentGroupSelected(value)
  }, [])

  const handleSelectAllImages = useCallback((toggle: boolean) => {
    const galleryImagesArr: GalleryImageInterface[] = []
    const selectedImagesArr: GalleryImageInterface[] = []

    const images = filteredImages.length > 0 ? filteredImages : galleryImages

    for (const image of images) {
      image.isSelected = toggle
      if (toggle) {
        selectedImagesArr.push(image)
      }
      galleryImagesArr.push(image)
    }

    setSelectedImages(selectedImagesArr)
    setSelectAllImages(toggle)

    if (filteredImages.length > 0) {
      setFilteredImages(galleryImagesArr)
    } else {
      setGalleryImages(galleryImagesArr)
    }
  }, [filteredImages, galleryImages, setGalleryImages])

  const moveImagesToGroup = useCallback(() => {
    showBackdrop()
    const images: GalleryImageInterface[] = []

    for (const selectedImage of selectedImages) {
      const groupImages = imageGroupRelations.filter(it => it.group === currentGroupSelected)
      const imageInGroup = groupImages.find(it => it.image === selectedImage.id)
      if (!imageInGroup) {
        console.log('imageNotInGroup')
        images.push(selectedImage)
      }
    }

    if (images.length > 0) {
      createCustomizedImageGroupRelation(currentGroupSelected, images, () => {
        listImageGroupRelations()
        handleSelectAllImages(false)
        dismissBackdrop()
        openToast('Imagens adicionadas com sucesso!', 'success')
      })
    } else {
      dismissBackdrop()
      openToast('As imagens selecionadas já pertecem ao grupo', 'warning')
    }
  }, [currentGroupSelected, handleSelectAllImages, imageGroupRelations, listImageGroupRelations, openToast, selectedImages])

  const showGroupedImages = useCallback(() => {
    handleSelectAllImages(false)
    const filteredGallery: GalleryImageInterface[] = []
    const arr = imageGroupRelations.filter(it => it.group === currentGroupSelected)
    for (const relation of arr) {
      const image = galleryImages.find(it => it.id === relation.image)
      if (image) {
        filteredGallery.push(image)
      }
    }
    setFilteredImages(filteredGallery)
  }, [currentGroupSelected, galleryImages, handleSelectAllImages, imageGroupRelations])

  const removeFromGroup = useCallback(() => {
    showBackdrop()
    const imagesToRemove: CustomizedImageGroupRelationResponse[] = []
    let newFilteredImages = filteredImages
    for (const image of selectedImages) {
      const imageRelation = imageGroupRelations.find(it => it.image === image.id && it.group === currentGroupSelected)
      if (imageRelation) {
        newFilteredImages = newFilteredImages.filter(it => it.id !== imageRelation.image)
        imagesToRemove.push(imageRelation)
      }
    }
    setFilteredImages(newFilteredImages)
    deleteCustomizedImageGroupRelation(imagesToRemove, () => {
      listImageGroupRelations()
      dismissBackdrop()
      openToast('Imagens removidas do grupo com sucesso!', 'success')
    })
  }, [currentGroupSelected, dismissBackdrop, filteredImages, imageGroupRelations, listImageGroupRelations, openToast, selectedImages, showBackdrop])

  const handleApplyAction = useCallback((data: any) => {
    if (data.action === 'show_all_images') {
      handleSelectAllImages(false)
      setFilteredImages([])
    }
    if (data.action === 'delete_from_gallery') {
      setShowConfirmDelete(true)
    }
    if (data.action === 'move_to_group') {
      moveImagesToGroup()
    }
    if (data.action === 'show_group_images') {
      showGroupedImages()
    }
  }, [handleSelectAllImages, moveImagesToGroup, showGroupedImages])

  const onSelectImage = useCallback((index: number, image: GalleryImageInterface) => {
    const images = filteredImages.length > 0 ? filteredImages : galleryImages
    const isSelected = !images[index].isSelected
    images[index].isSelected = isSelected
    if (isSelected) {
      setSelectedImages(arr => [...arr, image])
    } else {
      setSelectedImages(arr => arr.filter(selectedImage => selectedImage.id !== image.id))
    }
    if (filteredImages.length > 0) {
      setFilteredImages(images)
    } else {
      setGalleryImages(images)
    }
  }, [filteredImages, galleryImages, setGalleryImages])

  const removeCustomizedImages = useCallback(() => {
    setShowConfirmDelete(false)
    showBackdrop()
    deleteCustomizedImage(selectedImages, () => {
      listImages()
      listImageGroupRelations()
      dismissBackdrop()
      openToast('Imagens excluídas com sucesso', 'success')
    })
  }, [dismissBackdrop, listImageGroupRelations, listImages, openToast, selectedImages, showBackdrop])

  return (<PageCard title={'Galeria'} description={'Fotos dos produtos'}>
    <Row>
      <Col sm={showGroupSelectInput ? '8' : '4'}>
        <div className={'float-end'}>
          <Form ref={selectFormRef} className={'d-flex'} action="#" onSubmit={handleApplyAction}>
            <span className={'pt-2 mr-2 d-inline-block'}>Ação</span>
            <Select name={'action'} onChange={(e) => handleChangeSelectAction(e)} options={selectOptions(selectedImages)} className="form-control select2" />
            {showGroupSelectInput && <Select name={'group'} options={getGroupOptions(groups)} onChange={(e) => handleChangeSelectGroup(e)} className="ml-2 mr-2 form-control select2" />}
            <Button type="submit" color="primary" className="ml-2 waves-effect waves-light btn btn-primary"> Aplicar </Button>
          </Form>
        </div>
      </Col>
      <Col sm={showGroupSelectInput ? '4' : '8'} className={'d-flex justify-content-end'}>
        {(filteredImages.length > 0 && selectedImages.length > 0) &&
        <Button type="button" className={'waves-effect waves-light btn btn-outline-danger'} onClick={() => removeFromGroup()}> Remover do Grupo </Button>}
        <Button type="button" className={`${showGroupSelectInput ? 'ml-3' : 'ml-2'} waves-effect waves-light btn ${selectAllImages ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleSelectAllImages(!selectAllImages)}> Selecionar Tudo </Button>
      </Col>
    </Row>
    <Gallery images={filteredImages.length > 0 ? filteredImages : galleryImages}
             onSelectImage={onSelectImage}
    />
    {showConfirmDelete && <SweetAlert
      title="Tem certeza que deseja excluir as imagens selecionadas?"
      warning
      showCancel
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      onConfirm={() => {
        removeCustomizedImages()
      }}
      onCancel={() => {
        setShowConfirmDelete(false)
      }}
    >
      Esta ação não poderá ser revertida!
    </SweetAlert>}
  </PageCard>)
}

export default ImageGallery
