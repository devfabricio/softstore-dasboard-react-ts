import React, { useCallback, useState } from 'react'
import PageCard from '../../../components/Common/PageCard'
import {
  Row,
  Col,
  Label,
  UncontrolledTooltip
} from 'reactstrap'
import * as S from './styles'
import PageContent from '../../../components/Common/PageContent'
import Cropper from 'react-cropper'
import srcPath from '../../../../assets/images/small/img-5.jpg'
import userAvatar from '../../../../assets/images/profile-avatar.png'
import 'cropperjs/dist/cropper.css'
import { useAuth } from '../../../context/AuthContext'
import { s3BaseUrl } from '../../../../services/aws/config'
import CircularProgress from '../../../components/Feedbacks/CircularProgress'
import { Button } from '../../../components/Form'
import { updateProfilePhoto } from '../../../../services/api/administrator'
import { useFeedback } from '../../../context/FeedbackProvider'

const ChangeProfilePhoto: React.FC = () => {
  const [image, setImage] = useState(srcPath)
  const [cropData, setCropData] = useState('#')
  const [cropper, setCropper] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [contentType, setContentType] = useState('')
  const { administrator, updateAdministratorData } = useAuth()
  const { openToast } = useFeedback()

  const handleSubmit = useCallback(() => {
    setLoading(true)
    const file = new File([cropData!!], 'filename', { type: contentType, lastModified: Date.now() })
    updateProfilePhoto(administrator, file, (data, errorMessage) => {
      if (data) {
        openToast('Foto atualizada com sucesso!', 'success')
        updateAdministratorData(administrator)
      }
    })
  }, [administrator, contentType, cropData, openToast, updateAdministratorData])

  const onChange = (e: any) => {
    e.preventDefault()
    let files

    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as any)
    }
    const filename = files[0].name
    const ext = filename.substr(filename.length - 3)

    if (ext === 'peg' || ext === 'jpg') {
      setContentType('image/jpeg')
    } else {
      setContentType('image/png')
    }
    reader.readAsDataURL(files[0])
  }

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setImage(srcPath)
      setCropData(cropper.getCroppedCanvas().toDataURL())
    }
  }

  return (
    <PageContent>
      <PageCard title={'Editar Perfil'} description={'Preencha o formulário abaixo para editar os seus dados de perfil'}>
        <Row>
          <Col xl="12">
            <S.ChangeProfilePhotoWrapper>
              {cropData === '#' && <img src={administrator.profileImg ? `${s3BaseUrl}/${administrator.profileImg}` : userAvatar} height={200} width={200} />}
              {cropData !== '#' && <img src={cropData} height={200} width={200} />}
              <Label
                htmlFor="inputImage"
                title="Upload image file"
              >
                <input
                  type="file"
                  className="sr-only"
                  id="inputImage"
                  name="file"
                  accept="image/*"
                  onChange={onChange}
                />
                <span className="docs-tooltip" id="uploadImage">Selecione uma foto de perfil</span>
                <UncontrolledTooltip
                  placement="top"
                  target="uploadImage"
                >
                  Import image with Blob URLs
                </UncontrolledTooltip>
              </Label>
              {cropData !== '#' && <div>
                {loading && <CircularProgress />}
                {!loading && <Button type="submit" color="primary" className="mr-1 waves-effect waves-light" onClick={() => handleSubmit()}> Salvar Alterações </Button>}
              </div>}
            </S.ChangeProfilePhotoWrapper>
          </Col>
          {image !== srcPath && <Col xl="12">
            <div>
              <div style={{ width: '100%' }}>
                <Cropper
                  style={{ height: 400, width: '100%' }}
                  initialAspectRatio={1}
                  aspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  guides={true}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  onInitialized={(instance) => {
                    setCropper(instance)
                  }}
                />
                <div className={'text-right mt-10'}>
                  <Button type="submit" color="primary" className="mr-1 waves-effect waves-light" onClick={getCropData}> Pronto </Button>
                </div>
              </div>
            </div>
          </Col>}
        </Row>
      </PageCard>
    </PageContent>
  )
}

export default ChangeProfilePhoto
