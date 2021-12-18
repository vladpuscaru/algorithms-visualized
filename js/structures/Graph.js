define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Graph = void 0;
    class Graph {
        constructor() {
            this.elements = new Map();
        }
        static constructFromMatrix(cells, allowedActions) {
            const graph = new Graph();
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
                    const cell = cells[i][j];
                    // Initialize adjacency list for current node
                    graph.elements.set(cell, []);
                    for (let k = 0; k < allowedActions.length; k++) {
                        const action = allowedActions[k];
                        // Add adjacent cell to current node if it exists
                        const row = i + action[0];
                        const col = j + action[1];
                        const adjCell = row >= 0 && row < cells.length && col >= 0 && col < cells[i].length ? cells[row][col] : undefined;
                        if (adjCell && adjCell.data.color === cell.data.color) {
                            graph.elements.get(cell).push(adjCell);
                        }
                    }
                }
            }
            return graph;
        }
    }
    exports.Graph = Graph;
});
//# sourceMappingURL=Graph.js.map