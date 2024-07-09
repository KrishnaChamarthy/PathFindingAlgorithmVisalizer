import React from 'react';
import Node from '../Node/Node';
import './Row.css';

const Row = ({ row, cols, onNodeClick, grid }) => {
    const nodes = [];
    for (let col = 0; col < cols; col++) {
        nodes.push(
            <Node
                key={col}
                row={row}
                col={col}
                onClick={onNodeClick}
                isWall={grid[row][col].isWall}
                isStart={grid[row][col].isStart}
                isEnd={grid[row][col].isEnd}
                isPath={grid[row][col].isPath}
            />
        );
    }
    return (
        <div className='row'>
            {nodes}
        </div>
    );
};

export default Row;
