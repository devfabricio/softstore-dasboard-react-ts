import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import InputCheckbox, { CheckboxOptionsInterface } from '../../../Common/Form/InputCheckbox'
import PageCard from '../../../Common/PageCard'
import {
  CustomizedImageGroupResponse,
  listCustomizedImageGroup
} from '../../../../../services/api/customized-image-group'
import { ProductDataResponse } from '../../../../../services/api/products'
import {
  listProductCustomizedImageGroups,
  ProductCustomizedImageGroupRelationResponse
} from '../../../../../services/api/product-customized-image-group-relation'

interface CustomizedImageFormSectionProps {
  product?: ProductDataResponse
}

const CustomizedImageFormSection: React.FC<CustomizedImageFormSectionProps> = ({ product }) => {
  const [groups, setGroups] = useState<CustomizedImageGroupResponse[]>([])
  const [productImageGroups, setProductImageGroups] = useState<ProductCustomizedImageGroupRelationResponse[]>([])

  const listGroups = useCallback(() => {
    listCustomizedImageGroup(customizedImageGroups => {
      if (customizedImageGroups) {
        setGroups(customizedImageGroups)
      }
    })
  }, [])

  const listCurrentProductCustomizedImageGroups = useCallback(() => {
    if (product) {
      listProductCustomizedImageGroups(product._id, (data, errorMessage) => {
        if (data) {
          console.log('listProductCustomizedImageGroups', data)
          setProductImageGroups(data)
        }
      })
    }
  }, [product])

  useEffect(() => {
    listGroups()
    listCurrentProductCustomizedImageGroups()
  }, [listGroups, listCurrentProductCustomizedImageGroups])

  const getCheckboxOptions = useCallback((): CheckboxOptionsInterface[] => {
    const options: CheckboxOptionsInterface[] = []
    for (const group of groups) {
      options.push({
        id: group._id,
        label: group.name,
        value: group._id,
        checked: productImageGroups
          ? !!productImageGroups.find(it => it.group === group._id)
          : false
      })
    }

    return options
  }, [groups, productImageGroups])

  return (<PageCard title={'Imagens Personalizadas'} description={'Marque abaixo quais '}>
    <Row>
      <Col sm={'12'}>
        { productImageGroups.length > 0 &&
          <InputCheckbox options={getCheckboxOptions()} name={'imageGroup'} />
        }
        { productImageGroups.length === 0 &&
        <InputCheckbox options={getCheckboxOptions()} name={'imageGroup'} />
        }
      </Col>
    </Row>
  </PageCard>)
}

export default CustomizedImageFormSection
