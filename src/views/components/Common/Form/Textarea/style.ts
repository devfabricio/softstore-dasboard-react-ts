import styled from 'styled-components'
import { colors } from '../../../../../assets/styles/colors'

export const TextAreaContainer = styled.div`
  margin-bottom: 1rem;
  height: 100%;
  label {
    font-weight: 600;
    font-size: 14px;
    display: inline-block;
    margin-bottom: .5rem;
  }
  
  .full-height {
    height: 100%
  }
  
  textarea {
    color: ${colors.textColor};
    font-family: "Source Sans Pro",sans-serif;
    display: block;
    width: 100%;
    min-height: 250px;
    max-width: 100%;
    height: calc(1.5em + .9rem + 2px);
    padding: .45rem .9rem;
    font-size: .9rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #dee2e6;
    border-radius: .2rem;
    -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
`
