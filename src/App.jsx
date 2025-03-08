import { useState } from 'react'
import './App.css'
import PropTypes from 'prop-types'

/*
Square Component, returns a button class name 'square'
*/
function Square({value, onSquareClick}) {
  return( 
    <button 
      className='square'
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

/*
Gave Square a prop called value, that is a string parameter
for identifying square on board
*/
Square.propTypes = {
  value: PropTypes.string.isRequired
}

/*
main component for app, the board
*/
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  // creates board component function that is passed to child square components
  // Square components has prop for a square value and a function
  // when function called in square it causes this change in board state
  function handleClick(i) {
    // since array is reference you can copy using slice array method, sets to nextSquares
    // keeps previous state available for future use
    // changes to "X" on index 0 of nextSquares
    // uses useState setSquares which updates squares, replaced 0 with index
    const nextSquares = squares.slice()
    setSquares(nextSquares)
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    setXIsNext(!xIsNext)
  }

  

  // pass it a function rather than a call so it does not execute right away but on click
  // use of state and value
  return (
    <>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}


