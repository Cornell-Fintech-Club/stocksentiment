import React from 'react'

function Gainer(props: any) {


  return (

    <div className="card w-80 h-32 p-3" style={{
      backgroundColor: props.backgroundColor,
      color: props.color
    }}>
      <div className="text-left">
        <h1 className=""></h1>{props.ticker}
        <br></br>
        <p>Current Value</p>
        <div className="stat-value">${props.change_amount}</div>
      </div>

      <div className="text-right">
        <h1 className="text-lg font-small">{props.change_percentage}</h1>
      </div>

    </div >

  )
}

export default Gainer