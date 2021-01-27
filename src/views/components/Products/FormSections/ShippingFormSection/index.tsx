import React from 'react'
import { Input } from '../../../Common/Form'
import PageCard from '../../../Common/PageCard'
import { ProductData } from '../../../../../services/api/products'

interface ShippingFormSectionProps {
  product?: ProductData
}

const ShippingFormSection: React.FC<ShippingFormSectionProps> = ({ product }) => {
  return (<PageCard title={'Frete'} description={'Insira as informações para o cálculo do frete'}>
    <Input name={'weight'} type="text" id="username" label={'Peso'} defaultValue={product ? product.weight : ''} className="form-control" />
    <Input name={'packingHeight'} type="text" id="username" label={'Altura'} defaultValue={product ? product.packingHeight : ''} className="form-control" />
    <Input name={'packingWidth'} type="text" id="username" label={'Largura'} defaultValue={product ? product.packingWidth : ''} className="form-control" />
    <Input name={'packingLength'} type="text" id="username" label={'Comprimento'} defaultValue={product ? product.packingLength : ''} className="form-control" />
  </PageCard>)
}

export default ShippingFormSection
