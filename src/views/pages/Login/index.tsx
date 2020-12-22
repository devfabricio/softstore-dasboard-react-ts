import React, { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Row, Col, CardBody, Card, Container } from 'reactstrap'
import * as Yup from 'yup'
import Input from '../../components/Form/Input'
import Button from '../../components/Form/Button'
import getValidationErrors from '../../../utils/validationErrors'
import { useAuth } from '../../context/AuthContext'
import { useFeedback } from '../../context/FeedbackProvider'
import { Link } from 'react-router-dom'
import profile from '../../../assets/images/profile-img.png'
import logo from '../../../assets/images/logo.svg'

interface LoginFormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { openToast } = useFeedback()

  const handleSubmit = useCallback(async (data: LoginFormData) => {
    setLoading(true)
    console.log(loading)
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
      openToast('Login efetuado com sucesso!', 'success')
      window.location.href = '/'
    } catch (error) {
      openToast('Dados de login inválidos. Tente novamente!', 'error')
      setLoading(false)
      if (error.inner) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
      }
    }
  }, [signIn])

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
                  <Col className="col-7">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p>Sign in to continue to Skote.</p>
                    </div>
                  </Col>
                  <Col className="col-5 align-self-end">
                    <img src={profile} alt="" className="img-fluid" />
                  </Col>
                </Row>
              </div>
              <CardBody className="pt-0">
                <div>
                  <Link to="/">
                    <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                    </div>
                  </Link>
                </div>
                <div className="p-2">
                  <Form
                    className="form-horizontal"
                    ref={formRef} action="#"
                    onSubmit={handleSubmit}
                  >
                    <Input
                      name="email"
                      label="Email"
                      value="admin@themesbrand.com"
                      className="form-control"
                      placeholder="Enter email"
                      type="email"
                      required
                    />
                    <Input
                      name="password"
                      label="Password"
                      value="123456"
                      type="password"
                      required
                      placeholder="Enter Password"
                    />

                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlInline"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlInline"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="mt-3">
                      <Button
                        className="btn btn-primary btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Log In
                      </Button>
                    </div>

                    <div className="mt-4 text-center">
                      <Link to="/forgot-password" className="text-muted">
                        <i className="mdi mdi-lock mr-1" />
                        Forgot your password?
                      </Link>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <p>
                Don&#39;t have an account ?{' '}
                <Link
                  to="register"
                  className="font-weight-medium text-primary"
                >
                  {' '}
                  Signup now{' '}
                </Link>{' '}
              </p>
              <p>
                © {new Date().getFullYear()} Skote. Crafted with{' '}
                <i className="mdi mdi-heart text-danger" /> by Themesbrand
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
