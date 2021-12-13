class Cell {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.isHighlighted = false;
        this.isSource = false;
        this.isDestination = false;
    }
}

class Grid {
    constructor() {
        this.cols = map_default.length;
        this.rows = map_default[0].length;

        this.cells = [];
        for (let i = 0; i < map_default.length; i++) {
            for (let j = 0; j < map_default[i].length; j++) {
                this.cells.push(new Cell(i, j, map_default[i][j]));
            }
        }
    }
}