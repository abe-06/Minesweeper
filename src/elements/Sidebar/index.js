import React from 'react'

const SideBar = props => {
  let minutes = Math.floor(props.time / 60);
  let seconds = props.time - minutes * 60 || 0;
  let showTime = seconds < 10 ? `0${seconds}` : seconds;
  let time = `${minutes}:${showTime}`
  let status = props.status === "gameON" || props.status === "sleep" ? ("Reset") : ("New Game");
  return (
    <div className="side-bar">
      <div className="timer">
        Time: {time}
      </div>
      <div className="flags-left">
        Flags: {props.flagsLeft}
      </div>
      <div className="btn">
        <button className="reset" onClick={props.reset}>{status}</button>
      </div>
    </div>
  );
};

export default SideBar;
