import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { Col, Row } from 'reactstrap'
import { FormHandles } from '@unform/core'
import { useFeedback } from '../../../context/FeedbackProvider'
import { Input, Button, TextAerea, Select } from '../../../components/Form'
import { createProduct, ProductDataRequest } from '../../../../services/api/products'
import { CategoryData, listCategory } from '../../../../services/api/categories'
import { SelectOptionsTypes } from '../../../components/Form/Select'
import InputCurrencyMask from '../../../components/Form/InputCurrencyMask'
import PageContent from '../../../components/Common/PageContent'
import PageCard from '../../../components/Common/PageCard'
import PageDropzone from '../../../components/Common/PageDropzone'
import CircularProgress from '../../../components/Feedbacks/CircularProgress'

type AcceptedFile = {file: File, formattedSize: string, preview: string}

const AddProduct: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(false)
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([])
  const { openToast } = useFeedback()

  const listCategories = useCallback(() => {
    listCategory((data) => {
      setCategories(data)
    })
  }, [])

  useEffect(() => {
    listCategories()
  }, [listCategories])

  const handleSubmit = useCallback((data: ProductDataRequest) => {
    const acceptedFile = acceptedFiles[0]
    if (acceptedFile) {
      setLoading(true)
      createProduct(data, acceptedFile.file, (product, errorMessage) => {
        if (product) {
          setLoading(false)
          openToast('Produto adicionado com sucesso!', 'success')
        }
        if (errorMessage) openToast(errorMessage, 'error')
      })
    }
  }, [acceptedFiles, openToast])

  const selectOptions = useCallback(() : SelectOptionsTypes[] => {
    const optionsList: SelectOptionsTypes[] = []
    for (const cat of categories) {
      optionsList.push({ key: cat.name, value: cat._id })
    }
    return optionsList
  }, [categories])

  const formatBytes = useCallback((bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }, [])

  const handleAcceptedFiles = useCallback((files: File[]) => {
    files.map(file => {
      return setAcceptedFiles(arr => [...arr, { file, preview: URL.createObjectURL(file), formattedSize: formatBytes(file.size) }])
    })
  }, [formatBytes])

  return (
    <PageContent>
      <PageCard title={'Novo Produto'} description={'Insira as informações abaixo para adicionar o produto'}>
        <Form ref={formRef} action="#" onSubmit={handleSubmit}>
          <Row>
            <Col sm="6">
              <Input name={'name'} type="text" id="username" label={'Nome'} className="form-control" />
              <Select name={'category'} labelText={'Escolha uma categoria'} options={selectOptions()} className="form-control select2" />
              <InputCurrencyMask name={'price'} labelText={'Preço'} defaultValue={0} />
              <InputCurrencyMask name={'oldPrice'} labelText={'Preço Antigo'} defaultValue={0} />
            </Col>
            <Col sm="6">
              <TextAerea name={'description'} id="username" labelText={'Descrição'} className="form-control" rows={5} />
            </Col>
          </Row>
          {loading && <CircularProgress />}
          {!loading && <Button type="submit" color="primary" className="mr-1 waves-effect waves-light"> Adicionar Produto </Button>}
        </Form>
      </PageCard>
      <PageCard title={'Fotos'} description={'Fotos dos produtos'}>
        <PageDropzone handleAcceptedFiles={handleAcceptedFiles} acceptedFiles={acceptedFiles} />
      </PageCard>
    </PageContent>
  )
}

export default AddProduct
