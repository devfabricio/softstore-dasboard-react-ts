import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { Col, Row } from 'reactstrap'
import { FormHandles } from '@unform/core'
import { Input, Button, Select } from '../../../components/Common/Form'
import { CategoryData, listCategory } from '../../../../services/api/categories'
import { SelectOptionsTypes } from '../../../components/Common/Form/Select'
import PageContent from '../../../components/Common/PageContent'
import PageCard from '../../../components/Common/PageCard'
import CircularProgress from '../../../components/Common/Feedbacks/CircularProgress'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import InputFile from '../../../components/Common/Form/InputFile'
import TextEditor from '../../../components/Common/Form/TextEditor'

const AddPost: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(false)

  const listCategories = useCallback(() => {
    listCategory((data) => {
      setCategories(data)
    })
  }, [])

  useEffect(() => {
    listCategories()
  }, [listCategories])

  const handleSubmit = useCallback((data: any) => {
    setLoading(true)
  }, [])

  const selectOptions = useCallback(() : SelectOptionsTypes[] => {
    const optionsList: SelectOptionsTypes[] = []
    for (const cat of categories) {
      optionsList.push({ key: cat.name, value: cat._id })
    }
    return optionsList
  }, [categories])

  return (
    <PageContent>
      <PageCard title={'Novo Produto'} description={'Insira as informações abaixo para adicionar o produto'}>
        <Form ref={formRef} action="#" onSubmit={handleSubmit}>
          <Row>
            <Col sm="12">
              <Input name={'title'} type="text" label={'Título'} className="form-control" />
              <Select name={'category'} labelText={'Escolha uma categoria'} options={selectOptions()} className="form-control select2" />
              <TextEditor name={'text'} labelText={'Escreva aqui o texto de sua publicação'} />
            </Col>
            <Col sm="4">
              <InputFile name={'postCover'} label={'Escolha uma capa para o post'} />
            </Col>
          </Row>
          {loading && <CircularProgress />}
          {!loading && <Button type="submit" color="primary" className="mr-1 waves-effect waves-light"> Adicionar Publicação </Button>}
        </Form>
      </PageCard>
    </PageContent>
  )
}

export default AddPost
