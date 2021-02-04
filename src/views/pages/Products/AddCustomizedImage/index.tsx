import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row, Table, UncontrolledTooltip } from 'reactstrap'
import PageContent from '../../../components/Common/PageContent'
import {
  listCustomizedImage
} from '../../../../services/api/customized-images'
import ImageGallery from './ImageGallery'
import ImageUpload from './ImageUpload'
import CreateImagesGroup from './CreateImagesGroup'
import {
  CustomizedImageGroupResponse,
  deleteCustomizedImageGroup,
  listCustomizedImageGroup
} from '../../../../services/api/customized-image-group'
import {
  CustomizedImageGroupRelationResponse,
  listCustomizedImageGroupRelation
} from '../../../../services/api/customized-image-group-relation'
import PageCard from '../../../components/Common/PageCard'
import { Link } from 'react-router-dom'
import { useFeedback } from '../../../context/FeedbackProvider'
import { Helmet } from 'react-helmet'

export interface GalleryImageInterface {
  id: string
  src: string
  thumbnail: string
  thumbnailWidth: number
  thumbnailHeight: number
  isSelected: boolean
}

const AddCustomizedImage: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImageInterface[]>([])
  const [groups, setGroups] = useState<CustomizedImageGroupResponse[]>([])
  const [imageGroupRelations, setImageGroupRelations] = useState<CustomizedImageGroupRelationResponse[]>([])
  const { openToast, showBackdrop, dismissBackdrop } = useFeedback()

  const listImages = useCallback(() => {
    listCustomizedImage(customizedImages => {
      console.log(customizedImages)
      const gallery: GalleryImageInterface[] = []
      if (customizedImages) {
        for (const customizedImage of customizedImages) {
          const image: GalleryImageInterface = {
            id: customizedImage._id,
            src: customizedImage.url,
            thumbnail: customizedImage.thumbUrl,
            thumbnailWidth: 100,
            thumbnailHeight: 100,
            isSelected: false
          }
          gallery.push(image)
        }
        setGalleryImages(gallery)
      }
    })
  }, [])

  const listGroups = useCallback(() => {
    listCustomizedImageGroup(customizedImageGroups => {
      if (customizedImageGroups) {
        setGroups(customizedImageGroups)
      }
    })
  }, [])

  const listImageGroupRelations = useCallback(() => {
    listCustomizedImageGroupRelation(imageGroupRelations => {
      if (imageGroupRelations) {
        setImageGroupRelations(imageGroupRelations)
      }
    })
  }, [])

  useEffect(() => {
    listGroups()
    listImages()
    listImageGroupRelations()
  }, [listImages, listGroups, listImageGroupRelations])

  const removeGroup = useCallback((id: string) => {
    showBackdrop()
    deleteCustomizedImageGroup(id, () => {
      dismissBackdrop()
      listGroups()
      listImageGroupRelations()
      openToast('Grupo excluído com sucesso!', 'success')
    })
  }, [dismissBackdrop, listGroups, listImageGroupRelations, openToast, showBackdrop])

  return (
    <PageContent pageTitle={'Imagens Personalizadas'}>
      <Helmet>
        <title>Imagens Personalizadas | Painel Administrativo | Sonhadeira</title>
        <meta name="description" content="Painel administrativo da Sonhadeira" />
      </Helmet>
      <Row>
        <Col sm="6">
          <CreateImagesGroup listGroups={listGroups} />
        </Col>
        <Col sm="6">
          <PageCard title={'Lista de Grupos'} description={'Confira abaixo a lista de grupos de imagens'} >
            <div className="table-responsive">
              <Table className="table mb-0">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Label</th>
                  <th>Qtd. de Imagens</th>
                  <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {groups.map((group, index) => {
                  return (
                    <tr key={group._id}>
                      <td>{index + 1}</td>
                      <td><Link to={''}>
                        {group.name}</Link></td>
                      <td>{group.label}</td>
                      <td>{imageGroupRelations.filter(it => it.group === group._id).length}</td>
                      <td>
                        <Link to="#" className="text-danger" onClick={(e) => {
                          e.preventDefault()
                          removeGroup(group._id)
                        }
                        }>
                          <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip" />
                          <UncontrolledTooltip placement="top" target="deletetooltip">
                            Deletar
                          </UncontrolledTooltip>
                        </Link>
                      </td>
                    </tr>)
                })}
                </tbody>
              </Table>
            </div>
          </PageCard>
        </Col>
        <Col sm="12">
          <ImageGallery listImages={listImages}
                        listImageGroupRelations={listImageGroupRelations}
                        groups={groups}
                        imageGroupRelations={imageGroupRelations}
                        galleryImages={galleryImages}
                        setGalleryImages={setGalleryImages} />
          <ImageUpload listImages={listImages} />
        </Col>
      </Row>
      </PageContent>
  )
}

export default AddCustomizedImage
