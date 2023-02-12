// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

function Board() {
  const [squares, setSquares] = React.useState(() => Array(9).fill(null))
  // I was trying to be too smart with this
  //  it ended up with some weird side effects like the status always being a step behind
  // Sadly I wasn't able to figure out how to fix this, and the solution didn't involve multiple
  //  states as it was all derived from squares.
  // If the person who started the game could have been variable though, I wonder if that would introduce
  //  The issue again. Then I could try fixing it
  // const [winner, setWinner] = React.useState(() => {
  //   return calculateWinner(squares)
  // })
  // const [nextValue, setNextValue] = React.useState(() => {
  //   return calculateNextValue(squares)
  // })
  // const [status, setStatus] = React.useState(() => {
  //   return calculateStatus(winner, squares, nextValue)
  // })

  const winner = calculateWinner(squares)
  const nextValue = calculateNextValue(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }

    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  console.log('%cWTF is winner?', 'color: lightGreen', winner)
  if (winner) {
    return `Winner: ${winner}`
  }

  const isEverySquareFilled = squares.every(Boolean)

  if (isEverySquareFilled) {
    return `Scratch: Cat's game`
  }

  return `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  console.log('%cCalculate Winner', 'color: orange')
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log('%cWe have a winner!', 'color: lightGreen')
      return squares[a]
    }
  }
  console.log('%cNo winner!', 'color: lightGreen')
  return null
}

function App() {
  return <Game />
}

export default App
