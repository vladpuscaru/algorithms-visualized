define(["require", "exports", "../utils/Vec2"], function (require, exports, Vec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cell = void 0;
    class Cell {
        constructor(x, y, data) {
            this.position = new Vec2_1.Vec2();
            this.position.x = x;
            this.position.y = y;
            this.data = data;
        }
    }
    exports.Cell = Cell;
});
//# sourceMappingURL=Cell.js.map