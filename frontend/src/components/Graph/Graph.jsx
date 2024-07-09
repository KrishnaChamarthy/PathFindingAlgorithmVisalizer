import React, { useState, useEffect } from 'react';
import './Graph.css';
import Row from '../Row/Row';
import { dijkstra, getNodesInShortestPathOrder } from '../../algorithms/Dijkstras';
import { aStar, getNodesInShortestPathOrderAStar } from '../../algorithms/astar';
import { bfs, getNodesInShortestPathOrderBFS } from '../../algorithms/bjs';
import {dfs, getNodesInShortestPathOrderDFS} from "../../algorithms/dfs";
import { gbfs, getNodesInShortestPathOrderGBFS } from '../../algorithms/gbfs';

const Graph = ({ cols, rows, setIsStarted, isStarted, speed, algo }) => {
    const [startNode, setStartNode] = useState({ row: 16, col: 25 });
    const [endNode, setEndNode] = useState({ row: 16, col: 50 });
    const [isMovingNode, setIsMovingNode] = useState(null); 

    const timing = speed === "Fast" ? 5 : speed === "Medium" ? 10 : 15;

    const createNode = (row, col) => {
        return {
            row,
            col,
            isWall: false,
            isStart: row === startNode.row && col === startNode.col,
            isEnd: row === endNode.row && col === endNode.col,
            isPath: false,
            isVisited: false,
            distance: Infinity,
            previousNode: null,
        };
    };

    const createGrid = () => {
        const grid = [];
        for (let row = 0; row < rows; row++) {
            const currentRow = [];
            for (let col = 0; col < cols; col++) {
                currentRow.push(createNode(row, col));
            }
            grid.push(currentRow);
        }
        return grid;
    };

    const [grid, setGrid] = useState(createGrid());

    useEffect(() => {
        setGrid(createGrid());
    }, [startNode, endNode]);

    const handleNodeClick = (row, col) => {
        if (isMovingNode === 'start') {
            setStartNode({ row, col });
            setIsMovingNode(null);
        } else if (isMovingNode === 'end') {
            setEndNode({ row, col });
            setIsMovingNode(null);
        } else {
            const newGrid = grid.map(row => row.slice());
            const node = newGrid[row][col];
            if (node.isStart) {
                setIsMovingNode('start');
            } else if (node.isEnd) {
                setIsMovingNode('end');
            } else {
                node.isWall = !node.isWall;
                setGrid(newGrid);
            }
        }
    };
    
    const visualizeDijkstra = () => {
        const newGrid = grid.slice();
        const startNodeRef = newGrid[startNode.row][startNode.col];
        const endNodeRef = newGrid[endNode.row][endNode.col];
        const visitedNodes = dijkstra(newGrid, startNodeRef, endNodeRef);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNodeRef);
        animateDijkstra(visitedNodes, nodesInShortestPathOrder);
    };


    const animateDijkstra = (visitedNodes, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, timing * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node visited ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`;
            }, timing * i);
        }
    };

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node path ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`;
            }, 50 * i);
        }
    };

    const visualizeAStar = () => {
        const newGrid = grid.slice();
        const startNodeRef = newGrid[startNode.row][startNode.col];
        const endNodeRef = newGrid[endNode.row][endNode.col];
        const visitedNodes = aStar(newGrid, startNodeRef, endNodeRef);
        const nodesInShortestPathOrder = getNodesInShortestPathOrderAStar(endNodeRef);
        animateAStar(visitedNodes, nodesInShortestPathOrder);
    };

    const animateAStar = (visitedNodes, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animateShortestPathAStar(nodesInShortestPathOrder);
                }, timing * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node visited ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`;
            }, timing * i);
        }
    };

    const animateShortestPathAStar = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node path ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`;
            }, 50 * i);
        }
    };

    const visualizeBFS = () => {
        const newGrid = grid.slice();
        const startNodeRef = newGrid[startNode.row][startNode.col];
        const endNodeRef = newGrid[endNode.row][endNode.col];
        const visitedNodes = bfs(newGrid, startNodeRef, endNodeRef);
        const nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(endNodeRef);
        animateBFS(visitedNodes, nodesInShortestPathOrder);
    };

    const animateBFS = (visitedNodes, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animateShortestPathBFS(nodesInShortestPathOrder);
                }, timing * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node visited ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`;
            }, timing * i);
        }
    };

    const animateShortestPathBFS = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node path ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`;
            }, 50 * i);
        }
    };

    const visualizeDFS = () => {
        const newGrid = grid.slice();
        const startNodeRef = newGrid[startNode.row][startNode.col];
        const endNodeRef = newGrid[endNode.row][endNode.col];
        const visitedNodes = dfs(newGrid, startNodeRef, endNodeRef);
        const nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(endNodeRef);
        animateDFS(visitedNodes, nodesInShortestPathOrder);
    };

    const animateDFS = (visitedNodes, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animateShortestPathDFS(nodesInShortestPathOrder);
                }, timing * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node visited ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`;
            }, timing * i);
        }
    };

    const animateShortestPathDFS = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node path ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`;
            }, 50 * i);
        }
    };

    const visualizeGBFS = () => {
        const newGrid = grid.slice();
        const startNodeRef = newGrid[startNode.row][startNode.col];
        const endNodeRef = newGrid[endNode.row][endNode.col];
        const visitedNodes = gbfs(newGrid, startNodeRef, endNodeRef);
        const nodesInShortestPathOrder = getNodesInShortestPathOrderGBFS(endNodeRef);
        animateGBFS(visitedNodes, nodesInShortestPathOrder);
    };

    const animateGBFS = (visitedNodes, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animateShortestPathGBFS(nodesInShortestPathOrder);
                }, timing * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node visited ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`;
            }, timing * i);
        }
    };

    const animateShortestPathGBFS = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node path ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''}`;
            }, 50 * i);
        }
    };


    useEffect(() => {
        if (isStarted){
            if (algo === "Dijkstra's"){
                visualizeDijkstra();
            }
            else if (algo === "A star"){
                visualizeAStar();
            }
            else if (algo === "Breadth-First Search"){
                visualizeBFS();
            }
            else if (algo === "Depth-First Search"){
                visualizeDFS();
            }
            else{
                visualizeGBFS();
            }
            setIsStarted(false);
        }
    }, [isStarted]);

    return (
        <div className='graph'>
            {grid.map((row, rowIdx) => (
                <Row
                    key={rowIdx}
                    row={rowIdx}
                    cols={cols}
                    onNodeClick={handleNodeClick}
                    grid={grid}
                />
            ))}
        </div>
    );
};

export default Graph;
