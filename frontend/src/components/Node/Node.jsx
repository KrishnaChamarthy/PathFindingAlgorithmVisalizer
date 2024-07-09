import React from 'react';
import './Node.css';

const Node = ({ row, col, onClick, isWall, isStart, isEnd, isPath, isVisited }) => {
    const handleClick = () => {
        onClick(row, col);
    };

    let extraClass = '';
    if (isStart) extraClass = 'start';
    else if (isEnd) extraClass = 'end';
    else if (isVisited) extraClass = 'visited';
    else if (isPath) extraClass = 'path';

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClass} ${isWall ? 'wall' : ''}`}
            onClick={handleClick}
        ></div>
    );
};

export default Node;
