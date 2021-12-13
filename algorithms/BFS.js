
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
    visited[startingNode] = true;
    queue.enqueue(startingNode);

    while (!queue.isEmpty()) {
        // Deque a vertex from queue
        const vertex = queue.dequeue();
        console.log(vertex);

        // Get all adjacent vertices of the dequed vertex
        // If adjacent has not been visited,
        // then mark it visited and enqueue it
        for (let i = 0; i < graph.adjList[vertex].length; i++) {
            if (!visited[graph.adjList[vertex][i]]) {
                visited[graph.adjList[vertex][i]] = true;
                queue.enqueue(graph.adjList[vertex][i]);
            }
        }
    }
}