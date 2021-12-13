
const constructGraphFromGrid = (grid) => {
    const graph = Graph.constructFromVerticesList(grid.cells);

    for (let k = 0; k < graph.noOfVertices; k++) {
        const current = grid.cells[k];

        const i = current.x;
        const j = current.y;

        const neighbourTop = grid.cells.find(e => e.x === i && e.y === j - 1);
        const neighbourRight = grid.cells.find(e => e.x === i + 1 && e.y === j);
        const neighbourBottom = grid.cells.find(e => e.x === i && e.y === j + 1);
        const neighbourLeft = grid.cells.find(e => e.x === i - 1 && e.y === j);

        if (neighbourTop && neighbourTop.type === current.type) {
            graph.addEdge(k, neighbourTop);
        }

        if (neighbourRight && neighbourRight.type === current.type) {
            graph.addEdge(k, neighbourRight);
        }

        if (neighbourBottom && neighbourBottom.type === current.type) {
            graph.addEdge(k, neighbourBottom);
        }

        if (neighbourLeft && neighbourLeft.type === current.type) {
            graph.addEdge(k, neighbourLeft);
        }
    }

    return graph;
}

const getCellCoordsFromMouseCoords = (event, canvas) => {
    const canvasX = event.x - canvas.offsetLeft;
    const canvasY = event.y - canvas.offsetTop;

    let cellX = Math.floor(canvasX / gridGUI.cellSize);
    let cellY = Math.floor(canvasY / gridGUI.cellSize);

    cellX = cellX >= 0 && cellX < gridGUI.grid.cols ? cellX : 0;
    cellY = cellY >= 0 && cellY < gridGUI.grid.rows ? cellY : 0;

    return [cellX, cellY];
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}