/*
 * graph is an instance of Graph.js
 */
const BFS = (graph, startingNode) => {
    // Mark all vertices as not visited
    const visited = [];
    for (let i = 0; i < graph.noOfVertices; i++) {
        visited.push(false);
    }

    const queue = new Queue();

    // Mark the current node as visited and enqueue it
    visited[startingNode.index] = true;
    queue.enqueue(startingNode);

    let stop = false;
    while (!stop && !queue.isEmpty()) {
        // Deque a vertex from queue
        const cell = queue.dequeue();
        gridGUI.addToAnimQueue(cell.index);
        if (cell.isDestination) {
            // Do something to return solution ?
            stop = true;
        }

        // Get all adjacent vertices of the dequed vertex
        // If adjacent has not been visited,
        // then mark it visited and enqueue it
        for (let i = 0; i < graph.adjList[cell.index].length; i++) {
            if (!visited[graph.adjList[cell.index][i].index]) {
                visited[graph.adjList[cell.index][i].index] = true;
                queue.enqueue(graph.adjList[cell.index][i]);
            }
        }
    }
}