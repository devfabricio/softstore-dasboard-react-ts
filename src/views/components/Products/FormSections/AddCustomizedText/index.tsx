import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { Button, Input } from '../../../Common/Form'
import PageCard from '../../../Common/PageCard'

const AddCustomizedText: React.FC = () => {
  const [rows1, setrows1] = useState<any>([])

  function handleAddRowNested () {
    const item1 = { name1: '' }
    setrows1([...rows1, item1])
  }

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
