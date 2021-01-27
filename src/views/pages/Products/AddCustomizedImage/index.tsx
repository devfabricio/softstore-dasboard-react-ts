import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row, Table, UncontrolledTooltip } from 'reactstrap'
import PageContent from '../../../components/Common/PageContent'
import {
  listCustomizedImage
} from '../../../../services/api/customized-images'
import ImageGallery from './ImageGallery'
import ImageUpload from './ImageUpload'
import CreateImagesGroup from './CreateImagesGroup'
import { CustomizedImageGroupResponse, listCustomizedImageGroup } from '../../../../services/api/customized-image-group'
import {
  CustomizedImageGroupRelationResponse,
  listCustomizedImageGroupRelation
} from '../../../../services/api/customized-image-group-relation'
import PageCard from '../../../components/Common/PageCard'
import { Link } from 'react-router-dom'

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

  return (
    <PageContent>
      <Row>
        <Col sm="12">
          <ImageUpload listImages={listImages} />
          <ImageGallery listImages={listImages}
                        groups={groups}
                        imageGroupRelations={imageGroupRelations}
                        galleryImages={galleryImages}
                        setGalleryImages={setGalleryImages} />
        </Col>
        <Col sm="6">
          <CreateImagesGroup />
        </Col>
        <Col sm="6">
          <PageCard title={'Lista de Categorias'} description={'Confira abaixo a lista de categorias'} >
            <div className="table-responsive">
              <Table className="table mb-0">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Label</th>
                  <th>Qtd. de Produtos</th>
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
                        <Link to={`/categoria/${group._id}`} className="mr-3 text-primary">
                          <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip" />
                          <UncontrolledTooltip placement="top" target="edittooltip">
                            Edit
                          </UncontrolledTooltip>
                        </Link>
                        <Link to="#" className="text-danger" onClick={(e) => {
                          e.preventDefault()
                          console.log('delete category')
                        }
                        }>
                          <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip" />
                          <UncontrolledTooltip placement="top" target="deletetooltip">
                            Delete
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
      </Row>
      </PageContent>
  )
}

export default AddCustomizedImage
