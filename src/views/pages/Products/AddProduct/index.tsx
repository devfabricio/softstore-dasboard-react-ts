import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row
} from 'reactstrap'
import Dropzone from 'react-dropzone'
import { FormHandles } from '@unform/core'
import { useFeedback } from '../../../context/FeedbackProvider'
import Layout from '../../../Layout'
import { Input, Button, TextAerea, Select } from '../../../components/Form'
import { createProduct, ProductDataRequest } from '../../../../services/api/products'
import { CategoryData, listCategory } from '../../../../services/api/categories'
import { SelectOptionsTypes } from '../../../components/Form/Select'
import InputCurrencyMask from '../../../components/Form/InputCurrencyMask'
import Breadcrumbs from '../../../components/Common/Breadcrumb'
import { Link } from 'react-router-dom'

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
    console.log(loading)
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
    <Layout>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Add Product" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Basic Information</CardTitle>
                  <CardSubtitle className="mb-3">
                    Fill all information below
                  </CardSubtitle>

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

                    <Button
                      type="submit"
                      color="primary"
                      className="mr-1 waves-effect waves-light"
                    >
                      Save Changes
                    </Button>
                    <Button
                      type="submit"
                      color="secondary"
                      className="waves-effect"
                    >
                      Cancel
                    </Button>
                  </Form>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Product Images</CardTitle>
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="dz-message needsclick">
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {acceptedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + '-file'}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.file.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.file.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default AddProduct
