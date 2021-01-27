import React, { Dispatch, SetStateAction, useCallback } from 'react'
import PageDropzone from '../../../Common/PageDropzone'
import PageCard from '../../../Common/PageCard'
import { AcceptedFile, getAcceptedFiles } from '../../../../../utils/format-files'

interface ProductPhotosFormSectionProps {
  acceptedFiles: AcceptedFile[]
  setAcceptedFiles: Dispatch<SetStateAction<AcceptedFile[]>>
}

const ProductPhotosFormSection: React.FC<ProductPhotosFormSectionProps> = ({ acceptedFiles, setAcceptedFiles }) => {
  const handleAcceptedFiles = useCallback((files: File[]) => {
    const acceptedFilesArr = getAcceptedFiles(files)
    setAcceptedFiles(arr => [...arr, ...acceptedFilesArr])
  }, [])

  return (<PageCard title={'Fotos'} description={'Fotos dos produtos'}>
    <PageDropzone handleAcceptedFiles={handleAcceptedFiles} acceptedFiles={acceptedFiles} />
  </PageCard>)
}

export default ProductPhotosFormSection
