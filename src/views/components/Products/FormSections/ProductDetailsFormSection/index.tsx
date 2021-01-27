import React, { ChangeEvent, RefObject, useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { Input, Select, TextAerea } from '../../../Common/Form'
import PageCard from '../../../Common/PageCard'
import { SelectOptionsTypes } from '../../../Common/Form/Select'
import {
  CategoryRelationshipResponse,
  listCategoryRelationship
} from '../../../../../services/api/category-relationship'
import { FormHandles } from '@unform/core'
import { ProductData } from '../../../../../services/api/products'

interface ProductDetailsFormSectionProps {
  formRef: RefObject<FormHandles>
  product?: ProductData
}

const ProductDetailsFormSection: React.FC<ProductDetailsFormSectionProps> = ({ formRef, product }) => {
  const [categoriesRelationship, setCategoriesRelationship] = useState<CategoryRelationshipResponse[]>([])
  const [rows1, setrows1] = useState<any>([])

  const handleAddRowNested = (e : ChangeEvent<HTMLSelectElement>, index: number) => {
    const parentId = e.target.value
    formRef.current?.clearField(`category[${index + 1}]`)
    const parentCategory = { parentId }
    const arr = rows1.slice(0, index)
    if (categoriesRelationship.filter(it => it.parent?._id === parentId).length > 0) {
      setrows1([...arr, parentCategory])
    } else {
      setrows1([...arr])
    }
  }

  const listCategories = useCallback(() => {
    listCategoryRelationship((data) => {
      setCategoriesRelationship(data)
    })
  }, [])

  useEffect(() => {
    listCategories()
  }, [listCategories])

  const selectOptions = useCallback((parentId?: string) : SelectOptionsTypes[] => {
    let categoriesRelationshipArr: CategoryRelationshipResponse[] = []
    const optionsList: SelectOptionsTypes[] = []
    if (!parentId) {
      categoriesRelationshipArr = categoriesRelationship.filter(it => !it.parent)
    } else {
      categoriesRelationshipArr = categoriesRelationship.filter(it => it.parent?._id === parentId)
    }
    optionsList.push({ key: 'Escolha uma opção', value: '' })
    for (const cat of categoriesRelationshipArr) {
      optionsList.push({ key: cat.category.name, value: cat.category._id })
    }
    return optionsList
  }, [categoriesRelationship])

  return (<PageCard title={'Novo Produto'} description={'Insira as informações abaixo para adicionar o produto'}>
    <Row>
      <Col sm="12">
        <Input name={'name'} type="text" id="username" label={'Nome'} className="form-control" defaultValue={product ? product.name : ''} />
        <Select name={'category[0]'} labelText={'Categoria'}
                onChange={(e) => handleAddRowNested(e, 0)}
                options={selectOptions()} className="form-control select2" />
        {rows1.map((parentCategory: { parentId: string }, idx: number) => (
          <Select key={idx} name={`category[${idx + 1}]`}
                  onChange={(e) => handleAddRowNested(e, idx + 1)}
                  options={selectOptions(parentCategory.parentId)}
                  className="form-control select2" />
        ))}
        <TextAerea name={'description'} id="username" labelText={'Descrição'} className="form-control" rows={5} defaultValue={product ? product.description : ''} />
      </Col>
    </Row>
  </PageCard>)
}

export default ProductDetailsFormSection
