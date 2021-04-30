// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from '../utils';

function Board() {
  const [steps, setSteps] = useLocalStorageState('squares', [Array(9).fill(null)]);
  const [index, setIndex] = useLocalStorageState('index', 0);

  const currentStep = steps[index];
  const nextValue = calculateNextValue(currentStep);
  const winner = calculateWinner(currentStep);
  const status = calculateStatus(winner, currentStep, nextValue);
  

  function selectSquare(square) {
    if(winner || currentStep[square]) {
      return;
    }
    const newHistory = steps.slice(0, index + 1);
    const nextStep = [...currentStep];
    nextStep[square] = nextValue;
    setSteps([...newHistory, nextStep]);
    setIndex(newHistory.length);
  }

  function restart() {
    setSteps([Array(9).fill(null)]);
    setIndex(0);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {currentStep[i]}
      </button>
    )
  }

  function goToStep(step) {
    setIndex(step);
  }

  function renderStep(stepNumber) {
    const isCurrentStep = stepNumber === index;
    return <div>
      {`${stepNumber + 1}. `}<button disabled={isCurrentStep} onClick={() => goToStep(stepNumber)}>
        Go to {stepNumber === 0? 'Game Start': `move # ${stepNumber}`} {isCurrentStep && ' ( current )'}
      </button>
    </div>
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div style={{display: 'flex'}}>
        <div>
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
        </div>
        <div>
          {steps.map((step, index) => renderStep(index))}
        </div>
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

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
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
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
