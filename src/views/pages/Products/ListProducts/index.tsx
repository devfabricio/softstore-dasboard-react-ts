import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../../Layout'
import {
  Col,
  Container,
  Form,
  Input,
  Row
} from 'reactstrap'
import { listProducts, ProductDataResponse } from '../../../../services/api/products'
import Breadcrumbs from '../../../components/Common/Breadcrumb'
import ProductItem from './ProductItem'

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductDataResponse[]>([])

  const listCategories = useCallback(() => {
    listProducts((data) => {
      if (data) {
        console.log(data)
        setProducts(data)
      }
    })
  }, [])

  useEffect(() => {
    listCategories()
  }, [listCategories])

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Produtos" breadcrumbItem="Lista de Produtos" />
          <Row>
            <Col lg="12">
              <Row className="mb-3">
                <Col xl="4" sm="6">
                  <div className="mt-2">
                    <h5>Produtos</h5>
                  </div>
                </Col>
                <Col lg="8" sm="6">
                  <Form className="mt-4 mt-sm-0 float-sm-right form-inline">
                    <div className="search-box mr-2">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control border-0"
                          placeholder="Buscar produto..."
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                  </Form>
                </Col>
              </Row>
              <Row>
                {products.length > 0 &&
                products.map((product, key) => (
                  <ProductItem product={product} key={product._id} />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default ListProducts
