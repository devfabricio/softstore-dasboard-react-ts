import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { Col, Row } from 'reactstrap'
import { FormHandles } from '@unform/core'
import { useFeedback } from '../../../context/FeedbackProvider'
import { Button, Select } from '../../../components/Common/Form'
import { createProduct, ProductData, ProductDataResponse, showProduct } from '../../../../services/api/products'
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

type AcceptedFile = {file: File, formattedSize: string, preview: string}

const EditProduct: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [product, setProduct] = useState<ProductDataResponse>()
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([])
  const { openToast, showBackdrop, dismissBackdrop } = useFeedback()

  const history = useHistory()

  const getProduct = useCallback(() => {
    const arrPathNames = history.location.pathname.split('/')
    const productId = arrPathNames[arrPathNames.length - 1]
    showProduct(productId, (data, errorMessage) => {
      if (data) {
        setProduct(data)
        console.log(data)
      }
    })
  }, [history])

  useEffect(() => {
    getProduct()
  }, [getProduct])

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
      openToast('Você precisa adicionar uma descrição para o produto', 'error')
      return false
    }
    return true
  }, [openToast])

  const handleSubmit = useCallback((data: ProductData) => {
    const acceptedFile = acceptedFiles[0]
    if (formValidation(data)) {
      if (acceptedFile) {
        showBackdrop()
        createProduct(data, acceptedFile.file, (product, errorMessage) => {
          if (product) {
            dismissBackdrop()
            openToast('Produto adicionado com sucesso!', 'success')
          }
          if (errorMessage) openToast(errorMessage, 'error')
        })
      }
    }
  }, [acceptedFiles, dismissBackdrop, formValidation, openToast, showBackdrop])

  return (
    <PageContent>
      <Form ref={formRef} action="#" onSubmit={handleSubmit}>
        {product && <Row>
          <Col sm="9">
            <ProductDetailsFormSection formRef={formRef} product={product}/>
            <ProductPhotosFormSection acceptedFiles={acceptedFiles} setAcceptedFiles={setAcceptedFiles} />
            <StockFormSection product={product} />
            <AddSpecifications product={product} />
            <AddCustomizedText />
            <CustomizedImageFormSection />
          </Col>
          <Col sm="3">
            <div className={'d-flex flex-column-reverse'}>
              <ShippingFormSection product={product} />
              <PriceFormSection product={product} />
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
        </Row>}
      </Form>
    </PageContent>
  )
}

export default EditProduct
