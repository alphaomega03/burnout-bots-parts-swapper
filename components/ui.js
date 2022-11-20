import Terminal from "terminal-in-react";
import styled from "styled-components";
import { Space, Input } from 'antd'
import TradeWindow from "./TradeWindow";
import UserTradeWindow from "./UserTradeWindow";
export const StyledTerminal = styled(Terminal)`
  background-color: darkgrey;
`

export const UserItemsContainer = styled(Space)`
  justify-content: space-around;
  min-height: 11vh;
  align-items: center;
  border-image-source: url(/border-image-golden.png);
  border-image-slice: 4 4 4 4;
  border-width: 5px;
  border-style: solid;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background: url(/table-background.png) center;
  background-clip: padding-box;
  background-origin: padding-box;
  min-height: 24vh;
  min-width: 15vw;
  z-index: 2;
`

export const TradePartnerItemsContainer = styled(Space)`
  justify-content: space-around;
  min-height: 11vh;
  align-items: center;
  border-image-source: url(/border-image-golden.png);
  border-image-slice: 4 4 4 4;
  border-width: 5px;
  border-style: solid;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background: url(/table-background.png) center;
  background-clip: padding-box;
  background-origin: padding-box;
  min-height: 24vh;
  min-width: 15vw;
  z-index: 2;
`

export const TradeWindowContainer = styled(TradeWindow)`

`

export const UserTradeWindowContainer = styled(UserTradeWindow)`

`


export const FormSpace = styled(Space)`

`

export const MainContainer = styled(Space)`

`

export const TradeContainer = styled(Space)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 60px;
  border-style: solid;
  background-image: url(/layer-2b.png), url(/layer-2a.png);
  border-image-source: url(img/border-image-grey.png);
  background-position: top;
  border-image-repeat: repeat;
  border-image-slice: 3 3 3 3;
  border-image-width: 7px;
  border-width: 7px;
  padding: 12px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-clip: padding-box;
  background-origin: padding-box;
  min-height: 55vh;
  min-width: 84vw;
`

export const TradeInputContainer = styled(Space)`

`
export const InputContainer = styled(Space)`

`

export const RPGInput = styled.input`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: .5em;
  line-height: 32px;
  background: #4e4a4e;
  max-width: 100%;
  width: 100%;
  padding-left: 10px;
  min-height: 30px;
  -webkit-touch-callout: text;
  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  -webkit-tap-highlight-color: rgba(0,0,0,.5);
  font-family: 'Press Start 2P',cursive;
  color: white;
`
