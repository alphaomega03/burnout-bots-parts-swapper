import { Button, Table, Typography } from "antd";
import styled from 'styled-components'
const { Text } = Typography

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
  background-size: 94%;
  /* font size */
  font-size: 7px;
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

export const DisabledRPGButton = styled.button`

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
  background-size: 94%;
  /* font size */
  font-size: 7px;
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

  :disabled {
    filter: grayscale(1);
    color: #999;
  }

`

export const RPGConnectButton = styled.button`
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
  background-size: 100%;
  /* font size */
  font-size: 13px;
  /* default size and display */
  max-width: 100%;
  min-width: 190px;
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
// background: url(/table-background.png) center;

export const RPGTable = styled(Table)`
  border-image-slice: 4 4 4 4;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-size: 60%;
  background-clip: padding-box;
  border-style: solid;
  background-origin: padding-box;
  font-family: 'Press Start 2P',cursive;
  color: white;
  margin-right: 20px;
  min-width: 40vw;

  .ant-table-thead {
    background: url(/table-header.png) center;
    background-repeat: no-repeat;
    height: 15vh;
    background-size: 101% 105%;
    background-color: grey;
  }

  .ant-table-thead > tr > th {
    position: relative;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 10px;
    text-align: center;
    background: transparent;
    border-bottom: 1px solid #f0f0f0;
    background-position: 126% 165%;
    background-repeat: no-repeat;

    transition: background 0.3s ease;
    color: white;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s;
    background-color: #707F54;
    background-repeat: no-repeat;
    color: white;
    min-height: 50vh;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background-repeat: no-repeat;
    background-color: #707F54;
    color: white;
  }

  .ant-empty {
    margin: 0 8px;
    font-size: 14px;
    line-height: 1.5715;
    min-height: 32vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .ant-table-content {
    min-height: 50vh;
    background-color: #707F54;
  }

  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    &:hover {
      background-color: #707F54;
    }
  }

  .ant-table-empty .ant-table-tbody > tr.ant-table-placeholder {
    background-repeat: no-repeat;
    background-color: #707F54;
    &:hover {
      background-color: #707F54 ;
    }
  }
`

export const RPGText = styled(Text)`
  font-family: 'Press Start 2P',cursive;
  color: white;
`