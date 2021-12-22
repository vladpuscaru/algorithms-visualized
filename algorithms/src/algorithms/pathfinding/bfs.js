import { Queue } from "../../structures/Queue";

/**
 * Breadth-First-Search pathfinding algorithm
 * @param graph - The Graph structure
 * @param start - The reference to the start node
 * @param end   - The reference to the end node
 *
 * @returns the tuple of [open, closed, path]
 * @return open   - array of arrays with opened nodes in the order of opening
 * @return closed - array with closed nodes in the order of closing
 * @return path   - array of nodes that represent the path from source to destination
 */
export const bfs = (graph, start, end) => {
    const open   = new Queue();
    const openR  = [];
    const closed = new Map();
    const path   = [];

    open.enqueue(start);
    closed.set(start, true);

    let finished = false;
    while (!finished && !open.isEmpty()) {
        const node = open.dequeue();

        if (node === end) {
            finished = true;
            continue;
        }

        const openRound = [];
        node.adjacents.forEach(adj => {
           if (!closed.get(adj)) {
               closed.set(adj, true);
               open.enqueue(adj);
               openRound.push(adj);
               adj.parent = node;
           }
        });
        openR.push(openRound);
    }

    // Compute path if exists
    if (finished) {
        let currentNode = end;

        while (currentNode) {
            path.push(currentNode);
            currentNode = currentNode.parent;
        }
    }

    return { open: openR, closed: Array.from(closed.keys()), path };
}












