define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Stack = void 0;
    class Stack {
        constructor() {
            this.elements = new Array();
        }
        push(element) {
            this.elements.push(element);
        }
        pop() {
            return this.elements.pop();
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
    exports.Stack = Stack;
});
//# sourceMappingURL=Stack.js.map