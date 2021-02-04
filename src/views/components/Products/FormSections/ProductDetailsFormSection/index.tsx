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
import { ProductDataResponse } from '../../../../../services/api/products'
import { listProductCategories, ProductCategoryResponse } from '../../../../../services/api/product-category'

interface ProductDetailsFormSectionProps {
  formRef: RefObject<FormHandles>
  product?: ProductDataResponse
}

interface CategoryFields {
  parentId: string
}

const ProductDetailsFormSection: React.FC<ProductDetailsFormSectionProps> = ({ formRef, product }) => {
  const [categoriesRelationship, setCategoriesRelationship] = useState<CategoryRelationshipResponse[]>([])
  const [productCategories, setProductCategories] = useState<ProductCategoryResponse[]>([])
  const [rows1, setrows1] = useState<CategoryFields[]>([])

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

  const listCurrentProductCategories = useCallback(() => {
    if (product) {
      listProductCategories(product._id, (data, errorMessage) => {
        if (data) {
          setProductCategories(data)
        }
      })
    }
  }, [product])

  useEffect(() => {
    listCategories()
    listCurrentProductCategories()
  }, [listCategories, listCurrentProductCategories])

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
      optionsList.push({
        key: cat.category.name,
        value: cat.category._id,
        selected: !!productCategories.find(it => it.category === cat.category._id)
      })
    }
    return optionsList
  }, [categoriesRelationship, productCategories])

  useEffect(() => {
    if (productCategories.length > 1) {
      const currentCategoriesRelationships: CategoryRelationshipResponse[] = []
      for (const productCategory of productCategories) {
        const categoryRelationship = categoriesRelationship.find(it => it.category._id === productCategory.category)
        if (categoryRelationship) {
          currentCategoriesRelationships.push(categoryRelationship)
        }
      }

      const orderParents = (parentCategoryRelationship: CategoryRelationshipResponse) => {
        const nestedCategory = currentCategoriesRelationships.find(catRel => catRel.parent?._id === parentCategoryRelationship.category._id)
        if (nestedCategory) {
          setrows1(rows => [...rows, { parentId: parentCategoryRelationship.category._id }])
          orderParents(nestedCategory)
        }
      }

      const currentCategoryRelationshipWithoutParent = currentCategoriesRelationships.find(it => !it.parent)
      if (currentCategoryRelationshipWithoutParent) {
        orderParents(currentCategoryRelationshipWithoutParent)
      }
    }
  }, [categoriesRelationship, productCategories])

  return (<PageCard title={'Informações Gerais'} description={'Insira as informações abaixo para adicionar o produto'}>
    <Row>
      <Col sm="12">
        <Input name={'name'} type="text" id="username" label={'Nome'} className="form-control" defaultValue={product ? product.name : ''} />
        <>
         <Select name={'category[0]'} labelText={'Categoria'}
                onChange={(e) => handleAddRowNested(e, 0)}
                options={selectOptions()} className="form-control select2" />
        {rows1.map((parentCategory: { parentId: string }, idx: number) => (
          <Select key={idx} name={`category[${idx + 1}]`}
                  onChange={(e) => handleAddRowNested(e, idx + 1)}
                  options={selectOptions(parentCategory.parentId)}
                  className="form-control select2" />
        ))}
        </>
        <TextAerea name={'description'} id="username" labelText={'Descrição'} className="form-control" rows={5} defaultValue={product ? product.description : ''} />
      </Col>
    </Row>
  </PageCard>)
}

export default ProductDetailsFormSection
