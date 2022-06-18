import { Button, Table } from "antd";
import styled from 'styled-components'

export const RPGButton = styled.button`
  /* hide button default stuff */
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  overflow: hidden;
  outline: none;
  /* background */
  background: url("/button.png") no-repeat no-repeat;
  background-clip: padding-box;
  background-origin: padding-box;
  background-position: center;
  background-size: 100% 100%;
  /* font size */
  font-size: 1.0em;
  /* default size and display */
  max-width: 100%;
  min-width: 140px;
  height: 60px;
  display: inline-block;
  /* padding */
  padding-left: 35px;
  padding-right: 35px;
  font-family: 'Press Start 2P',cursive;
  color: white;

  &:hover {
    background-image: url("/button-hover.png");
  }
`

export const RPGTable = styled(Table)`
  border-image-source: url(/border-image-golden.png);
`