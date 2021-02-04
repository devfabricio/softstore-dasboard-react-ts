import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Col, Row, Table } from 'reactstrap'
import {
  createCategory,
  CreateCategoryData,
  deleteCategory
} from '../../../../services/api/categories'
import { useFeedback } from '../../../context/FeedbackProvider'
import PageContent from '../../../components/Common/PageContent'
import PageCard from '../../../components/Common/PageCard'
import { Button, Input, Select } from '../../../components/Common/Form'
import CircularProgress from '../../../components/Common/Feedbacks/CircularProgress'
import { Form } from '@unform/web'
import { CategoryRelationshipResponse, listCategoryRelationship } from '../../../../services/api/category-relationship'
import { SelectOptionsTypes } from '../../../components/Common/Form/Select'
import CategoryTableRow from './CategoryTableRow'
import { Helmet } from 'react-helmet'

const AddCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [categoriesRelationship, setCategoriesRelationship] = useState<CategoryRelationshipResponse[]>([])
  const [loading, setLoading] = useState(false)
  const { openToast } = useFeedback()

  const listCategories = useCallback(() => {
    listCategoryRelationship((data) => {
      setCategoriesRelationship(data)
    })
  }, [])

  useEffect(() => {
    listCategories()
  }, [listCategories])

  const handleDeleteCategory = useCallback((categoryId: string) => {
    deleteCategory(categoryId, () => listCategories())
  }, [listCategories])

  const selectOptions = useCallback(() : SelectOptionsTypes[] => {
    const optionsList: SelectOptionsTypes[] = []
    optionsList.push({ key: 'Nenhum', value: 'none' })
    for (const cat of categoriesRelationship) {
      optionsList.push({ key: cat.category.name, value: cat.category._id })
    }
    return optionsList
  }, [categoriesRelationship])

  const handleSubmit = useCallback((data: CreateCategoryData) => {
    setLoading(true)
    const categoryData: CreateCategoryData = { name: data.name }
    if (data.parent !== 'none') categoryData.parent = data.parent
    createCategory(categoryData, (data, errorMessage) => {
      if (data) {
        listCategories()
        formRef.current?.clearField('name')
        openToast('Categoria criada com sucesso', 'success')
      }
      if (errorMessage) openToast(errorMessage, 'error')

      setLoading(false)
    })
  }, [listCategories, openToast])

  return (
    <PageContent pageTitle={'Categorias'}>
      <Helmet>
        <title>Categorias | Painel Administrativo | Sonhadeira</title>
        <meta name="description" content="Painel administrativo da Sonhadeira" />
      </Helmet>
      <Row>
        <Col sm="6">
          <PageCard title={'Adicionar categoria'} description={'Preencha o campo abaixo para adicionar uma nova categoria'} >
            <Form ref={formRef} action="#" onSubmit={handleSubmit}>
              <Row>
                <Col sm="12">
                  <Input name={'name'} type="text" id="username" label={'Nome'} />
                  <Select name={'parent'} labelText={'Categoria ascendente'} options={selectOptions()} className="form-control select2" />
                </Col>
              </Row>
              {loading && <CircularProgress />}
              {!loading && <Button type="submit" color="primary" className="btn btn-primary mr-1 waves-effect waves-light"> Adicionar Categoria </Button>}
            </Form>
          </PageCard>
        </Col>
        <Col sm="6">
          <PageCard title={'Lista de Categorias'} description={'Confira abaixo a lista de categorias'} >
            <div className="table-responsive">
              <Table className="table mb-0">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Slug</th>
                  <th>Produtos</th>
                  <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {categoriesRelationship.map((categoryRelationship, index) => {
                  const category = categoryRelationship.category
                  return (
                      <>
                        <CategoryTableRow categoryRelationship={categoryRelationship}
                                          category={category}
                                          handleDeleteCategory={handleDeleteCategory}
                                          index={index} />
                      </>)
                })}
                </tbody>
              </Table>
            </div>
          </PageCard>
        </Col>
      </Row>
    </PageContent>
  )
}

export default AddCategory
