import React, { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { Col, Row } from 'reactstrap'
import { Button, Input } from '../../../../components/Common/Form'
import PageCard from '../../../../components/Common/PageCard'
import { FormHandles } from '@unform/core'
import { createCustomizedImageGroup } from '../../../../../services/api/customized-image-group'
import { useFeedback } from '../../../../context/FeedbackProvider'

const CreateImagesGroup: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { openToast, showBackdrop, dismissBackdrop } = useFeedback()
  const handleSubmit = useCallback((data) => {
    showBackdrop()
    createCustomizedImageGroup(data, (data) => {
      dismissBackdrop()
      formRef.current?.reset()
      openToast('Grupo criado com sucesso!', 'success')
    })
  }, [dismissBackdrop, openToast, showBackdrop])

  return (<PageCard title={'Criar Grupo de Imagens'} description={'Preencha o campo abaixo para adicionar um novo grupo'} >
    <Form ref={formRef} action="#" onSubmit={handleSubmit}>
      <Row>
        <Col sm="12">
          <Input name={'name'} type="text" id="username" label={'Nome'} />
          <Input name={'label'} type="text" id="username" label={'Texto a ser exibido para o cliente'} placeholder={'Ex: Selecione uma estampa para a sua roupa'} />
        </Col>
      </Row>
      <Button type="submit" color="primary" className="btn btn-primary mr-1 waves-effect waves-light"> Adicionar Grupo </Button>
    </Form>
  </PageCard>)
}

export default CreateImagesGroup
