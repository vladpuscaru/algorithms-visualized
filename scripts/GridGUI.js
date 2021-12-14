const tiles = {
    0: "#0000FF",
    1: "#458000",
    2: "#d1d1d1",
    3: "#FFFF32", // Travelled
    4: "#FF0000", // Source
    5: "#FF33FF", // Destination
}

class GridGUI {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.grid = new Grid();
        this.cellSize = this.canvas.width / this.grid.cols;
        this.currentAnimation = "";
        this.animQueue = new Queue();

        this.bordersOn = true;
    }

    draw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.grid.cells.length; i++) {
            this.ctx.fillStyle = tiles[this.grid.cells[i].type]
            this.ctx.fillRect(this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize, this.cellSize, this.cellSize);

            if (this.grid.cells[i].isVisited) {
                this.ctx.fillStyle = tiles[3];
                this.ctx.fillRect(this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize, this.cellSize, this.cellSize);
            }

            if (this.grid.cells[i].isSource) {
                this.ctx.fillStyle = tiles[4];
                this.ctx.fillRect(this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize, this.cellSize, this.cellSize);
            }

            if (this.grid.cells[i].isDestination) {
                this.ctx.fillStyle = tiles[5];
                this.ctx.fillRect(this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize, this.cellSize, this.cellSize);
            }

            if (this.bordersOn) {
                this.ctx.strokeRect(this.grid.cells[i].x * this.cellSize, this.grid.cells[i].y * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    setSourceNode = (x, y) => {
        this.grid.cells.forEach(cell => cell.isSource = false);
        const cell = this.grid.cells.find(e => e.x === x && e.y === y);
        cell.isSource = true;
        return cell;
    }

    setDestinationNode = (x, y) => {
        this.grid.cells.forEach(cell => cell.isDestination = false);
        const cell = this.grid.cells.find(e => e.x === x && e.y === y);
        cell.isDestination = true;
        return cell;
    }

    addToAnimQueue = (cellIndex) => {
        this.animQueue.enqueue(cellIndex);
    }

    animateVisited = () => {
        this.currentAnimation = setInterval(() => {
            const cellIndex = this.animQueue.isEmpty() ? "" : this.animQueue.dequeue();
            this.grid.cells[cellIndex] ? this.grid.cells[cellIndex].isVisited = true : "";
            this.draw();

            if (this.animQueue.isEmpty()) {
                clearInterval(this.currentAnimation);
            }
        });
    }

    clearAnim = () => {
        clearInterval(this.currentAnimation);
        this.animQueue.clear();

        this.grid.cells.forEach(cell => cell.isVisited = false);
    }
}