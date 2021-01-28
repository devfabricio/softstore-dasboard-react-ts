import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { Button, Input } from '../../../Common/Form'
import PageCard from '../../../Common/PageCard'
import {
  listProductCustomizedTexts,
  ProductCustomizedTextResponse
} from '../../../../../services/api/product-customized-text'
import { ProductDataResponse } from '../../../../../services/api/products'

interface CustomizedTextFields {
  name: string
}

interface AddCustomizedTextProps {
  product?: ProductDataResponse
}

const AddCustomizedText: React.FC<AddCustomizedTextProps> = ({ product }) => {
  const [rows1, setrows1] = useState<CustomizedTextFields[]>([])
  const [customizedTexts, setCustomizedTexts] = useState<ProductCustomizedTextResponse[]>([])

  function handleAddRowNested () {
    const item1: CustomizedTextFields = { name: '' }
    setrows1([...rows1, item1])
  }

  const listCustomizedTexts = useCallback(() => {
    if (product) {
      listProductCustomizedTexts(product._id, (data, errorMessage) => {
        if (data) {
          setCustomizedTexts(data)
        }
      })
    }
  }, [product])

  useEffect(() => {
    listCustomizedTexts()
  }, [listCustomizedTexts])

  useEffect(() => {
    const customizedTextFields: CustomizedTextFields[] = []
    if (customizedTextFields.length > 1) {
      for (const customizedText of customizedTexts.slice(1, customizedTexts.length)) {
        customizedTextFields.push({ name: customizedText.label })
      }
    }
    setrows1(rows => [...rows, ...customizedTextFields])
  }, [customizedTexts])

  return (
    <PageCard title={'Textos Personalizados'}
              description={'Adicione abaixo um ou mais nomes de campos de texto que ficarão disponíveis para este produto'}>
      <div data-repeater-list="outer-group" className="outer">
        <div data-repeater-item className="outer">
          <div className="inner-repeater mb-4">
            <table style={{ width: '100%' }}>
              <tbody>
              <tr id="addrMain" key="">
                <td>
                  <Row className="mb-2">
                    <Col md="12">
                      <Input
                        name={'productCustomizedText[0]'}
                        type="text"
                        defaultValue={customizedTexts[0] ? customizedTexts[0].label : ''}
                        className="inner form-control"
                        label={'Nome do campo para preenchimento do cliente'}
                      />
                    </Col>
                  </Row>
                </td>
              </tr>

              {rows1.map((item1: any, idx: any) => (
                <tr id={'nested' + idx} key={idx}>
                  <td>
                    <Row className="mb-2">
                      <Col md="12">
                        <Input
                          name={`productCustomizedText[${idx + 1}]`}
                          type="text"
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
              Adicionar Campo
            </Button>
          </div>
        </div>
      </div>
    </PageCard>)
}

export default AddCustomizedText
