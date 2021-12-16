"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridGUI = void 0;
const Grid_1 = require("../grid/Grid");
const Vec2_1 = require("../utils/Vec2");
class GridGUI {
    constructor(canvas) {
        this.canvas = canvas;
        this.grid = new Grid_1.Grid("");
        this.mousePosition = new Vec2_1.Vec2();
        this.mousePosition.x = -1;
        this.mousePosition.y = -1;
    }
    draw() {
        const ctx = this.canvas.getContext("2d");
        const width = this.canvas.width;
        const height = this.canvas.height;
        const cellWidthInPixels = this.canvas.width / this.grid.getWidth();
        const cellHeightInPixels = this.canvas.height / this.grid.getHeight();
    }
    debug() {
    }
}
exports.GridGUI = GridGUI;
