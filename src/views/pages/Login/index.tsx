import React, { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Row, Col, CardBody, Card, Container } from 'reactstrap'
import * as Yup from 'yup'
import Input from '../../components/Common/Form/Input'
import Button from '../../components/Common/Form/Button'
import getValidationErrors from '../../../utils/validationErrors'
import { useAuth } from '../../context/AuthContext'
import { useFeedback } from '../../context/FeedbackProvider'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo-symbol.png'

interface LoginFormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { signIn } = useAuth()
  const { openToast, showBackdrop, dismissBackdrop } = useFeedback()

  const handleSubmit = useCallback(async (data: LoginFormData) => {
    showBackdrop()
    formRef.current?.setErrors({})
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Email inválido!').required('E-mail obrigatório!'),
        password: Yup.string().required('Senha obrigatória!')
      })
      await schema.validate(data, {
        abortEarly: false
      })
      await signIn({ email: data.email, password: data.password })
      dismissBackdrop()
      openToast('Login efetuado com sucesso!', 'success')
      window.location.href = '/'
    } catch (error) {
      openToast('Dados de login inválidos. Tente novamente!', 'error')
      dismissBackdrop()
      if (error.inner) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
      }
    }
  }, [dismissBackdrop, openToast, showBackdrop, signIn])

  return (
  <>
    <div className="home-btn d-none d-sm-block">
      <Link to="/" className="text-dark">
        <i className="fas fa-home h2" />
      </Link>
    </div>
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="overflow-hidden">
              <div className="bg-soft-primary">
                <Row>
                  <Col className="col-12 text-center p-4">
                    <img src={logo} height={60} alt="" />
                  </Col>
                </Row>
              </div>
              <CardBody className="pt-0 mt-3">
                <div className="p-2">
                  <Form
                    className="form-horizontal"
                    ref={formRef} action="#"
                    onSubmit={handleSubmit}
                  >
                    <Input
                      name="email"
                      label="E-mail"
                      className="form-control"
                      type="email"
                      required
                    />
                    <Input
                      name="password"
                      label="Senha"
                      type="password"
                      required
                    />

                    <div className="mt-3">
                      <Button
                        className="btn btn-primary btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Entrar
                      </Button>
                    </div>

                    <div className="mt-4 text-center">
                      <Link to="/forgot-password" className="text-muted">
                        <i className="mdi mdi-lock mr-1" />
                        Esqueceu a senha?
                      </Link>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <p>
                © {new Date().getFullYear()} Sonhadeira. Criado por Balloon.dev
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </>
  )
}

export default Login
