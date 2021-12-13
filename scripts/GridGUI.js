const tiles = {
    0: "#0000FF",
    1: "#458000",
    2: "#d1d1d1",
    3: "#FFFF32",
    4: "#FF0000",
    5: "#FF33FF"
}

class GridGUI {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.grid = new Grid();
        this.cellSize = this.canvas.width / this.grid.cols;

        this.bordersOn = true;
    }

    draw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.grid.cells.length; i++) {
            this.ctx.fillStyle = tiles[this.grid.cells[i].type]
            this.ctx.fillRect(this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize, this.cellSize, this.cellSize);

            if (this.grid.cells[i].isHighlighted) {
                this.ctx.fillStyle = tiles[3];
                this.ctx.fillRect(this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize, this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize);
            }

            if (this.grid.cells[i].isSource) {
                this.ctx.fillStyle = tiles[4];
                this.ctx.fillRect(this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize, this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize);
            }

            if (this.grid.cells[i].isDestination) {
                this.ctx.fillStyle = tiles[5];
                this.ctx.fillRect(this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize, this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize);
            }

            if (this.bordersOn) {
                this.ctx.strokeRect(this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    highlight = (x, y) => {
        const cell = this.grid.cells.find(e => e.x === x && e.y === y);
    }

    setSourceNode = (x, y) => {
        const cell = this.grid.cells.find(e => e.x === x && e.y === y);
        console.log(cell);
        cell.isSource = true;
    }

    setDestinationNode = (x, y) => {
        const cell = this.grid.cells.find(e => e.x === x && e.y === y);
        cell.isDestination = true;
    }
}