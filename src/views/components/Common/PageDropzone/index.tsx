import React from 'react'
import Dropzone from 'react-dropzone'
import { ProductPhotoResponse } from '../../../../services/api/product-photo'
import ImagePreview from './image-preview'
import { AcceptedFile } from '../../../../utils/format-files'
import { s3BaseUrl } from '../../../../services/aws/config'
import { ProductDataResponse } from '../../../../services/api/products'

interface PageDropzoneProps {
  handleAcceptedFiles: (files: File[]) => void
  handleDeleteAcceptedFiles: (fileIndex: number) => void
  handleDeletePhoto?: (photo: ProductPhotoResponse) => void
  acceptedFiles: AcceptedFile[]
  productPhotos?: ProductPhotoResponse[]
  product?: ProductDataResponse
}

const PageDropzone: React.FC<PageDropzoneProps> = ({
  handleAcceptedFiles, handleDeleteAcceptedFiles,
  acceptedFiles, product, productPhotos = [],
  handleDeletePhoto
}) => {
  return (<>
    <Dropzone
      onDrop={acceptedFiles => {
        handleAcceptedFiles(acceptedFiles)
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="dropzone" style={{ cursor: 'pointer' }}>
          <div
            className="dz-message needsclick"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="dz-message needsclick">
              <div className="mb-3">
                <i className="display-4 text-muted bx bxs-cloud-upload" />
              </div>
              <h4 style={{ fontSize: '0.9rem' }}>Clique aqui ou arraste as imagens para cá.</h4>
            </div>
          </div>
        </div>
      )}
    </Dropzone>
    <div className="dropzone-previews mt-3" id="file-previews">
      {productPhotos.map((photo, i) => {
        return (
          <ImagePreview key={photo._id}
                        imgName={photo.thumbPath === product?.thumbImg ? 'Capa Principal' : `Foto ${i}`}
                        handleDeletePhoto={handleDeletePhoto}
                        productPhoto={photo}
                        imgUrl={`${s3BaseUrl}/${photo.thumbPath}`}
                        index={i}
                        handleDeleteAcceptedFiles={handleDeleteAcceptedFiles} />
        )
      })}
      {acceptedFiles.map((f, i) => {
        return (
          <ImagePreview key={f.id}
                        imgName={f.file.name}
                        imgUrl={f.preview}
                        size={f.formattedSize}
                        index={f.id}
                        handleDeleteAcceptedFiles={handleDeleteAcceptedFiles} />
        )
      })}
    </div>
  </>)
}

export default PageDropzone
