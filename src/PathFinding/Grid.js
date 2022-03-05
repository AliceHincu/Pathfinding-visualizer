import React, { useState } from 'react'
import NodeNormal from './NodeNormal'

const Grid = ({grid, setGrid, selectedNodeType, handleMouseEnter}) => {
    const [isMousePressed, setIsMousePressed] = useState(false)

    const updateGridOneNode = (row, col, property) => {
        // 1. Make a shallow copy of the array
        let newGrid = [...grid.slice()];

        // 2. Make a shallow copy of the element you want to mutate
        let newNodeAux = {...newGrid[row][col]};

        // 3. Update the property you're interested in - the new vallue will be the opposite of the old one
        const newNode = {
            ...newNodeAux,
            [property]: !newNodeAux[property],
        };
        newNodeAux = newNode;

        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        newGrid[row][col] = newNodeAux;

        // 5. Set the state to our new copy
	    setGrid(newGrid);
    };

    return (
            grid.map( (row, rowIndex) => {
                return(
                    row.map( (node, nodeIndex) => {
                        let newKey = nodeIndex*(rowIndex+1)
                        if(!(node.isStart || node.isFinish)){
                            return(
                                    <NodeNormal 
                                        key={newKey}
                                        selectedNodeType={selectedNodeType}
                                        defaultValue = {node.isWall?'wall':'unvisited'}
                                        isMousePressed={isMousePressed}
                                        setIsMousePressed={setIsMousePressed}
                                        onMouseEnterCallback={() => handleMouseEnter(node.row, node.col)}
                                        updateGridOneNode={(property) => updateGridOneNode(node.row, node.col, property)}
                                    ></NodeNormal>
                            )
                        } else return null
                    })
                )
            })
    )
}

export default Grid