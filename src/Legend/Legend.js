import React, { useState } from 'react'
import './Legend.css'

const Legend = ({squareSize, height, setSelectedNodeType}) => {
    return (
        <div>
            <div className='legend-container' style={{height:`${height}px`}}>
                <div className='column-container'>
                    <button className='unvisited-node' style={{width:`${squareSize}px`, height:`${squareSize}px`}}
                        onClick={() => setSelectedNodeType('unvisited')}
                    ></button>
                    <p>Unvisited Node</p>
                </div>
                <div className='column-container'>
                    <div className='start-node' style={{width:`${squareSize}px`, height:`${squareSize}px`}}></div>
                    <p>Start Node</p>
                </div>
                <div className='column-container'>
                    <div className='target-node' style={{width:`${squareSize}px`, height:`${squareSize}px`}}></div>
                    <p>Target Node</p>
                </div>
                <div className='column-container'>
                    <button className='wall-node' style={{width:`${squareSize}px`, height:`${squareSize}px`}}
                        onClick={() => setSelectedNodeType('wall')}
                    ></button>
                    <p>Wall</p>
                </div>
                
            </div>
        </div>
  )
}

export default Legend