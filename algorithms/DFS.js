let stopDFS = false;

const DFSUtil = (graph, cell, visited) => {
    if (!stopDFS) {
        visited[cell.index] = true;
        gridGUI.addToAnimQueue(cell.index);

        if (cell.isDestination) {
            // Do something to return solution ?
            stopDFS = true;
        }

        for (let i = 0; i < graph.adjList[cell.index].length; i++) {
            if (!visited[graph.adjList[cell.index][i].index]) {
                visited[graph.adjList[cell.index][i].index] = true;
                DFSUtil(graph, graph.adjList[cell.index][i], visited);
            }
        }
    }
}

const DFS = (graph, startingCell) => {
    stopDFS = false;
    const visited = [];
    for (let i = 0; i < graph.noOfVertices; i++) {
        visited.push(false);
    }

    DFSUtil(graph, startingCell, visited);
}