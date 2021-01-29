import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { Col, Row } from 'reactstrap'
import { FormHandles } from '@unform/core'
import { useFeedback } from '../../../context/FeedbackProvider'
import { Button, Select } from '../../../components/Common/Form'
import {
  CreateProductData,
  PhotoResponse,
  ProductData,
  ProductDataResponse,
  showProduct, updateProduct
} from '../../../../services/api/products'
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
import { ProductPhotoResponse } from '../../../../services/api/product-photo'

const EditProduct: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [product, setProduct] = useState<ProductDataResponse>()
  const [productPhotos, setProductPhotos] = useState<ProductPhotoResponse[]>([])
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([])
  const [deletedPhotos, setDeletedPhotos] = useState<PhotoResponse[]>([])
  const { openToast, showBackdrop, dismissBackdrop } = useFeedback()

  const history = useHistory()

  const getProduct = useCallback(() => {
    const arrPathNames = history.location.pathname.split('/')
    const productId = arrPathNames[arrPathNames.length - 1]
    showProduct(productId, (data, errorMessage) => {
      if (data) {
        setProduct(data)
      }
    })
  }, [history])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  const formValidation = useCallback((data: ProductData): boolean => {
    const { name, description, category } = data
    if (name.length === 0) {
      openToast('Você deve adicionar um nome para o produto', 'error')
      return false
    }
    if (description.length === 0) {
      openToast('Você deve adicionar uma descrição para o produto', 'error')
      return false
    }
    if (category[0].length === 0) {
      openToast('Você deve adicionar uma descrição para o produto', 'error')
      return false
    }

    if (acceptedFiles.length === 0 && productPhotos.length === 0) {
      openToast('Você deve adicionar pelo menos uma foto no produto', 'error')
      return false
    }

    return true
  }, [acceptedFiles.length, openToast, productPhotos.length])

  const handleSubmit = useCallback((data: CreateProductData) => {
    if (formValidation(data) && product) {
      showBackdrop()
      updateProduct(data, product, productPhotos, deletedPhotos, acceptedFiles, (product, errorMessage) => {
        if (product) {
          dismissBackdrop()
          openToast('Produto adicionado com sucesso!', 'success')
        }
        if (errorMessage) openToast(errorMessage, 'error')
      })
    }
  }, [acceptedFiles, deletedPhotos, dismissBackdrop, formValidation, openToast, product, showBackdrop])

  const handleDeletePhoto = useCallback(({ _id, path, thumbPath }: ProductPhotoResponse) => {
    setDeletedPhotos(arr => [...arr, { _id, path, thumbPath }])
    setProductPhotos(arr => arr.filter(it => it._id !== _id))
  }, [])

  return (
    <PageContent>
      <Form ref={formRef} action="#" onSubmit={handleSubmit}>
        {product && <Row>
          <Col sm="9">
            <ProductDetailsFormSection formRef={formRef} product={product}/>
            <StockFormSection product={product} />
            <AddSpecifications product={product} />
            <AddCustomizedText product={product} />
            <CustomizedImageFormSection product={product} />
          </Col>
          <Col sm="3">
            <div className={'d-flex flex-column-reverse'}>
              <ProductPhotosFormSection acceptedFiles={acceptedFiles}
                                        productPhotos={productPhotos}
                                        setProductPhotos={setProductPhotos}
                                        handleDeletePhoto={handleDeletePhoto}
                                        setAcceptedFiles={setAcceptedFiles}
                                        product={product}
              />
              <ShippingFormSection product={product} />
              <PriceFormSection product={product} />
              <PageCard title={'Publicar'} description={'Publique seu produto ou salve como rascunho'}>
                <Select name={'status'}
                        options={[
                          { key: 'Salvar como Rascunho', value: 'draft' },
                          { key: 'Publicar Produto', value: 'published' }
                        ]} className="form-control select2" />
                <Button type="submit" color="primary" style={{ width: '100%' }}
                        className="btn btn-primary mr-1 waves-effect waves-light"> Salvar </Button>
              </PageCard>
            </div>
          </Col>
        </Row>}
      </Form>
    </PageContent>
  )
}

export default EditProduct
