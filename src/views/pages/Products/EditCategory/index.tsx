import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Col, Row } from 'reactstrap'
import { CreateCategoryData, updateCategory } from '../../../../services/api/categories'
import { useFeedback } from '../../../context/FeedbackProvider'
import PageContent from '../../../components/Common/PageContent'
import PageCard from '../../../components/Common/PageCard'
import { Button, Input, Select } from '../../../components/Common/Form'
import CircularProgress from '../../../components/Common/Feedbacks/CircularProgress'
import { Form } from '@unform/web'
import { CategoryRelationshipResponse, listCategoryRelationship } from '../../../../services/api/category-relationship'
import { SelectOptionsTypes } from '../../../components/Common/Form/Select'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const EditCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [categoryRelationship, setCategoryRelationship] = useState<CategoryRelationshipResponse>()
  const [categoriesRelationship, setCategoriesRelationship] = useState<CategoryRelationshipResponse[]>([])
  const [loading, setLoading] = useState(false)
  const { openToast } = useFeedback()
  const history = useHistory()

  const listCategories = useCallback(() => {
    const arrPathNames = history.location.pathname.split('/')
    const categoryId = arrPathNames[arrPathNames.length - 1]

    listCategoryRelationship((data) => {
      setCategoriesRelationship(data)
      console.log(data)
      const cat = data.find(it => it.category._id === categoryId)
      if (cat) {
        setCategoryRelationship(cat)
      }
    })
  }, [history.location.pathname])

  useEffect(() => {
    listCategories()
  }, [listCategories])

  const selectOptions = useCallback(() : SelectOptionsTypes[] => {
    const optionsList: SelectOptionsTypes[] = []
    optionsList.push({ key: 'Nenhum', value: 'none' })
    const cats = categoriesRelationship.filter(it => it.category._id !== categoryRelationship?.category._id)
    for (const cat of cats) {
      optionsList.push({
        key: cat.category.name,
        value: cat.category._id,
        selected: cat.category._id === categoryRelationship?.parent?._id
      })
    }
    return optionsList
  }, [categoriesRelationship, categoryRelationship])

  const handleSubmit = useCallback((data: CreateCategoryData) => {
    if (categoryRelationship) {
      setLoading(true)
      const categoryData: CreateCategoryData = { name: data.name }
      if (data.parent !== 'none') categoryData.parent = data.parent
      updateCategory(categoryData, categoryRelationship.category._id, (data, errorMessage) => {
        if (data) {
          openToast('Categoria criada com sucesso', 'success')
        }
        if (errorMessage) openToast(errorMessage, 'error')

        setLoading(false)
      })
    }
  }, [categoryRelationship, openToast])

  return (
    <PageContent pageTitle={'Editar Categoria'}>
      <Helmet>
        <title>Editar Categoria | Painel Administrativo | Sonhadeira</title>
        <meta name="description" content="Painel administrativo da Sonhadeira" />
      </Helmet>
      <Row>
        <Col sm="6">
          <PageCard title={'Editar categoria'} description={'Utilize os campos abaixo para editar o nome a hierarquia da categoria'} >
            <Form ref={formRef} action="#" onSubmit={handleSubmit}>
              <Row>
                {categoryRelationship && <Col sm="12">
                  <Input name={'name'} type="text" id="username" label={'Nome'} defaultValue={categoryRelationship?.category.name} />
                  <Select name={'parent'} labelText={'Categoria ascendente'} options={selectOptions()} className="form-control select2" />
                </Col>}
              </Row>
              {loading && <CircularProgress />}
              {!loading && <Button type="submit" color="primary" className="btn btn-primary mr-1 waves-effect waves-light"> Salvar </Button>}
            </Form>
          </PageCard>
        </Col>
      </Row>
    </PageContent>
  )
}

export default EditCategory
