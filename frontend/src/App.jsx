import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import CurrState from './components/CurrState/CurrState';
import Graph from './components/Graph/Graph';

const App = () => {

  const [algo, setAlgo] = useState("Dijkstra's");
  const [speed, setSpeed] = useState("Fast");

  const [isStarted, setIsStarted] = useState(false);

  const algorithms = ["Depth-First Search", "Breadth-First Search", "Dijkstra's", "A star", "Greedy Best-Fit Search"];
  const speeds = ["Slow", "Medium", "Fast"];
  const cols = 75;
  const rows = 32;

  return (
    <div>
      <Navbar algorithms={algorithms} setAlgo={setAlgo} setSpeed={setSpeed} speeds={speeds} isStarted={isStarted} setIsStarted={setIsStarted}/>
      <CurrState algo={algo} speed={speed}/>
      <Graph cols={cols} rows={rows} isStarted={isStarted} setIsStarted={setIsStarted} speed={speed} algo={algo}/>
    </div>
  )
}

export default App
