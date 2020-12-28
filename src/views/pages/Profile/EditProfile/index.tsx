import React, { useCallback, useRef, useState } from 'react'
import PageContent from '../../../components/Common/PageContent'
import PageCard from '../../../components/Common/PageCard'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { AdministratorData, updateAdministrator } from '../../../../services/api/administrator'
import { Col, Row } from 'reactstrap'
import { Button, Input } from '../../../components/Form'
import CircularProgress from '../../../components/Feedbacks/CircularProgress'
import { useAuth } from '../../../context/AuthContext'
import { useFeedback } from '../../../context/FeedbackProvider'

const EditProfile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { administrator, updateAdministratorData } = useAuth()
  const { openToast } = useFeedback()
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback((formData: AdministratorData) => {
    setLoading(true)
    administrator.name = formData.name
    administrator.email = formData.email
    updateAdministrator(administrator, (data, errorMessage) => {
      if (data) {
        openToast('Dados atualizados com sucesso', 'success')
        updateAdministratorData(administrator)
      }
      setLoading(false)
    })
  }, [administrator, openToast, updateAdministratorData])

  return (
    <PageContent>
      <PageCard title={'Editar Perfil'} description={'Preencha o formulário abaixo para editar os seus dados de perfil'}>
        <Form ref={formRef} action="#" onSubmit={handleSubmit}>
          <Row>
            <Col sm="6">
              <Input name={'name'} type="text" id="name" label={'Nome'} className="form-control" defaultValue={administrator.name} />
            </Col>
            <Col sm="6">
              <Input name={'email'} type="email" id="email" label={'E-mail'} className="form-control" defaultValue={administrator.email}/>
            </Col>
          </Row>
          {loading && <CircularProgress />}
          {!loading && <Button type="submit" color="primary" className="mr-1 waves-effect waves-light"> Salvar Dados </Button>}
        </Form>
      </PageCard>
    </PageContent>
  )
}

export default EditProfile
