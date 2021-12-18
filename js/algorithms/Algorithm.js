define(["require", "exports", "../structures/Queue"], function (require, exports, Queue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Algorithm = void 0;
    class Algorithm {
        static BFS(graph, startingCell, gridGUI) {
            console.log(graph);
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
                queue.print();
            }
        }
    }
    exports.Algorithm = Algorithm;
});
//# sourceMappingURL=Algorithm.js.map