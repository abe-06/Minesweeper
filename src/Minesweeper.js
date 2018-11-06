import React, { Component } from 'react';
import Board from "./elements/Board";
import SideBar from "./elements/Sidebar";

class Minesweeper extends Component {
  constructor() {
    super()
    var a = 10;
    this.state = {
      gameStatus: "sleep",
      rows: 10,
      columns: 10,
      mines: a,
      flags: a,
      time: 0,
      revealedCells: 0,
    }
    this.defaultState = this.state;
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.gameStatus === "gameON") {
      this.checkWinCondition();
    }
  }
  checkWinCondition = () => {
    if (this.state.mines + this.state.revealedCells >= this.state.rows * this.state.columns) {
      this.setState({
        gameStatus: "win"
      }, alert("You won!"))
    }
  }

  componentWillMount() {
    this.intervals = [];
  }

  tick = () => {
    if(this.state.revealedCells > 0 && this.state.gameStatus==="gameON"){
      let time = this.state.time + 1
      this.setState({ time })
    }
  }

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  }

  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.defaultState), () => {
      this.intervals = [];
    });
  };

  endGame = () => {
    this.setState({
      gameStatus: "gameOver"
    });
  };

  flagTotal = total => {
    this.setState({
      flags: this.state.flags + total });
  };

  afterClick = () => {
    if (this.state.revealedCells===0 && this.state.gameStatus!== "gameON") {
      this.setState({
        gameStatus: "gameON",
      }, () => {
        this.setInterval(this.tick, 1000);
      })
    }
    this.setState(prevState => {
      return {
        revealedCells: prevState.revealedCells + 1
      };
    })
  }

  render() {
    return (
      <div>
        <h1>Minesweeper</h1>
        <div className="minesweeper">
          <div>
            <Board rows={this.state.rows} columns={this.state.columns} mines={this.state.mines} revealedCells={this.state.revealedCells} afterClick={this.afterClick} endGame={this.endGame} status={this.state.gameStatus} flagTotal={this.flagTotal}/>
          </div>
          <div>
          <SideBar time={this.state.time} flagsLeft={this.state.flags} reset={this.reset} status={this.state.gameStatus} />
          </div>
        </div>
      </div>
    );
  }
}

export default Minesweeper;
