import React, { useCallback, useEffect, useRef, useState } from 'react'
import PageCard from '../../../components/Common/PageCard'
import { Form } from '@unform/web'
import { Col, Row } from 'reactstrap'
import { Button, Input } from '../../../components/Form'
import PageContent from '../../../components/Common/PageContent'
import { FormHandles } from '@unform/core'
import { SettingsData, showSettings, updateSettings } from '../../../../services/api/settings'
import { useFeedback } from '../../../context/FeedbackProvider'

const SocialMedia: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [settingsData, setSettingsData] = useState<SettingsData | null>(null)
  const { openToast, showBackdrop, dismissBackdrop } = useFeedback()

  useEffect(() => {
    showSettings((data, errorMessage) => {
      if (data) {
        setSettingsData(data)
      }
    })
  }, [showBackdrop])

  const handleSubmit = useCallback((data: any) => {
    showBackdrop()
    updateSettings({ ...settingsData, ...data }, () => {
      dismissBackdrop()
      openToast('Dados atualizados com sucesso', 'success')
    })
  }, [dismissBackdrop, openToast, settingsData, showBackdrop])

  return (<PageContent>
    <PageCard title={'Editar Redes Sociais'} description={'Insira as informações abaixo para adicionar o produto'}>
      <Form ref={formRef} action="#" onSubmit={handleSubmit}>
        <Row>
          <Col sm="12">
            <Input name={'facebook'} type="text" label={'Facebook'} defaultValue={settingsData?.facebook} className="form-control" />
            <Input name={'instagram'} type="text" label={'Instagram'} defaultValue={settingsData?.instagram} className="form-control" />
            <Input name={'twitter'} type="text" label={'Twitter'} defaultValue={settingsData?.twitter} className="form-control" />
            <Input name={'youtube'} type="text" label={'Youtube'} defaultValue={settingsData?.youtube} className="form-control" />
            <Input name={'linkedin'} type="text" label={'Linkedin'} defaultValue={settingsData?.linkedin} className="form-control" />
            <Input name={'pinterest'} type="text" label={'Pintrest'} defaultValue={settingsData?.pinterest} className="form-control" />
          </Col>
        </Row>
        <Button type="submit" color="primary" className="mr-1 waves-effect waves-light"> Salvar </Button>
      </Form>
    </PageCard>
  </PageContent>)
}

export default SocialMedia
