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

// Things to do:
// 1. Check why displayed message doesnt change from O back to X
// 2. Dont allow user to click if its already X or O

// Function Component
function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // squares: Array(9).fill(null),
      squares: Array.from({length: 10}, (_, i) => i + 1),
      nextMoveIsX: true,
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    // squares[i] = 'X'; 
    squares[i] = this.state.nextMoveIsX ? "X" : "O";
    this.setState({
      squares: squares, 
      nextMoveIsX: !this.state.nextMoveIsX,
    });
  }

  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const status = 'Next player: ' + (this.nextMoveIsX ? "X" : "O");

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div> 
          <ol>{/* TODO */}</ol>
        </div>
        {/* <div className="shopping-list">
          <ShoppingList name="person A" />
        </div> */}
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
