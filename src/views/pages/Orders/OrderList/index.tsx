import React, { useState } from 'react'
import PageContent from '../../../components/Common/PageContent'
import PageCard from '../../../components/Common/PageCard'
import { Col, Row } from 'reactstrap'
import { Button } from '../../../components/Common/Form'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider
} from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import EcommerceOrderColumns from './ecommerce-order-columns'

const OrderList: React.FC = () => {
  const orders: any = []
  const [modal, setModal] = useState(false)
  const [orderList, setOrderList] = useState([])
  const pageOptions = {
    sizePerPage: 10,
    totalSize: 50, // replace later with size(orders),
    custom: true
  }
  const { SearchBar } = Search

  const handleTableChange = (type: any, { page, searchText }: any) => {
    setOrderList(
      orders.filter((order: any) =>
        Object.keys(order).some(
          key =>
            typeof order[key] === 'string' &&
            order[key].toLowerCase().includes(searchText.toLowerCase())
        )
      )
    )
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  return (<PageContent pageTitle={'Pedidos'}>
    <PageCard title={'Lista de Usuários'} description={'Confira abaixo a lista de usuários cadastrados em sua loja'}>
      <PaginationProvider
        pagination={paginationFactory(pageOptions)}
      >
        {({ paginationProps, paginationTableProps }: any) => (
          <ToolkitProvider
            keyField="id"
            data={orderList || []}
            columns={EcommerceOrderColumns(toggleModal)}
            bootstrap4
            search
          >
            {toolkitProps => (
              <React.Fragment>
                <Row className="mb-2">
                  <Col sm="4">
                    <div className="search-box mr-2 mb-2 d-inline-block">
                      <div className="position-relative">
                        <SearchBar
                          {...toolkitProps.searchProps}
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                  </Col>
                  <Col sm="8">
                    <div className="text-sm-right">
                      <Button
                        type="button"
                        color="success"
                        className="btn-rounded waves-effect waves-light mb-2 mr-2"
                      >
                        <i className="mdi mdi-plus mr-1" />
                        Add New Order
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xl="12">
                    <div className="table-responsive">
                      <BootstrapTable
                        responsive
                        remote
                        bordered={false}
                        striped={false}
                        classes={
                          'table table-centered table-nowrap'
                        }
                        headerWrapperClasses={'thead-light'}
                        {...toolkitProps.baseProps}
                        onTableChange={handleTableChange}
                        {...paginationTableProps}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="align-items-md-center mt-30">
                  <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                    <PaginationListStandalone
                      {...paginationProps}
                    />
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </ToolkitProvider>
        )}
      </PaginationProvider>
    </PageCard>
  </PageContent>)
}

export default OrderList
