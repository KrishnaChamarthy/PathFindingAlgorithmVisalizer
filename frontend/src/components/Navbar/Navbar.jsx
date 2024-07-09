import React from "react";
import "./Navbar.css";
import Dropdown from "../Dropdown/Dropdown";

const Navbar = ({algorithms, setAlgo, setSpeed, speeds, isStarted, setIsStarted}) => {

  const handleClick = () => {
    if (!isStarted){
      setIsStarted(true);
    }
  }

  return (
    <div className="navbar">
      <div className="title">
        <p>Pathfinding Algorithm Visualizer</p>
      </div>
      <div className="divider"></div>
      <div className="menu">
        <div className="start">
            <button onClick={handleClick}>Start</button>
        </div>
        <div className="algorithms">
            <Dropdown ele={algorithms} title={"Algorithms"} func={setAlgo}/>
        </div>
        <div className="speed">
          <Dropdown ele={speeds} title={"Speed"} func={setSpeed}/>
        </div>
        <div className="reset">
            <button onClick={() => window.location.reload(false)}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
