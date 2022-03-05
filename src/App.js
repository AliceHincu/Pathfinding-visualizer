import { useState } from 'react';
import './App.css';
import Legend from './Legend/Legend';
import Nav from './NavigationBar/Nav';
import PathfindingVisualizer from './visualizers/PathfindingVisualizer';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
const windowDimensions = getWindowDimensions();
const SQUARE_SIZE = 25;
const LEGEND_HEIGHT = 75;

function App() {
  const [selectedNodeType, setSelectedNodeType] = useState('unvisited')

  return (
    <div className="App">
      <Nav></Nav>
      <Legend squareSize={SQUARE_SIZE+5} height={LEGEND_HEIGHT} setSelectedNodeType={setSelectedNodeType}></Legend>
      <PathfindingVisualizer 
        width={windowDimensions.width} 
        height={windowDimensions.height} 
        squareSize={SQUARE_SIZE}
        selectedNodeType={selectedNodeType}
      ></PathfindingVisualizer>
    </div>
  );
}

export default App;
