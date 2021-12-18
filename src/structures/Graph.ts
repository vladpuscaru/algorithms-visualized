import { Cell } from "../grid/Cell";


export class Graph {

    elements: Map<Cell, Array<Cell>>;

    private constructor() {
        this.elements = new Map<Cell, Array<Cell>>();
    }

    static constructFromMatrix(cells: Array<Array<Cell>>, allowedActions: Array<Array<number>>): Graph {
        const graph: Graph = new Graph();
        /**
         * Allowed actions
         * 0, 1   GO UP
         * 0, -1  GO DOWN
         * 1, 0   GO RIGHT
         * -1, 0  GO LEFT
         * 1, 1   GO UPPER RIGHT
         * -1, 1  GO UPPER LEFT
         * 1, -1  GO LOWER RIGHT
         * -1, -1 GO LOWER LEFT
         */
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                const cell: Cell = cells[i][j];
                // Initialize adjacency list for current node
                graph.elements.set(cell, []);

                for (let k = 0; k < allowedActions.length; k++) {
                    const action: number[] = allowedActions[k];
                    // Add adjacent cell to current node if it exists
                    const row = i + action[0];
                    const col = j + action[1];
                    const adjCell: Cell | undefined = row >= 0 && row < cells.length && col >= 0 && col < cells[i].length ? cells[row][col] : undefined;
                    if (adjCell && adjCell.data.color === cell.data.color) {
                        graph.elements.get(cell)!.push(adjCell);
                    }
                }
            }
        }

        return graph;
    }
}