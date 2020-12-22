import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../../Layout'
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row
} from 'reactstrap'
import classnames from 'classnames'
import { Link, useHistory } from 'react-router-dom'
import { listProducts, ProductDataResponse } from '../../../../services/api/products'
import { s3BaseUrl } from '../../../../services/aws/config'
import Breadcrumbs from '../../../components/Common/Breadcrumb'

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductDataResponse[]>([])
  const [activeTab, setActiveTab] = useState('1')
  const history = useHistory()

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

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Product" />
          <Row>
            <Col lg="12">
              <Row className="mb-3">
                <Col xl="4" sm="6">
                  <div className="mt-2">
                    <h5>Clothes</h5>
                  </div>
                </Col>
                <Col lg="8" sm="6">
                  <Form className="mt-4 mt-sm-0 float-sm-right form-inline">
                    <div className="search-box mr-2">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control border-0"
                          placeholder="Search..."
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                    <Nav className="product-view-nav" pills>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === '1'
                          })}
                          onClick={() => {
                            toggleTab('1')
                          }}
                        >
                          <i className="bx bx-grid-alt" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === '2'
                          })}
                          onClick={() => {
                            toggleTab('2')
                          }}
                        >
                          <i className="bx bx-list-ul" />
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Form>
                </Col>
              </Row>
              <Row>
                {products.length > 0 &&
                products.map((product, key) => (
                  <Col xl="4" sm="6" key={'_col_' + key}>
                    <Card
                      onClick={() =>
                        history.push(`/produtos/${product._id}`)
                      }
                    >
                      <CardBody>
                        <div className="product-img position-relative">
                          {
                            product.oldPrice
                              ? (<div className="avatar-sm product-ribbon">
                                <span className="avatar-title rounded-circle  bg-primary">
                                  {`-${product.oldPrice}%`}
                                </span>
                            </div>
                                )
                              : null}

                          <img
                            src={`${s3BaseUrl}/${product.thumbImg}`}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <h5 className="mb-3 text-truncate">
                            <Link
                              to={'/ecommerce-product-detail/' + product._id}
                              className="text-dark"
                            >
                              {product.name}{' '}
                            </Link>
                          </h5>
                          <h5 className="my-0">
                              <span className="text-muted mr-2">
                                <del>${product.oldPrice}</del>
                              </span>
                            <b>${product.price}</b>
                          </h5>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
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
