import styled from 'styled-components'

export const ButtonContainer = styled.div`
  margin-bottom: 1rem;
  button {
    font-family: "Roboto", sans-serif;
    background-color: #11a1fd;
    display: inline-block;
    font-weight: 700;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .45rem .9rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .2rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
  }
`
