export const gbfs = (grid, startNode, endNode) => {
    const visitedNodesInOrder = [];
    const priorityQueue = [];

    startNode.isVisited = true;
    priorityQueue.push(startNode);

    while (priorityQueue.length) {
        priorityQueue.sort((nodeA, nodeB) => nodeA.heuristicDistance - nodeB.heuristicDistance);
        const closestNode = priorityQueue.shift();
        visitedNodesInOrder.push(closestNode);

        if (closestNode === endNode) return visitedNodesInOrder;

        const neighbors = getNeighbors(closestNode, grid);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                neighbor.isVisited = true;
                neighbor.previousNode = closestNode;
                priorityQueue.push(neighbor);
            }
        }
    }

    return visitedNodesInOrder;
};

const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
};

export const getNodesInShortestPathOrderGBFS = (endNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
};
