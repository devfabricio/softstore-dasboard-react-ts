import React, { useCallback, useEffect, useRef, useState } from 'react'
import PageCard from '../../../components/Common/PageCard'
import { Form } from '@unform/web'
import { Col, Row } from 'reactstrap'
import { Button, Input, TextAerea } from '../../../components/Common/Form'
import PageContent from '../../../components/Common/PageContent'
import { FormHandles } from '@unform/core'
import { SettingsData, showSettings, updateSettings } from '../../../../services/api/settings'
import { useFeedback } from '../../../context/FeedbackProvider'
import { Helmet } from 'react-helmet'

const GeneralSettings: React.FC = () => {
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
  }, [dismissBackdrop, openToast, settingsData])

  return (<PageContent pageTitle={'Configurações Gerais'}>
    <Helmet>
      <title>Configurações Gerais| Painel Administrativo | Sonhadeira</title>
      <meta name="description" content="Painel administrativo da Sonhadeira" />
    </Helmet>
    <PageCard title={'Configurações Gerais'} description={'Insira as informações abaixo para atualizar as informações'}>
      <Form ref={formRef} action="#" onSubmit={handleSubmit}>
        {settingsData && <Row>
          <Col sm="12">
            <Input name={'siteTitle'} type="text" id="username" defaultValue={settingsData.siteTitle} label={'Título do site'} className="form-control" />
            <TextAerea name={'siteDescription'} labelText={'Descrição do site'} defaultValue={settingsData.siteDescription} className={'form-control'} />
          </Col>
          <Col sm="6">
            <Input name={'email'} type="email" label={'E-mail'} defaultValue={settingsData.email} className="form-control" />
          </Col>
          <Col sm="6">
            <Input name={'phone'} type="tel" label={'Telefone / Whatsapp'} defaultValue={settingsData.phone} className="form-control" />
          </Col>
          <Col sm="12">
            <Input name={'address'} type="text" label={'Endereço'} defaultValue={settingsData.address} className="form-control" />
            <Input name={'openingHours'} type="text" label={'Horário de Atendimento'} defaultValue={settingsData.openingHours} className="form-control" />
          </Col>
        </Row>}
        <Button type="submit" color="primary" className="btn btn-primary mr-1 waves-effect waves-light"> Salvar </Button>
      </Form>
    </PageCard>
  </PageContent>)
}

export default GeneralSettings
