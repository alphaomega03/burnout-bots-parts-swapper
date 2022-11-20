export default function TradeContainer(props) {
  return (
    <>
      <div
        className="trade-container-1 justify-evenly items-start pb-2 border-solid bg-top box-border bg-clip-padding bg-origin-padding"
      >
        {props.children}
      </div>
      {/* <div className="trade-container-4 mb-0" /> */}
      {/*<div className="trade-container-border" /> */}
      
    </>

  )
}
