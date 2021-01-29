import React from 'react'
import { Card, Col, Row, UncontrolledTooltip } from 'reactstrap'
import { Link } from 'react-router-dom'
import { ProductPhotoResponse } from '../../../../services/api/product-photo'

interface ImagePreviewProps {
  imgName: string
  imgUrl: string
  size?: string
  index: number
  productPhoto?: ProductPhotoResponse
  handleDeleteAcceptedFiles: (fileIndex: number) => void
  handleDeletePhoto?: (photo: ProductPhotoResponse) => void
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imgName, imgUrl, size, productPhoto, index, handleDeleteAcceptedFiles, handleDeletePhoto }) => {
  return (<Card
    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
  >
    <div className="p-2">
      <Row className="align-items-center">
        <Col className="col-auto">
          <img
            data-dz-thumbnail=""
            height="80"
            className="avatar-sm rounded bg-light"
            alt={imgName}
            src={imgUrl}
          />
        </Col>
        <Col style={{ paddingRight: 24 }}>
          <Link
            to="#"
            className="text-muted font-weight-bold"
          >
            {imgName}
          </Link>
          {size && <p className="mb-0">
            <strong>{size}</strong>
          </p>}
        </Col>
      </Row>
      <Link style={{ position: 'absolute', top: 0, right: -12 }}
        to="#" className="text-danger" onClick={(e) => {
          e.preventDefault()
          if (productPhoto && handleDeletePhoto) {
            handleDeletePhoto(productPhoto)
          } else {
            handleDeleteAcceptedFiles(index)
          }
        }}>
        <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip" />
        <UncontrolledTooltip placement="top" target="deletetooltip">
          Excluir
        </UncontrolledTooltip>
      </Link>
    </div>
  </Card>)
}

export default ImagePreview
