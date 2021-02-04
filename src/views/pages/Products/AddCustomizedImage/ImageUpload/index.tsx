import React, { useCallback, useState } from 'react'
import { Progress } from 'reactstrap'
import CircularProgress from '../../../../components/Common/Feedbacks/CircularProgress'
import { Button } from '../../../../components/Common/Form'
import { AcceptedFile } from '../../../../../utils/format-files'
import { createCustomizedImage } from '../../../../../services/api/customized-images'
import { useFeedback } from '../../../../context/FeedbackProvider'
import ProductPhotosFormSection from '../../../../components/Products/FormSections/ProductPhotosFormSection'

interface ImageUploadProps {
  listImages: () => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ listImages }) => {
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([])
  const { openToast } = useFeedback()

  const handleSubmit = useCallback(() => {
    setLoading(true)
    createCustomizedImage(acceptedFiles, (sentCount, data, errorMessage) => {
      const totalFiles = acceptedFiles.length
      if (sentCount) {
        const percentage: number = sentCount / totalFiles * 100
        setUploadProgress(percentage)
        if (percentage === 100) {
          listImages()
          setLoading(false)
          setAcceptedFiles([])
          setUploadProgress(0)
          openToast('Imagens enviadas com sucesso', 'success')
        }
      }
    })
  }, [acceptedFiles, listImages, openToast])

  return (<>
    <ProductPhotosFormSection acceptedFiles={acceptedFiles} setAcceptedFiles={setAcceptedFiles} />
    <div className={'mt-3'}>
      {loading &&
      <>
        <Progress
          className="mb-2"
          value={uploadProgress}
          color="primary"
          style={{ height: '10px' }}
        />
        <CircularProgress />
      </>}
      {!loading && <Button type="button"
                           disabled={acceptedFiles.length === 0}
                           onClick={() => acceptedFiles.length > 0 ? handleSubmit() : null}
                           color="primary"
                           className="mr-1 waves-effect waves-light btn btn-primary"> Adicionar Imagens </Button>}
    </div>
  </>)
}

export default ImageUpload
