import React from 'react'
import InputCurrencyMask from '../../../Common/Form/InputCurrencyMask'
import PageCard from '../../../Common/PageCard'
import { ProductData } from '../../../../../services/api/products'

interface PriceFormSectionProps {
  product?: ProductData
}

const PriceFormSection: React.FC<PriceFormSectionProps> = ({ product }) => {
  return (<PageCard title={'Preço'} description={'Escolha uma categoria para o produto'}>
    <InputCurrencyMask name={'price'} labelText={'Preço'} defaultValue={product ? product.price : 0} />
    <InputCurrencyMask name={'oldPrice'} labelText={'Preço Comparativo'} defaultValue={product ? product.oldPrice : 0} />
    <InputCurrencyMask name={'costPerItem'}
                       labelText={'Custom por Item'}
                       infoText={'Esta informação não será exibida para os clientes'}
                       defaultValue={product ? product.costPerItem : 0} />
  </PageCard>)
}

export default PriceFormSection
