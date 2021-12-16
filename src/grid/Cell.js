"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const Vec2_1 = require("../utils/Vec2");
class Cell {
    constructor(x, y) {
        this.position = new Vec2_1.Vec2();
        this.position.x = x;
        this.position.y = y;
    }
}
exports.Cell = Cell;
