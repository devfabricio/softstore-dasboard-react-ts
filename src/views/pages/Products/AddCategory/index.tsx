import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Col, Row, Table, UncontrolledTooltip } from 'reactstrap'
import {
  listCategory,
  createCategory,
  CategoryData,
  CreateCategoryData,
  deleteCategory
} from '../../../../services/api/categories'
import { Link } from 'react-router-dom'
import { ConfirmAlertDialogProps, confirmAlertDialogDefault } from '../../../components/Feedbacks/AlertDialog'
import { useFeedback } from '../../../context/FeedbackProvider'
import PageContent from '../../../components/Common/PageContent'

const AddCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loadingButton, setLoadingButton] = useState(false)
  const [confirmAlertDialogData, setConfirmAlertDialogData] = useState<ConfirmAlertDialogProps>(confirmAlertDialogDefault)
  const { openToast } = useFeedback()

  const listCategories = useCallback(() => {
    listCategory((data) => {
      setCategories(data)
      setConfirmAlertDialogData(confirmAlertDialogDefault)
    })
  }, [])

  useEffect(() => {
    listCategories()
  }, [listCategories])

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

  const handleSubmit = useCallback(({ name }: CreateCategoryData) => {
    setLoadingButton(true)
    createCategory({ name }, (data, errorMessage) => {
      if (data) {
        categories.push(data)
        setCategories(categories)
        formRef.current?.clearField('name')
        openToast('Categoria criada com sucesso', 'success')
      }
      if (errorMessage) openToast(errorMessage, 'error')

      setLoadingButton(false)
    })
  }, [openToast, categories])

  console.log(loadingButton, confirmAlertDialogData, handleSubmit)

  return (
    <PageContent>
      <Row>
        <Col sm="6">
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
              {categories.map((category, index) => {
                const hasProducts = category.productCounter > 0
                return (
                  <tr key={category._id}>
                    <td>{index}</td>
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
        </Col>
      </Row>
    </PageContent>
  )
}

export default AddCategory
