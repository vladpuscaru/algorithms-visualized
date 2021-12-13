/*
 * Directed Graph using adjacency list representation
 */
class Graph {
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.adjList = {};
        for (let i = 0; i < this.noOfVertices; i++) {
            this.adjList[i] = [];
        }
    }

    static constructFromVerticesList = (vertices) => {
        const graph = new Graph();
        graph.noOfVertices = vertices.length;
        graph.adjList = {};
        for (let i = 0; i < graph.noOfVertices; i++) {
            graph.adjList[vertices[i]] = [];
        }
        return graph;
    }

    addEdge = (sourceV, destV) => {
        this.adjList[sourceV].push(destV);
    }
}