import styled from 'styled-components'

export const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FormCard = styled.div`
  background: #fff;
  border: 1px solid #dedede;
  border-radius: .5rem;
  padding: 1.5rem;
  text-align: center;
  width: 100%;
  max-width: 400px;
  img {
    margin-bottom: 1rem
  }
  a {
    color: #de2209;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      color: #1F2C6A
    }
  }
  button {
    width: 100%
  }
`
