import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Col, Row, Table, UncontrolledTooltip } from 'reactstrap'
import {
  createCategory,
  CreateCategoryData,
  deleteCategory
} from '../../../../services/api/categories'
import { Link } from 'react-router-dom'
import { ConfirmAlertDialogProps, confirmAlertDialogDefault } from '../../../components/Common/Feedbacks/AlertDialog'
import { useFeedback } from '../../../context/FeedbackProvider'
import PageContent from '../../../components/Common/PageContent'
import PageCard from '../../../components/Common/PageCard'
import { Button, Input, Select } from '../../../components/Common/Form'
import CircularProgress from '../../../components/Common/Feedbacks/CircularProgress'
import { Form } from '@unform/web'
import { CategoryRelationshipResponse, listCategoryRelationship } from '../../../../services/api/category-relationship'
import { SelectOptionsTypes } from '../../../components/Common/Form/Select'

const AddPostCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [categories, setCategories] = useState<CategoryRelationshipResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [confirmAlertDialogData, setConfirmAlertDialogData] = useState<ConfirmAlertDialogProps>(confirmAlertDialogDefault)
  const { openToast } = useFeedback()

  const listCategories = useCallback(() => {
    listCategoryRelationship((data) => {
      setCategories(data)
      setConfirmAlertDialogData(confirmAlertDialogDefault)
    })
  }, [])

  useEffect(() => {
    listCategories()
  }, [listCategories])

  const selectOptions = useCallback(() : SelectOptionsTypes[] => {
    const optionsList: SelectOptionsTypes[] = []
    optionsList.push({ key: 'Nenhuma', value: 'none' })
    for (const cat of categories) {
      optionsList.push({ key: cat.category.name, value: cat.category._id })
    }
    return optionsList
  }, [categories])

  const handleDeleteCategory = useCallback((categoryId: string) => {
    setConfirmAlertDialogData({
      ...confirmAlertDialogDefault,
      titleText: 'Tem certeza que deseja excluir esta categoria?',
      contentText: 'Atenção! Esta ação é irreversível',
      open: true,
      positiveAction: () => deleteCategory(categoryId, () => listCategories()),
      negativeAction: () => setConfirmAlertDialogData(confirmAlertDialogDefault)
    })
  }, [listCategories])

  const handleSubmit = useCallback((data: CreateCategoryData) => {
    setLoading(true)
    const categoryData: CreateCategoryData = { name: data.name }
    if (data.parent !== 'none') {
      categoryData.parent = data.parent
    }
    createCategory(data, (data, errorMessage) => {
      if (data) {
        listCategories()
        formRef.current?.clearField('name')
        openToast('Categoria criada com sucesso', 'success')
      }
      if (errorMessage) openToast(errorMessage, 'error')

      setLoading(false)
    })
  }, [openToast, listCategories])

  console.log(confirmAlertDialogData)

  return (
    <PageContent pageTitle={'Categorias'}>
      <Row>
        <Col sm="6">
          <PageCard title={'Adicionar categoria'} description={'Preencha o campo abaixo para adicionar uma nova categoria'} >
            <Form ref={formRef} action="#" onSubmit={handleSubmit}>
              <Row>
                <Col sm="12">
                  <Input name={'name'} type="text" id="username" label={'Nome'} />
                  <Select name={'parent'} labelText={'Categoria Ascendente'} options={selectOptions()} className="form-control select2" />
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
                {categories.map((categoryRelationship, index) => {
                  const hasProducts = categoryRelationship.count > 0
                  const category = categoryRelationship.category
                  return (
                    <tr key={categoryRelationship._id}>
                      <td>{index + 1}</td>
                      <td><Link to={''}>{category.name}</Link></td>
                      <td>{category.slug}</td>
                      <td>{category.productCounter}</td>
                      <td>
                        <Link to={`/categoria/${category._id}`} className="mr-3 text-primary">
                          <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip" />
                          <UncontrolledTooltip placement="top" target="edittooltip">
                            Edit
                          </UncontrolledTooltip>
                        </Link>
                        <Link to="#" className="text-danger">
                          <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip" />
                          <UncontrolledTooltip placement="top" target="deletetooltip" style={hasProducts ? { opacity: 0.3, cursor: 'unset' } : {}}
                                               onClick={() => category.productCounter === 0 ? handleDeleteCategory(category._id) : null}>
                            Delete
                          </UncontrolledTooltip>
                        </Link>
                      </td>
                    </tr>
                  )
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

export default AddPostCategory
