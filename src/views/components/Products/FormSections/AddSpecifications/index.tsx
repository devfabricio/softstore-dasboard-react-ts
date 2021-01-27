import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { Button, Input } from '../../../Common/Form'
import PageCard from '../../../Common/PageCard'
import { ProductDataResponse } from '../../../../../services/api/products'
import { ProductSpecificationResponse } from '../../../../../services/api/product-specification'
import * as ProductSpecification from '../../../../../services/api/product-specification'

interface AddSpecificationsProps {
  product?: ProductDataResponse
}

interface SpecificationsFields {
  name: string
  value: string
}

const AddSpecifications: React.FC<AddSpecificationsProps> = ({ product }) => {
  const [rows1, setrows1] = useState<SpecificationsFields[]>([])
  const [productSpecifications, setProductSpecifications] = useState<ProductSpecificationResponse[]>([])

  function handleAddRowNested () {
    const item1 : SpecificationsFields = { name: '', value: '' }
    setrows1([...rows1, item1])
  }

  const listProductSpecifications = useCallback(() => {
    if (product) {
      ProductSpecification.list(product._id, (data, errorMessage) => {
        if (data) {
          setProductSpecifications(data)
        }
      })
    }
  }, [product])

  useEffect(() => {
    listProductSpecifications()
  }, [listProductSpecifications])

  useEffect(() => {
    const specificationsFields: SpecificationsFields[] = []
    if (productSpecifications.length > 1) {
      for (const specification of productSpecifications.slice(1, productSpecifications.length)) {
        specificationsFields.push({ name: specification.name, value: specification.value })
      }
    }
    setrows1(rows => [...rows, ...specificationsFields])
  }, [productSpecifications])

  return (
    <PageCard title={'Especificações'} description={'Adicione especificações para o produto'}>
      <div data-repeater-list="outer-group" className="outer">
        <div data-repeater-item className="outer">
          <div className="inner-repeater mb-4">
            <table style={{ width: '100%' }}>
              <tbody>
              <tr id="addrMain" key="">
                <td>
                  <Row className="mb-2">
                    <Col md="6">
                      <Input
                        name={'productSpecificationName[0]'}
                        type="text"
                        defaultValue={productSpecifications[0] ? productSpecifications[0].name : ''}
                        className="inner form-control"
                        label={'Nome da Especificação'}
                      />
                    </Col>
                    <Col md="6">
                      <Input
                        name={'productSpecificationValue[0]'}
                        type="text"
                        defaultValue={productSpecifications[0] ? productSpecifications[0].value : ''}
                        className="inner form-control"
                        label={'Valor da Especificação'}
                      />
                    </Col>
                  </Row>
                </td>
              </tr>

              {rows1.map((item: SpecificationsFields, idx: number) => (
                <tr id={'nested' + idx} key={idx}>
                  <td>
                    <Row className="mb-2">
                      <Col md="6">
                        <Input
                          name={`productSpecificationName[${idx + 1}]`}
                          type="text"
                          defaultValue={item.name}
                          className="inner form-control"
                        />
                      </Col>
                      <Col md="6">
                        <Input
                          name={`productSpecificationValue[${idx + 1}]`}
                          type="text"
                          defaultValue={item.value}
                          className="inner form-control"
                        />
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <Button
              type={'button'}
              onClick={() => {
                handleAddRowNested()
              }}
              className="btn btn-primary mt-1"
            >
              Adicionar Especificação
            </Button>
          </div>
        </div>
      </div>
    </PageCard>)
}

export default AddSpecifications
