import React, { Component } from 'react';
import Row from "../Row";

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.createBoard(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.revealedCells > nextProps.revealedCells ||
      this.props.columns !== nextProps.columns
    ) {
      this.setState({
        rows: this.createBoard(nextProps)
      });
    }
  }

  createBoard = props => {
    let board = [];
    for (let i = 0; i < props.rows; i++) {
      board.push([]);
      for (let j = 0; j < props.columns; j++) {
        board[i].push({
          x: j,
          y: i,
          count: 0,
          isRevealed: false,
          isMine: false,
          flagged: false,
        });
      }
    }
    for (let i = 0; i < props.mines; i++) {
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomColumns = Math.floor(Math.random() * props.columns);

      let cell = board[randomRow][randomColumns]

      if (cell.isMine) {
        i--;
      } else {
        cell.isMine = true;
      }
    }
    return board;
  };
  flag = cell => {
    if (this.props.gameStatus === "gameOver") {
      return;
    }
    let rows = this.state.rows;
    cell.flagged = !cell.flagged;
    this.setState({ rows });
    this.props.flagTotal(cell.flagged ? -1 : 1);
  };
  reveal = cell => {
    let reactCountMines = new Promise(resolve => {
      let mines = this.countMines(cell);
      resolve(mines);
    })
    reactCountMines.then(totalMines => {
      let rows = this.state.rows;
      let clickedCell = rows[cell.y][cell.x];
      if(clickedCell.isMine && this.props.revealedCells===0) {
        let newGame = this.createBoard(this.props);
        this.setState({
          rows: newGame,
        }, () => {
          this.reveal(cell);
        })} else {
          if(!cell.flagged && !clickedCell.isRevealed) {
            this.props.afterClick();
            clickedCell.isRevealed = true;
            clickedCell.count = totalMines;
            this.setState({ rows });
            if (!clickedCell.isMine && totalMines === 0) {
              this.suroundingCells(cell);
            }
            if (clickedCell.isMine && this.props.revealedCells !== 0) {
              this.props.endGame();
            }
          }
        }
      })
  };

  countMines = cell => {
    let nearMines = 0;
    for (let row = -1; row <= 1; row++) {
      for (let column = -1; column <= 1; column++){
        if (cell.y + row >= 0 && cell.x + column >= 0) {
          if (cell.y + row < this.state.rows.length && cell.x + column < this.state.rows[0].length) {
            if (this.state.rows[cell.y + row][cell.x + column].isMine && !(row === 0 && column === 0)) {
              nearMines++;
            }
          }
        }
      }
    }
    return nearMines;
  }

  suroundingCells = cell => {
    let rows = this.state.rows;
    for (let row = -1; row <= 1; row++) {
      for (let column = -1; column <= 1; column++){
        if (cell.y + row >= 0 && cell.x + column >= 0) {
          if (cell.y + row < rows.length && cell.x + column < rows[0].length) {
            if (!rows[cell.y + row][cell.x + column].isMine && !rows[cell.y + row][cell.x + column].isRevealed) {
              this.reveal(rows[cell.y + row][cell.x + column]);
            }
          }
        }
      }
    }
  }

  render() {
    let rows = this.state.rows.map((row, index) => {
      return (
        <Row cells={row} key={index} reveal={this.reveal} flag={this.flag}/>
      )
    });
    return (
      <div className="board">
        {rows}
      </div>
    )
  }
}
