import React from 'react'
import "./CurrState.css"

const CurrState = ({algo, speed}) => {
  return (
    <div className='curr-state'>
      <div className="curr-algo">
        <p><span>Algorithm:</span> {algo}</p>
      </div>
      <div className="curr-speed">
        <p><span>Speed:</span> {speed}</p>
      </div>
    </div>
  )
}

export default CurrState
