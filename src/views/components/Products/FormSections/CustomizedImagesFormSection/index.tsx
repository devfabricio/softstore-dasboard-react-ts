import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import InputCheckbox, { CheckboxOptionsInterface } from '../../../Common/Form/InputCheckbox'
import PageCard from '../../../Common/PageCard'
import {
  CustomizedImageGroupResponse,
  listCustomizedImageGroup
} from '../../../../../services/api/customized-image-group'

const CustomizedImageFormSection: React.FC = () => {
  const [groups, setGroups] = useState<CustomizedImageGroupResponse[]>([])

  const listGroups = useCallback(() => {
    listCustomizedImageGroup(customizedImageGroups => {
      if (customizedImageGroups) {
        setGroups(customizedImageGroups)
      }
    })
  }, [])

  useEffect(() => {
    listGroups()
  }, [listGroups])

  const getCheckboxOptions = useCallback((): CheckboxOptionsInterface[] => {
    const options: CheckboxOptionsInterface[] = []
    for (const group of groups) {
      options.push({
        id: group._id,
        label: group.name,
        value: group._id
      })
    }

    return options
  }, [groups])

  return (<PageCard title={'Imagens Personalizadas'} description={'Marque abaixo quais '}>
    <Row>
      <Col sm={'12'}>
        <InputCheckbox options={getCheckboxOptions()} name={'imageGroup'}/>
      </Col>
    </Row>
  </PageCard>)
}

export default CustomizedImageFormSection
