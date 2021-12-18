import { Graph } from "../structures/Graph";
import { Cell } from "../grid/Cell";
import { Queue } from "../structures/Queue";
import { GridGUI } from "../gui/GridGUI";
import { Stack } from "../structures/Stack";

export class Algorithm {

    static BFS(graph: Graph, startingCell: Cell, gridGUI: GridGUI): void {
        const visited: Map<Cell, boolean> = new Map<Cell, boolean>();

        const queue: Queue = new Queue();
        queue.enqueue(startingCell);

        let finish = false;

        while (!finish && !queue.isEmpty()) {
            // Check
            const currentCell: Cell = queue.dequeue();

            visited.set(currentCell, true);
            gridGUI.addToAnimQueue(currentCell);

            if (currentCell.data.isDestination) {
                finish = true;
            }

            // Expand and add to queue
            for (let i = 0; i < graph.elements.get(currentCell)!.length; i++) {
                const cell: Cell = graph.elements.get(currentCell)![i];
                if (!visited.get(cell)) {
                    queue.enqueue(cell);
                    visited.set(cell, true);
                }
            }
        }
    }

    private DFSUtil(): void {

    }

    static DFS(graph: Graph, startingCell: Cell, gridGUI: GridGUI): void {
        const visited: Map<Cell, boolean> = new Map<Cell, boolean>();

        const stack: Stack = new Stack();
        stack.push(startingCell);

        let finish = false;

        while (!finish && !stack.isEmpty()) {
            // Check
            const currentCell: Cell = stack.pop();

            visited.set(currentCell, true);
            gridGUI.addToAnimQueue(currentCell);

            if (currentCell.data.isDestination) {
                finish = true;
            }

            // Expand and add to queue
            for (let i = 0; i < graph.elements.get(currentCell)!.length; i++) {
                const cell: Cell = graph.elements.get(currentCell)![i];
                if (!visited.get(cell)) {
                    stack.push(cell);
                    visited.set(cell, true);
                }
            }
        }
    }
}