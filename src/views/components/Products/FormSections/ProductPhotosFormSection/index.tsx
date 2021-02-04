import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import PageDropzone from '../../../Common/PageDropzone'
import PageCard from '../../../Common/PageCard'
import { AcceptedFile, getAcceptedFiles } from '../../../../../utils/format-files'
import { ProductDataResponse } from '../../../../../services/api/products'
import { listProductPhotos, ProductPhotoResponse } from '../../../../../services/api/product-photo'

interface ProductPhotosFormSectionProps {
  acceptedFiles: AcceptedFile[]
  setAcceptedFiles: Dispatch<SetStateAction<AcceptedFile[]>>
  setProductPhotos?: Dispatch<SetStateAction<ProductPhotoResponse[]>>
  productPhotos?: ProductPhotoResponse[]
  handleDeletePhoto?: (photo: ProductPhotoResponse) => void
  product?: ProductDataResponse
}

const ProductPhotosFormSection: React.FC<ProductPhotosFormSectionProps> = ({
  acceptedFiles, setAcceptedFiles, setProductPhotos, productPhotos,
  product, handleDeletePhoto
}) => {
  const listPhotos = useCallback(() => {
    if (product && setProductPhotos) {
      listProductPhotos(product._id, (data, errorMessage) => {
        if (data) {
          setProductPhotos(data.reverse())
        }
      })
    }
  }, [product, setProductPhotos])

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

  return (<PageCard title={'Upload de Imagens'} description={'Clique no quadro abaixo ou arraste as imagens para adicionar imagens nas galerias'}>
    <PageDropzone handleAcceptedFiles={handleAcceptedFiles}
                  acceptedFiles={acceptedFiles}
                  productPhotos={productPhotos}
                  product={product}
                  handleDeletePhoto={handleDeletePhoto}
                  handleDeleteAcceptedFiles={handleDeleteAcceptedFiles}
    />
  </PageCard>)
}

export default ProductPhotosFormSection
