import { useState } from 'react';


//top level game component (functional component)
export default function Game() {

  //track player turn
  const [xIsNext, setXIsNext] = useState(true);

  //stores the history of moves.
  const [history, setHistory] = useState([Array(9).fill(null)]);

  //track current move
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  //handle each move
  function handleMove(nextSquares) {
    //update history, current move and next move
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  //go back to a different move in the game history 
  function accessPrevious(nextMove) {
    //update next move and player depending on move accessed. 
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  //list the moves that can be accessed 
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Jump to move #' + move;
    } else {
      description = 'Jump back to start';
    }
    return (
      <li key={move}>
        <button onClick={() => accessPrevious(move)}>{description}</button>
      </li>
    );
  });

  //return the game component
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handleMove} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//board component for the tic tac toe board. 
function Board({ xIsNext, squares, onPlay }) {

  //helper function to handle updates for user clicks
  function clickHelper(i) {
    if (squares[i]) {
      return;
    }
    if (calculateWinner(squares)) {
      return;
    }
    //make copy of squares array. used for implementing the history functionlity 
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  //if winner, display message
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //get board component. 
  return (
    <>
      <div className="status">{status}</div>
      <div className="grid-row">
        <Square value={squares[0]} onSquareClick={() => clickHelper(0)} />
        <Square value={squares[1]} onSquareClick={() => clickHelper(1)} />
        <Square value={squares[2]} onSquareClick={() => clickHelper(2)} />
      </div>
      <div className="grid-row">
        <Square value={squares[3]} onSquareClick={() => clickHelper(3)} />
        <Square value={squares[4]} onSquareClick={() => clickHelper(4)} />
        <Square value={squares[5]} onSquareClick={() => clickHelper(5)} />
      </div>
      <div className="grid-row">
        <Square value={squares[6]} onSquareClick={() => clickHelper(6)} />
        <Square value={squares[7]} onSquareClick={() => clickHelper(7)} />
        <Square value={squares[8]} onSquareClick={() => clickHelper(8)} />
      </div>
    </>
  );
}

//logic to calculate the winner. 
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
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


//square component. 
function Square({ value, onSquareClick }) {
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}

