const calculateDistance = (nodeA, nodeB) => {
    const dx = Math.abs(nodeA.col - nodeB.col);
    const dy = Math.abs(nodeA.row - nodeB.row);
    return Math.sqrt(dx * dx + dy * dy);
};

export const aStar = (grid, startNode, endNode) => {
    const visitedNodesInOrder = [];
    const unvisitedNodes = [];

    startNode.distance = 0;
    startNode.heuristicDistance = calculateDistance(startNode, endNode);
    startNode.totalDistance = startNode.heuristicDistance;

    unvisitedNodes.push(startNode);

    while (unvisitedNodes.length) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === endNode) return visitedNodesInOrder;

        updateNeighborsAStar(closestNode, endNode, grid, unvisitedNodes);
    }

    return visitedNodesInOrder;
};

const updateNeighborsAStar = (node, endNode, grid, unvisitedNodes) => {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        const distance = node.distance + 1;
        if (distance < neighbor.distance) {
            neighbor.distance = distance;
            neighbor.heuristicDistance = calculateDistance(neighbor, endNode);
            neighbor.totalDistance = neighbor.distance + neighbor.heuristicDistance;
            neighbor.previousNode = node;
            unvisitedNodes.push(neighbor);
        }
    }
};

const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
};

export const getNodesInShortestPathOrderAStar = (endNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
};
