define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Queue = void 0;
    class Queue {
        constructor() {
            this.elements = new Array();
        }
        enqueue(element) {
            this.elements.push(element);
        }
        dequeue() {
            return this.elements.shift();
        }
        isEmpty() {
            return this.elements.length === 0;
        }
        clear() {
            this.elements = [];
        }
        print() {
            console.log(this.elements);
        }
    }
    exports.Queue = Queue;
});
//# sourceMappingURL=Queue.js.map