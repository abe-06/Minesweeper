import React from 'react';

const Cell = props => {
  let showCell = () => {
    if (props.data.isRevealed) {
      if (props.data.count===0 && !props.data.isMine) {
        return (
          <div className="cell open" onClick={() => props.reveal(props.data)}>
            {props.data.count}
          </div>
        )
      } else if (props.data.isMine) {
        return (
          <div className="cell open" onClick={() => props.reveal(props.data)}>
            m
          </div>
        )
      } else {
        return (
          <div className="cell open" onClick={() => props.reveal(props.data)}>
            {props.data.count}
          </div>
        )
      }
    } else {
      return (
        <div className="cell" onClick={() => props.reveal(props.data)}>

        </div>
      )
    }

  }
  return showCell();
};

export default Cell;
