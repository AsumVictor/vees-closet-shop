import React from 'react'
import './loader.css'
function Loader({extendclass}) {
  return (
    <div className={`spinner ${extendclass}`}></div>
  )
}

export default Loader