import "./Board.css"
import { useState } from "react";
import NodeDraggable from "./NodeDraggable";
import Grid from "./Grid";

const Board = ({width, height, squareSize, selectedNodeType}) => {
    /** 3*squareSize = total margin of left + right  */
    const rowCount = Math.floor((height-3*squareSize)/squareSize);
    const columnCount = Math.floor((width-3*squareSize)/squareSize);

    /** coords of start and finish initial nodes */
    const START_NODE_ROW = Math.floor(rowCount/2);
    const START_NODE_COL = Math.floor(columnCount/4);
    const FINISH_NODE_ROW = Math.floor(rowCount/2);
    const FINISH_NODE_COL = Math.floor(3*columnCount/4);


    const [isHeld, setIsHeld] = useState(false) // if the mouse is pressed
    const [nodeDraggedType, setNodeDraggedType] = useState("node-start") // what type of node is dragged
    const [startNodeRow, setStartNodeRow] = useState(START_NODE_ROW); // coords for start and finish node
    const [startNodeCol, setStartNodeCol] = useState(START_NODE_COL);
    const [finishNodeRow, setFinishNodeRow] = useState(FINISH_NODE_ROW);
    const [finishNodeCol, setFinishNodeCol] = useState(FINISH_NODE_COL);

    /** ============== Functions for grid and nodes ============== */
    
    /**
     * 
     * @param {number} row - the row where the node is in the grid
     * @param {number} col - the col where the node is in the grid
     * @returns an object with the properties of the created node
     */
    const createNodeData = (row, col) => {
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            isDraggable: (row === START_NODE_ROW && col === START_NODE_COL) || (row === FINISH_NODE_ROW && col === FINISH_NODE_COL),
            isWall: false,
        }
    };

    /**
     * 
     * @returns a matrix which represents the grid with nodes
     */
    const getInitialGrid = () => {
        const grid=[];
        for(let row = 0; row < rowCount; row++){
            const currentRow = [];
            for(let col = 0; col < columnCount; col++){
                currentRow.push(createNodeData(row, col))
            }
            grid.push(currentRow)
        }
        return grid;
    };

    const [grid, setGrid] = useState(getInitialGrid());

    /**
     * Use this function when:
     * - you "drag" the start node/the finish node
     * @param {*} property - can be "isStart", "isFinish" and so on
     */
    
    const updateGrid = (oldRow, oldCol, newRow, newCol, property) => {
        // 1. Make a shallow copy of the array
        let newGrid = [...grid.slice()];

        // 2. Make a shallow copy of the element you want to mutate
        let oldNodeAux = {...newGrid[oldRow][oldCol]};
        let newNodeAux = {...newGrid[newRow][newCol]};

        // 3. Update the property you're interested in - the new vallue will be the opposite of the old one
        const oldNode = {
            ...oldNodeAux,
            [property]: !oldNodeAux[property],
          };
	    oldNodeAux = oldNode;

        const newNode = {
            ...newNodeAux,
            [property]: !newNodeAux[property],
        };
        newNodeAux = newNode;

        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
	    newGrid[oldRow][oldCol] = oldNodeAux;
        newGrid[newRow][newCol] = newNodeAux;

        // 5. Set the state to our new copy
	    setGrid(newGrid);
    };


    /** ============== Mouse Events ==============*/ 
    const handleMouseDown = (type) => {
        setIsHeld(true)
        setNodeDraggedType(type)

        document.addEventListener(
            "mouseup",
            () => {
              setIsHeld(false)
            },
            { once: true }
        );
    };

    /**
     * If the button is pressed from the mouse, it means that:
     * - a node is dragged: we copy the node's coords, we update them with the new ones (where we entered), 
     * the we update the grid so the switch between nodes can happen 
     * -(+wall not implemented yet).
     * @param {*} row - the row coord of the square where the dragged row entered, 
     * @param {*} col 
     */
    const handleMouseEnter = (row, col) => {
        if(isHeld){
            if(nodeDraggedType === "node-start"){
                let old_row = startNodeRow
                let old_col = startNodeCol
                setStartNodeRow(row)
                setStartNodeCol(col)
                updateGrid(old_row, old_col, row, col, "isStart")
            }
            if(nodeDraggedType === "node-finish"){
                let old_row = finishNodeRow
                let old_col = finishNodeCol
                setFinishNodeRow(row)
                setFinishNodeCol(col)
                updateGrid(old_row, old_col, row, col, "isFinish")
            }
            
        }
    };


    return(
        <div>

        <div className="wrapper" style={{gridTemplateColumns:`repeat(${columnCount}, ${squareSize}px)`, gridTemplateRows:`repeat(${rowCount}, ${squareSize}px)`}}>
            <Grid 
                grid={grid} 
                setGrid={setGrid}
                selectedNodeType={selectedNodeType}
                handleMouseEnter={(row, col) => handleMouseEnter(row, col)}
            ></Grid>

            <NodeDraggable size={squareSize} type="node-start" row={startNodeRow+1} col={startNodeCol+1}
                onMouseDown={() => handleMouseDown("node-start")}
                isGrabbed={isHeld&&nodeDraggedType==="node-start"?true:false}
            ></NodeDraggable>
            <NodeDraggable size={squareSize} type="node-finish" row={finishNodeRow+1} col={finishNodeCol+1}
                onMouseDown={() => handleMouseDown("node-finish")}
                isGrabbed={isHeld&&nodeDraggedType==="node-finish"?true:false}
            ></NodeDraggable>
        </div>

        </div>
    )
}

export default Board;