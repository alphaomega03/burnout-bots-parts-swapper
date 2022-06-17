import { Button } from 'antd'
import styled from 'styled-components'
import AccountLoggedIn from './AccountLoggedIn'

export const StyledButton = styled(Button)`
  background-color: rgba(103, 79, 255, 1);
  margin: 1rem;
  margin-bottom: 0.15rem;
  width: 170px;
  height: 75px;
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  color: inherit;
  text-decoration: none;
  border: none;
  border-radius: 10px;
  font-family: trebuc;
  font-size: 2.2em;
  color: white;
  text-shadow: .1em .1em 0 black, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 300px;
  -webkit-box-shadow: 0 2px 10px 1px rgba(0,0,0,0.5);

  :hover {
    color: rgba(103, 79, 255, 1);
    text-shadow: none;
  }
`

export const StyledAccountLoggedIn = styled(AccountLoggedIn)`
  position: absolute;
  top: 10%;
  right: 90%;
`