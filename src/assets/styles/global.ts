import { createGlobalStyle } from 'styled-components'
import { colors } from './colors'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0; 
  }
  
  button {
    cursor: pointer;
  }
  body {
    margin: 0;
    font-family: "Roboto",sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${colors.textColor};
    text-align: left;
    background-color: #f3f7f9;
  }
  a {
    text-decoration: none;
    color: ${colors.linkColor};
    font-weight: 700;
    &:hover {
      color: ${colors.linkHoverColor};
    }
  }
  h1, h2 {
    color: ${colors.textColor}
  }
  label {
    color: ${colors.subtitleColor};
    font-weight: bold;
    text-transform: uppercase;
  }
  .btn {
    display: inline-block;
    font-weight: 400;
    color: #797979;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: transparent;
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
