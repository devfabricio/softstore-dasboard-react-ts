import React, { useCallback, useEffect, useRef, useState } from 'react'
import PageCard from '../../../components/Common/PageCard'
import { Form } from '@unform/web'
import { Col, Row } from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg'
import { Button } from '../../../components/Common/Form'
import PageContent from '../../../components/Common/PageContent'
import { FormHandles } from '@unform/core'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { SettingsData, showSettings, updateSettings } from '../../../../services/api/settings'
import { useFeedback } from '../../../context/FeedbackProvider'
import { Helmet } from 'react-helmet'

const AboutCompany: React.FC = () => {
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

  return (<PageContent pageTitle={'Sobre a empresa'}>
    <Helmet>
      <title>Sobre a Empresa | Painel Administrativo | Sonhadeira</title>
      <meta name="description" content="Painel administrativo da Sonhadeira" />
    </Helmet>
    <PageCard title={'Sobre a empresa'} description={'Insira as informações abaixo para adicionar o produto'}>
      <Form ref={formRef} action="#" onSubmit={handleSubmit}>
        <Row>
          <Col sm={'12'}>
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
            />
          </Col>
        </Row>
        <Button type="submit" color="primary" className="btn btn-primary mr-1 waves-effect waves-light"> Salvar </Button>
      </Form>
    </PageCard>
  </PageContent>)
}

export default AboutCompany
