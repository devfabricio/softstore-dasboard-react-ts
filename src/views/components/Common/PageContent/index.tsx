import React from 'react'
import Breadcrumbs from '../Breadcrumb'
import {
  Col,
  Container,
  Row
} from 'reactstrap'
import Layout from '../../../Layout'

interface LayoutProps {
  pageTitle: string
}

const PageContent: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Painel Administrativo" breadcrumbItem={pageTitle} />
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
