import { useState } from 'react'
import './App.css'
import PropTypes from 'prop-types'

/*
Square Component, returns a button class name 'square'
*/
function Square() {
  const [value, setValue] = useState(null)

  function handleClick() {
    setValue('X')
  }

  return( 
    <button 
      className='square'
      onClick={handleClick}
    >
      {value}
    </button>
  )
}

/*
main component for app, the board
*/
export default function Board() {
  return (
    <>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
    </>
  )
}


/*
Gave Square a prop called value, that is a string parameter
for identifying square on board
*/
// Square.propTypes = {
//   value: PropTypes.string.isRequired
// }