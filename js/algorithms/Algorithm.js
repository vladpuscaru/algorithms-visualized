define(["require", "exports", "../structures/Queue", "../structures/Stack"], function (require, exports, Queue_1, Stack_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Algorithm = void 0;
    class Algorithm {
        static BFS(graph, startingCell, gridGUI) {
            const visited = new Map();
            const queue = new Queue_1.Queue();
            queue.enqueue(startingCell);
            let finish = false;
            while (!finish && !queue.isEmpty()) {
                // Check
                const currentCell = queue.dequeue();
                visited.set(currentCell, true);
                gridGUI.addToAnimQueue(currentCell);
                if (currentCell.data.isDestination) {
                    finish = true;
                }
                // Expand and add to queue
                for (let i = 0; i < graph.elements.get(currentCell).length; i++) {
                    const cell = graph.elements.get(currentCell)[i];
                    if (!visited.get(cell)) {
                        queue.enqueue(cell);
                        visited.set(cell, true);
                    }
                }
            }
        }
        DFSUtil() {
        }
        static DFS(graph, startingCell, gridGUI) {
            const visited = new Map();
            const stack = new Stack_1.Stack();
            stack.push(startingCell);
            let finish = false;
            while (!finish && !stack.isEmpty()) {
                // Check
                const currentCell = stack.pop();
                visited.set(currentCell, true);
                gridGUI.addToAnimQueue(currentCell);
                if (currentCell.data.isDestination) {
                    finish = true;
                }
                // Expand and add to queue
                for (let i = 0; i < graph.elements.get(currentCell).length; i++) {
                    const cell = graph.elements.get(currentCell)[i];
                    if (!visited.get(cell)) {
                        stack.push(cell);
                        visited.set(cell, true);
                    }
                }
            }
        }
    }
    exports.Algorithm = Algorithm;
});
//# sourceMappingURL=Algorithm.js.map