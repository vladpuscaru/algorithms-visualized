"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
class Grid {
    constructor(mapConfig) {
        this.cells = new Array();
    }
    getWidth() {
        return this.cells.length;
    }
    getHeight() {
        return this.cells[0].length;
    }
}
exports.Grid = Grid;
