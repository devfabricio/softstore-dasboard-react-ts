import React from 'react'
import { Col, Row } from 'reactstrap'
import { Input } from '../../../Common/Form'
import PageCard from '../../../Common/PageCard'
import { ProductDataResponse } from '../../../../../services/api/products'

interface StockFormSectionProps {
  product?: ProductDataResponse
}

const StockFormSection: React.FC<StockFormSectionProps> = ({ product }) => {
  return (<PageCard title={'Estoque'} description={'Informações de Estoque'}>
    <Row>
      <Col sm={'6'}>
        <Input name={'quantityInStock'} type="number" label={'Quantidade Disponível'} defaultValue={product ? product.quantityInStock : ''} className="form-control" />
      </Col>
      <Col sm={'6'}>
        <Input name={'sku'} type="text" label={'SKU (Unidade de manutenção de estoque)'} defaultValue={product ? product.sku : ''} className="form-control" />
      </Col>
      <Col sm={'12'}>
        <Input name={'barCode'} type="number" label={'Código de Barras'} defaultValue={product ? product.barCode : ''} className="form-control" />
      </Col>
    </Row>
  </PageCard>)
}

export default StockFormSection
