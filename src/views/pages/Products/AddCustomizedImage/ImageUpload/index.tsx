import React, { useCallback, useState } from 'react'
import PageDropzone from '../../../../components/Common/PageDropzone'
import { Progress } from 'reactstrap'
import CircularProgress from '../../../../components/Common/Feedbacks/CircularProgress'
import { Button } from '../../../../components/Common/Form'
import PageCard from '../../../../components/Common/PageCard'
import { AcceptedFile, getAcceptedFiles } from '../../../../../utils/format-files'
import { createCustomizedImage } from '../../../../../services/api/customized-images'
import { useFeedback } from '../../../../context/FeedbackProvider'

interface ImageUploadProps {
  listImages: () => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ listImages }) => {
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([])
  const { openToast } = useFeedback()

  const handleAcceptedFiles = useCallback(async (files: File[]) => {
    const acceptedFilesArr = getAcceptedFiles(files)
    setAcceptedFiles(arr => [...arr, ...acceptedFilesArr])
  }, [])

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

  return (<PageCard title={'Fotos'} description={'Fotos dos produtos'}>
    <PageDropzone handleAcceptedFiles={handleAcceptedFiles} acceptedFiles={acceptedFiles} />
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
                           className="mr-1 waves-effect waves-light btn btn-primary"> Adicionar Categoria </Button>}
    </div>
  </PageCard>)
}

export default ImageUpload
