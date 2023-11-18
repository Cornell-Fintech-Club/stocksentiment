import React from 'react'

function Gainer(props: any) {


  return (

    <div className="card w-80 p-6 bg-primary text-primary-content">
      <div className="text-left">
        <h1 className=""></h1>{props.name}
        <br></br>
        <p>Current Value</p>
        <div className="stat-value">${props.price}</div>
      </div>

      <div className="text-right">
        <h1 className="text-lg font-small">{props.symbol}</h1>
        <div>+/- ${props.change} ({props.changesPercentage}%)</div>
      </div>

    </div >

  )
}

export default Gainer