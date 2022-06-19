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

export const RPGTable = styled(Table)`
  border-image-source: url(/border-image-golden.png);
  border-image-slice: 4 4 4 4;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background: url(/background-image-golden.png) center;
  background-size: 60%;
  background-clip: padding-box;
  border-width: 14px;
  border-style: solid;
  background-origin: padding-box;
  font-family: 'Press Start 2P',cursive;
  color: white;

  .ant-table-thead > tr > th {
    position: relative;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    text-align: left;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    background: url(/background-image-golden.png) center;
    transition: background 0.3s ease;
    color: white;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s;
    background: url(/background-image-golden.png) center;
    color: white;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: url(/background-image-golden.png) center;
    color: white;
  }
`