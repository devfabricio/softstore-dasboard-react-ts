import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import PageDropzone from '../../../Common/PageDropzone'
import PageCard from '../../../Common/PageCard'
import { AcceptedFile, getAcceptedFiles } from '../../../../../utils/format-files'
import { ProductDataResponse } from '../../../../../services/api/products'
import { listProductPhotos, ProductPhotoResponse } from '../../../../../services/api/product-photo'

interface ProductPhotosFormSectionProps {
  acceptedFiles: AcceptedFile[]
  setAcceptedFiles: Dispatch<SetStateAction<AcceptedFile[]>>
  product?: ProductDataResponse
}

const ProductPhotosFormSection: React.FC<ProductPhotosFormSectionProps> = ({ acceptedFiles, setAcceptedFiles, product }) => {
  const [photos, setPhotos] = useState<ProductPhotoResponse[]>()

  const listPhotos = useCallback(() => {
    if (product) {
      listProductPhotos(product._id, (data, errorMessage) => {
        if (data) {
          setPhotos(data.reverse())
        }
      })
    }
  }, [product])

  useEffect(() => {
    listPhotos()
  }, [listPhotos])

  const handleAcceptedFiles = useCallback((files: File[]) => {
    const acceptedFilesArr = getAcceptedFiles(files)
    setAcceptedFiles(arr => [...arr, ...acceptedFilesArr])
  }, [setAcceptedFiles])

  const handleDeleteAcceptedFiles = useCallback((id: number) => {
    setAcceptedFiles(arr => arr.filter(it => it.id !== id))
  }, [setAcceptedFiles])

  return (<PageCard title={'Fotos'} description={'Fotos dos produtos'}>
    <PageDropzone handleAcceptedFiles={handleAcceptedFiles}
                  acceptedFiles={acceptedFiles}
                  productPhotos={photos}
                  product={product}
                  handleDeleteAcceptedFiles={handleDeleteAcceptedFiles}
    />
  </PageCard>)
}

export default ProductPhotosFormSection
