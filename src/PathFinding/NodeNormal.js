import './Node.css';
import { useState } from 'react';

const NodeNormal = ({selectedNodeType, isMousePressed, defaultValue, setIsMousePressed, onMouseEnterCallback, updateGridOneNode}) => {

    const [cssTag, setCssTag] = useState(defaultValue)  

    /**
     * make walls/weights when you press down. 
     */
    const handleMouseDown = () => {
        setIsMousePressed(true)
        // if(selectedNodeType==='wall') -> update('isWall') else -> update('isWieght')
        updateGridOneNode('isWall')
        setCssTag(selectedNodeType)
        

        document.addEventListener(
            "mouseup",
            () => {
                setIsMousePressed(false)
            },
            { once: true }
        );
    };

    /**
     * make walls/weights if you press down when you enter. 
     */
    const handleMouseEnter = () => {
        onMouseEnterCallback()
        if(isMousePressed){
                
            updateGridOneNode('isWall')
            setCssTag(selectedNodeType)
        }
            
        
    }

    return (
        <div 
            className={`node-${cssTag}`} 
            onMouseEnter={handleMouseEnter}
            onMouseDown={() => handleMouseDown()}
        ></div>
    );
}

export default NodeNormal