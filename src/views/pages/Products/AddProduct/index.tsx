import React, { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { Col, Row } from 'reactstrap'
import { FormHandles } from '@unform/core'
import { useFeedback } from '../../../context/FeedbackProvider'
import { Button, Select } from '../../../components/Common/Form'
import { createProduct, CreateProductData, ProductData } from '../../../../services/api/products'
import { useHistory } from 'react-router-dom'
import PageContent from '../../../components/Common/PageContent'
import PageCard from '../../../components/Common/PageCard'
import AddSpecifications from '../../../components/Products/FormSections/AddSpecifications'
import AddCustomizedText from '../../../components/Products/FormSections/AddCustomizedText'
import PriceFormSection from '../../../components/Products/FormSections/PriceFormSection'
import StockFormSection from '../../../components/Products/FormSections/StockFormSection'
import ShippingFormSection from '../../../components/Products/FormSections/ShippingFormSection'
import ProductDetailsFormSection from '../../../components/Products/FormSections/ProductDetailsFormSection'
import CustomizedImageFormSection from '../../../components/Products/FormSections/CustomizedImagesFormSection'
import ProductPhotosFormSection from '../../../components/Products/FormSections/ProductPhotosFormSection'
import { AcceptedFile } from '../../../../utils/format-files'
import { Helmet } from 'react-helmet'

const AddProduct: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([])
  const { openToast, showBackdrop, dismissBackdrop } = useFeedback()
  const history = useHistory()

  const formValidation = useCallback((data: ProductData): boolean => {
    const { name, description, category } = data
    if (name.length === 0) {
      openToast('Você precisa adicionar um nome para o produto', 'error')
      return false
    }
    if (description.length === 0) {
      openToast('Você precisa adicionar uma descrição para o produto', 'error')
      return false
    }
    if (category[0].length === 0) {
      openToast('Você precisa adicionar uma categoria para o produto', 'error')
      return false
    }
    if (acceptedFiles.length === 0) {
      openToast('Você deve adicionar pelo menos uma foto no produto', 'error')
      return false
    }
    return true
  }, [acceptedFiles, openToast])

  const handleSubmit = useCallback((data: CreateProductData) => {
    if (formValidation(data)) {
      showBackdrop()
      createProduct(data, acceptedFiles, (product, errorMessage) => {
        if (product) {
          dismissBackdrop()
          openToast('Produto adicionado com sucesso!', 'success')
          history.push(`/produto/${product._id}`)
        }
        if (errorMessage) openToast(errorMessage, 'error')
      })
    }
  }, [acceptedFiles, dismissBackdrop, formValidation, openToast, showBackdrop])

  return (
    <PageContent pageTitle={'Adicionar Produto'}>
      <Helmet>
        <title>Novo Produto | Painel Administrativo | Sonhadeira</title>
        <meta name="description" content="Painel administrativo da Sonhadeira" />
      </Helmet>
      <Form ref={formRef} action="#" onSubmit={handleSubmit}>
      <Row>
        <Col sm="9">
          <ProductDetailsFormSection formRef={formRef} />
          <StockFormSection />
          <AddSpecifications />
          <AddCustomizedText />
          <CustomizedImageFormSection />
        </Col>
        <Col sm="3">
          <div className={'d-flex flex-column-reverse'}>
            <ProductPhotosFormSection acceptedFiles={acceptedFiles} setAcceptedFiles={setAcceptedFiles} />
            <ShippingFormSection />
            <PriceFormSection />
            <PageCard title={'Publicar'} description={'Publique seu produto ou salve como rascunho'}>
              <Select name={'status'}
                      options={[
                        { key: 'Salvar como Rascunho', value: 'draft' },
                        { key: 'Publicar Produto', value: 'published' }]} className="form-control select2" />
              <Button type="submit" color="primary" style={{ width: '100%' }}
                      className="btn btn-primary mr-1 waves-effect waves-light"> Pronto </Button>
            </PageCard>
          </div>
        </Col>
      </Row>
      </Form>
    </PageContent>
  )
}

export default AddProduct
