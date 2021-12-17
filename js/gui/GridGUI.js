define(["require", "exports", "../grid/Grid", "../utils/Vec2", "../utils/Constants"], function (require, exports, Grid_1, Vec2_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GridGUI = void 0;
    class GridGUI {
        constructor(html, mapConfig) {
            this.canvas = html.canvas;
            this.strokeBtn = html.strokeBtn;
            this.grid = new Grid_1.Grid(mapConfig);
            this.mousePosition = new Vec2_1.Vec2();
            this.mousePosition.x = -1;
            this.mousePosition.y = -1;
            this.cellWidthInPixels = this.canvas.width / this.grid.getWidth();
            this.cellHeightInPixels = this.canvas.height / this.grid.getHeight();
            this.sourceCell = undefined;
            this.destinationCell = undefined;
            this.setupEventListeners();
        }
        draw() {
            const ctx = this.canvas.getContext("2d");
            for (let i = 0; i < this.grid.cells.length; i++) {
                for (let j = 0; j < this.grid.cells[i].length; j++) {
                    // Drawing
                    const cell = this.grid.cells[i][j];
                    ctx.fillStyle = cell.data.color;
                    // Highlight
                    if (this.mousePosition.x === i && this.mousePosition.y === j) {
                        ctx.fillStyle = Constants_1.Constants.COLOR_HIGHLIGHT;
                    }
                    // Source and Destination
                    if (cell.data.isSource) {
                        ctx.fillStyle = Constants_1.Constants.COLOR_SOURCE;
                    }
                    if (cell.data.isDestination) {
                        ctx.fillStyle = Constants_1.Constants.COLOR_DESTINATION;
                    }
                    ctx.fillRect(cell.position.x * this.cellWidthInPixels, cell.position.y * this.cellHeightInPixels, this.cellWidthInPixels, this.cellHeightInPixels);
                    // Stroke
                    if (this.strokeBtn.checked) {
                        ctx.strokeStyle = "#000000";
                        ctx.strokeRect(cell.position.x * this.cellWidthInPixels, cell.position.y * this.cellHeightInPixels, this.cellWidthInPixels, this.cellHeightInPixels);
                    }
                }
            }
            ctx.font = "18px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(`Mouse [${this.mousePosition.x}][${this.mousePosition.y}]`, 5, this.canvas.height - 5);
        }
        setupEventListeners() {
            // Mouse Position
            this.canvas.addEventListener('mousemove', (event) => {
                const rect = this.canvas.getBoundingClientRect();
                const distance = new Vec2_1.Vec2();
                distance.x = event.clientX - rect.left;
                distance.y = event.clientY - rect.top;
                this.mousePosition.x = Math.floor(distance.x / this.canvas.width * this.grid.getWidth());
                this.mousePosition.y = Math.floor(distance.y / this.canvas.height * this.grid.getHeight());
            });
            // Set source cell
            this.canvas.addEventListener('click', (event) => {
                event.preventDefault();
                this.grid.cells.forEach(cellRow => {
                    cellRow.forEach(cell => {
                        cell.data.isSource = false;
                    });
                });
                this.sourceCell = this.grid.cells[this.mousePosition.x][this.mousePosition.y];
                this.sourceCell.data.isSource = true;
            });
            // Set destination cell
            this.canvas.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                this.grid.cells.forEach(cellRow => {
                    cellRow.forEach(cell => {
                        cell.data.isDestination = false;
                    });
                });
                this.destinationCell = this.grid.cells[this.mousePosition.x][this.mousePosition.y];
                this.destinationCell.data.isDestination = true;
            });
        }
        debugString() {
            return `GridGUI` + "<br/>" +
                `- canvas: ${this.canvas}` + "<br/>" +
                `- mousePosition: [${this.mousePosition.x}][${this.mousePosition.y}] ` + "<br/><br/>" +
                `Grid` + "<br/>" +
                `- width: ${this.grid.getWidth()}` + "<br/>" +
                `- height: ${this.grid.getHeight()}` + "<br/>" +
                `${this.debugPrintCells()}`;
        }
        debugPrintCells() {
            let string = "";
            for (let i = 0; i < this.grid.cells.length; i++) {
                for (let j = 0; j < this.grid.cells[i].length; j++) {
                    let no;
                    Object.keys(Constants_1.Constants.CELL_TYPE_MAP).forEach(t => {
                        if (Constants_1.Constants.CELL_TYPE_MAP[t] === this.grid.cells[i][j].data.color) {
                            no = t;
                        }
                        else {
                            no = 'x';
                        }
                    });
                    string += `${no}`;
                }
                string += "<br/>";
            }
            return string;
        }
    }
    exports.GridGUI = GridGUI;
});
//# sourceMappingURL=GridGUI.js.map