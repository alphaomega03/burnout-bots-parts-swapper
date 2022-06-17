import { createContext, useState } from "react"
import { uniqBy } from 'lodash'

export const usePosition = () => {
  const [inventoryItemPositions, setInventoryItemPositions] = useState([])
  const [tradeItemPositions, setTradeItemPositions] = useState([])

  const doesPositionHaveItem = (x, y) => {
    return inventoryItemPositions.find(pos => pos.x === x && pos.y === y) !== undefined
  }

  const doesTradePositionHaveItem = (x, y) => {
    return tradeItemPositions.find(pos => pos.x === x && pos.y === y) !== undefined
  }

  const addInventoryItem = (x, y) => {
    inventoryItemPositions.push({x, y})
    setInventoryItemPositions(uniqBy(inventoryItemPositions, (pos) => pos.x ))
  }

  const addItemToTradeWindow = (itemPos, tradePos) => {
    const filteredInventory = inventoryItemPositions.filter(pos => pos.x !== itemPos.x || pos.y !== itemPos.y)
    tradeItemPositions.push({ x: tradePos.x, y: tradePos.y })

    setTradeItemPositions(tradeItemPositions)
    setInventoryItemPositions(filteredInventory)
  }


  const addTradeItemToInventory = (tradePos, itemPos) => {
    
    if(!doesPositionHaveItem(itemPos.x, itemPos.y)) {
    
      const filteredTradeWindow = tradeItemPositions.filter(pos => pos.x !== tradePos.x || pos.y !== tradePos.y)
      setTradeItemPositions(filteredTradeWindow)
      inventoryItemPositions.push({ x: itemPos.x, y: itemPos.y })

      setInventoryItemPositions(inventoryItemPositions)
    }

  }

  return {
    inventoryItemPositions,
    tradeItemPositions,
    doesPositionHaveItem,
    doesTradePositionHaveItem,
    addInventoryItem,
    addItemToTradeWindow,
    addTradeItemToInventory
  }
}

export const PositionContext = createContext()
