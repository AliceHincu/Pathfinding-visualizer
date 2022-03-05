import './Node.css';

const NodeDraggable = ({size, type, row, col, onMouseDown, isGrabbed}) => {

  const extraClassName = type

  return (
    <div 
      className={`node ${extraClassName}`} 
      style={{width: size, height: size, gridRow: row, gridColumn: col, cursor:`${isGrabbed?'grabbing':'grab'}`}}
      onMouseDown={() => onMouseDown()}
    ></div>
  );
}

export default NodeDraggable