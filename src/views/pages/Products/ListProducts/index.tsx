import React, { useCallback, useEffect, useState } from 'react'
import {
  Col,
  Row, Table, UncontrolledTooltip
} from 'reactstrap'
import { deleteProduct, listProducts as list, ProductDataResponse } from '../../../../services/api/products'
import PageCard from '../../../components/Common/PageCard'
import { Link } from 'react-router-dom'
import PageContent from '../../../components/Common/PageContent'
import { s3BaseUrl } from '../../../../services/aws/config'
import { formatPrice } from '../../../../utils/format-price'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useFeedback } from '../../../context/FeedbackProvider'

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductDataResponse[]>([])
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<ProductDataResponse | null>()
  const { openToast, showBackdrop, dismissBackdrop } = useFeedback()

  const removeProduct = useCallback(() => {
    setShowConfirmDelete(false)
    if (currentProduct) {
      showBackdrop()
      deleteProduct(currentProduct, () => {
        setProducts(products => products.filter(product => product._id !== currentProduct._id))
        dismissBackdrop()
        setCurrentProduct(null)
        openToast('Produto excluído com sucesso', 'success')
      })
    }
  }, [currentProduct, dismissBackdrop, openToast, showBackdrop])

  const listProducts = useCallback(() => {
    list((data) => {
      if (data) {
        console.log(data)
        setProducts(data)
      }
    })
  }, [])

  useEffect(() => {
    listProducts()
  }, [listProducts])

  return (
    <PageContent>
      <Row>
        <Col sm="12">
          <PageCard title={'Lista de Categorias'} description={'Confira abaixo a lista de categorias'} >
            <div className="table-responsive">
              <Table className="table mb-0">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img width={60} src={`${s3BaseUrl}/${product.thumbImg}`} className={'mr-2'} />
                        <Link to={''}>{product.name}</Link>
                      </td>
                      <td>R$ {formatPrice(product.price)}</td>
                      <td></td>
                      <td>
                        <Link to={`/produto/${product._id}`} className="mr-3 text-primary">
                          <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip" />
                          <UncontrolledTooltip placement="top" target="edittooltip">
                            Editar
                          </UncontrolledTooltip>
                        </Link>
                        <Link to="#" className="text-danger" onClick={(e) => {
                          e.preventDefault()
                          setCurrentProduct(product)
                          setShowConfirmDelete(true)
                        }}>
                          <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip" />
                          <UncontrolledTooltip placement="top" target="deletetooltip">
                            Excluir
                          </UncontrolledTooltip>
                        </Link>
                        {showConfirmDelete && <SweetAlert
                          title="Tem certeza que deseja excluir este produto?"
                          warning
                          showCancel
                          confirmBtnBsStyle="success"
                          cancelBtnBsStyle="danger"
                          onConfirm={() => {
                            removeProduct()
                          }}
                          onCancel={() => {
                            setCurrentProduct(null)
                            setShowConfirmDelete(false)
                          }}
                        >
                          Esta ação não poderá ser revertida!
                        </SweetAlert>}
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

export default ListProducts
