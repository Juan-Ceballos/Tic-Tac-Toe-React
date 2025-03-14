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
  value: PropTypes.string.isRequired,
  onSquareClick: PropTypes.func.isRequired
}

/*
main component for app, the board
*/

// new main function to keep track of history and go back turns
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  // the spread operator has the last array, next squares added 
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    description = move > 0 ? 'Go to move #' + move : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function Board({xIsNext, squares, onPlay}) {
  //const [squares, setSquares] = useState(Array(9).fill(null))
  //const [xIsNext, setXIsNext] = useState(true) REFACTORED

  // creates board component function that is passed to child square components
  // Square components has prop for a square value and a function
  // when function called in square it causes this change in board state
  function handleClick(i) {
    // since array is reference you can copy using slice array method, sets to nextSquares
    // keeps previous state available for future use
    // changes to "X" on index 0 of nextSquares
    // uses useState setSquares which updates squares, replaced 0 with index
    if (squares[i] || calculateWinner(squares)) {return}
    
    const nextSquares = squares.slice()
    //setSquares(nextSquares)
    
    nextSquares[i] = xIsNext ? "X" : "O"
    //setXIsNext(!xIsNext)
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "Winner: " + winner 
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  // pass it a function rather than a call so it does not execute right away but on click
  // use of state and value
  return (
    <>
      <div className='status'>{status}</div>
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

// create winning arrays stor in array, check each win array,
// // if the first letter in array not null and same as b and c element
// return a, the letter that won the row else return null
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}
