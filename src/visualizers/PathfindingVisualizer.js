import React from 'react'
import Board from '../PathFinding/Board'

const PathfindingVisualizer = ({width, height, squareSize, selectedNodeType}) => { 
  return (
    <div>
        <Board 
            width={width}
            height={height}
            squareSize={squareSize}
            selectedNodeType={selectedNodeType}
        ></Board>
    </div>
    
  );
}

export default PathfindingVisualizer