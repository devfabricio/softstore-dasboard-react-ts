import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { Form } from '@unform/web'
import { Button, Select } from '../../../../components/Common/Form'
import PageCard from '../../../../components/Common/PageCard'
import { GalleryImageInterface } from '../index'
import { SelectOptionsTypes } from '../../../../components/Common/Form/Select'
import SweetAlert from 'react-bootstrap-sweetalert'
import { deleteCustomizedImage } from '../../../../../services/api/customized-images'
import { FormHandles } from '@unform/core'
import { useFeedback } from '../../../../context/FeedbackProvider'
import { CustomizedImageGroupResponse } from '../../../../../services/api/customized-image-group'
import {
  createCustomizedImageGroupRelation,
  CustomizedImageGroupRelationResponse
} from '../../../../../services/api/customized-image-group-relation'
// @ts-ignore
import Gallery from 'react-grid-gallery'

interface ImageGalleryProps {
  listImages: () => void
  groups: CustomizedImageGroupResponse[]
  imageGroupRelations: CustomizedImageGroupRelationResponse[]
  galleryImages: GalleryImageInterface[]
  setGalleryImages: Dispatch<SetStateAction<GalleryImageInterface[]>>
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  listImages, setGalleryImages, galleryImages, groups, imageGroupRelations
}) => {
  const selectFormRef = useRef<FormHandles>(null)
  const [selectAllImages, setSelectAllImages] = useState(false)
  const [selectedImages, setSelectedImages] = useState<GalleryImageInterface[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImageInterface[]>([])
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showGroupSelectInput, setShowGroupSelectInput] = useState(false)
  const [currentGroupSelected, setCurrentGroupSelected] = useState('')
  const [currentActionSelected, setCurrentActionSelected] = useState('')
  const { openToast, showBackdrop, dismissBackdrop } = useFeedback()

  useEffect(() => {
    setSelectAllImages(selectedImages.length === galleryImages.length)
  }, [galleryImages.length, selectedImages])

  const selectOptions: SelectOptionsTypes[] = [
    {
      key: 'Selecione uma opção',
      value: ''
    },
    {
      key: 'Excluir selecionados',
      value: 'delete_selected'
    },
    {
      key: 'Adicionar selecionadas ao grupo',
      value: 'move_to_group'
    },
    {
      key: 'Exibir imagens do grupo',
      value: 'filter_images'
    }
  ]

  const getGroupOptions = useCallback((): SelectOptionsTypes[] => {
    const options: SelectOptionsTypes[] = []
    if (currentActionSelected === 'filter_images') {
      options.push({
        key: 'Todas as imagens',
        value: 'all_images'
      })
      options.push({
        key: 'Todas os grupos',
        value: 'all_groups'
      })
    } else {
      options.push({
        key: 'Selecione um grupo abaixo',
        value: ''
      })
    }
    for (const group of groups) {
      options.push({
        key: group.name,
        value: group._id
      })
    }
    return options
  }, [currentActionSelected, groups])

  const handleChangeSelectAction = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    selectFormRef.current?.clearField('group')
    setCurrentActionSelected(value)
    if (value === 'move_to_group' || value === 'filter_images') {
      setShowGroupSelectInput(true)
    } else {
      setShowGroupSelectInput(false)
    }
  }, [])

  const handleChangeSelectGroup = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentGroupSelected(value)
  }, [])

  const handleApplyAction = useCallback((data: any) => {
    if (data.action === 'delete_selected') {
      setShowConfirmDelete(true)
    }
    if (data.action === 'move_to_group') {
      createCustomizedImageGroupRelation(currentGroupSelected, selectedImages, () => {
        openToast('Imagens adicionadas com sucesso!', 'success')
      })
    }
    if (data.action === 'filter_images') {
      const filteredGallery: GalleryImageInterface[] = []
      if (currentGroupSelected === 'all_images') {
        setFilteredImages([])
      } else if (currentGroupSelected === 'all_groups') {
        setFilteredImages([])
      } else {
        const arr = imageGroupRelations.filter(relation => relation.group === currentGroupSelected)
        for (const relation of arr) {
          const image = galleryImages.find(image => image.id === relation.image)
          if (image) {
            filteredGallery.push(image)
          }
        }
        setFilteredImages(filteredGallery)
      }
    }
  }, [currentGroupSelected, galleryImages, imageGroupRelations, openToast, selectedImages])

  const handleSelectAllImages = useCallback(() => {
    const galleryImagesArr: GalleryImageInterface[] = []
    const selectedImagesArr: GalleryImageInterface[] = []
    for (const galleryImage of galleryImages) {
      galleryImage.isSelected = !selectAllImages
      if (!selectAllImages) {
        selectedImagesArr.push(galleryImage)
      }
      galleryImagesArr.push(galleryImage)
    }
    setSelectedImages(selectedImagesArr)
    setSelectAllImages(currentValue => !currentValue)
    setGalleryImages(galleryImagesArr)
  }, [galleryImages, selectAllImages, setGalleryImages])

  const onSelectImage = useCallback((index: number, image: GalleryImageInterface) => {
    const isSelected = !galleryImages[index].isSelected
    galleryImages[index].isSelected = isSelected
    if (isSelected) {
      setSelectedImages(arr => [...arr, image])
    } else {
      setSelectedImages(arr => arr.filter(selectedImage => selectedImage.id !== image.id))
    }
    setGalleryImages(galleryImages)
  }, [galleryImages, setGalleryImages])

  const removeCustomizedImages = useCallback(() => {
    setShowConfirmDelete(false)
    showBackdrop()
    deleteCustomizedImage(selectedImages, () => {
      listImages()
      dismissBackdrop()
      openToast('Imagens excluídas com sucesso', 'success')
    })
  }, [dismissBackdrop, listImages, openToast, selectedImages, showBackdrop])

  return (<PageCard title={'Galeria'} description={'Fotos dos produtos'}>
    <Row>
      <Col sm={showGroupSelectInput ? '8' : '4'}>
        <div className={'float-end'}>
          <Form ref={selectFormRef} className={'d-flex'} action="#" onSubmit={handleApplyAction}>
            <span className={'pt-2 mr-2 d-inline-block'}>Ação</span>
            <Select name={'action'} onChange={(e) => handleChangeSelectAction(e)} options={selectOptions} className="form-control select2" />
            {showGroupSelectInput && <Select name={'group'} options={getGroupOptions()} onChange={(e) => handleChangeSelectGroup(e)} className="ml-2 mr-2 form-control select2" />}
            <Button type="submit" color="primary" className="ml-2 waves-effect waves-light btn btn-primary"> Aplicar </Button>
          </Form>
        </div>
      </Col>
      <Col sm={showGroupSelectInput ? '4' : '8'} className={'d-flex justify-content-end'}>
        <Button type="button" className={`${showGroupSelectInput ? 'ml-3' : 'ml-2'} waves-effect waves-light btn ${selectAllImages ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleSelectAllImages()}> Selecionar Tudo </Button>
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
