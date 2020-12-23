import React from 'react'
import Breadcrumbs from '../Breadcrumb'
import {
  Col,
  Container,
  Row
} from 'reactstrap'
import Layout from '../../../Layout'

const PageContent: React.FC = ({ children }) => {
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Add Product" />
          <Row>
            <Col xs="12">
              {children}
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default PageContent
