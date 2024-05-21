import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ShoppingList from './shoppinglist';

// class Square extends React.Component {
//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={() => {this.props.onClick()}}>
//         {this.props.value}
//       </button>
//     );
//   }
// }


// Function Component
function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  

  renderSquare(i) {
    return <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    const boardSize = 3;
    let squares = [];

    // Using loops instead of hardcoding
    for (let row = 0; row<boardSize; row++) {
      let rowSquares = [];
      for (let col = 0; col<boardSize; col++) {
        rowSquares.push(this.renderSquare(row*boardSize+col));
      }
      squares.push(<div key={row} className='board-row'>{rowSquares}</div>);
    }

    return (
      <div>
      {/* <div className="status">{status}</div> */}
      {squares}
      </div>
      // <div>
      //   {/* <div className="status">{status}</div> */}
      //   <div className="board-row">
      //     {this.renderSquare(0)}
      //     {this.renderSquare(1)}
      //     {this.renderSquare(2)}
      //   </div>
      //   <div className="board-row">
      //     {this.renderSquare(3)}
      //     {this.renderSquare(4)}
      //     {this.renderSquare(5)}
      //   </div>
      //   <div className="board-row">
      //     {this.renderSquare(6)}
      //     {this.renderSquare(7)}
      //     {this.renderSquare(8)}
      //   </div>
      // </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          // squares: Array.from({length: 10}, (_, i) => i + 1),
          squares: Array(9).fill(null),
          affectedTile: null,
        }
      ],
      stepNumber: 0,
      nextMoveIsX: true,
      isAscending: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // console.log(calculateWinner(squares));
    console.log(squares);
    if (calculateWinner(squares) || squares[i]==='X' || squares[i]==='O') {
      console.log(calculateWinner(squares));
      console.log("cant press")
      return;
    }
    // squares[i] = 'X'; 
    squares[i] = this.state.nextMoveIsX ? "X" : "O";
    this.setState({
      history: history.concat(
        [{
          squares: squares,
          affectedTile: [i%3 + 1, Math.floor(i/3) + 1],
        }]
      ),
      stepNumber: history.length,
      nextMoveIsX: !this.state.nextMoveIsX,
    });
  }

  changeListOrder() {
    this.setState(
      {
        isAscending: !this.state.isAscending
      }
    );
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      nextMoveIsX: (step%2) === 0,
    });
  }

  render() {
    const history = this.state.history.slice(0, this.state.stepNumber+1); // Ensure that 
    // const history = this.state.history;
    var current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    var moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      const affectedTile = step.affectedTile ? "Affected tile (col,row): " + step.affectedTile : "";
      if (move === history.length-1) {
        return(
          
          <li key={move} className=''>
            <strong>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
            <div>{affectedTile}</div>
            </strong>
          </li>
        )
      } else {
        return(
        
          <li key={move} className=''>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
            <div>{affectedTile}</div>
          </li>
        )
      }
      
    })    
    
    if (!this.state.isAscending) {
      moves = moves.reverse();
    }

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (this.state.stepNumber === 9) {
      status = "Its a draw."
    } else {
      status = "Next player: " + (this.state.nextMoveIsX ? "X" : "O");
    }

    let listOrder;
    if (this.state.isAscending) {
      listOrder = "Ascending move order";
    } else {
      listOrder = "Descending move order";
    }
    return (
      <div className="game">
        
        <div className="game-board">
          <Board 
            squares={markWinningCombo(current.squares.slice())}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div> 
          <button onClick={() => this.changeListOrder()}>{listOrder}</button>
          <ol>{moves}</ol>
        </div>
        {/* <div className="shopping-list">
          <ShoppingList name="person A" />
        </div> */}
      </div>
    );
  }
}

function markWinningCombo(squares) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a,b,c] = winningCombos[i];
    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      squares[a] = <mark>{squares[a]}</mark>
      squares[b] = <mark>{squares[b]}</mark>
      squares[c] = <mark>{squares[c]}</mark>
    }
  }
  return squares;
}

function calculateWinner(squares) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a,b,c] = winningCombos[i];
    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
    
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
