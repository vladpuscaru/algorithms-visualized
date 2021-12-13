const canvas = document.getElementById("canvas");
const gridGUI = new GridGUI(canvas);

const graph = constructGraphFromGrid(gridGUI.grid);

const update = () => {
    gridGUI.draw();
}
update();


/* Event Listeners */
const mousePos = document.getElementById("canvas__info--mousepos");
canvas.addEventListener("mousemove", (event) => {
    const [cellX, cellY] = getCellCoordsFromMouseCoords(event, canvas);
    mousePos.innerHTML = `Mouse(${cellX}, ${cellY})`;
    // gridGUI.highlight(cellX, cellY);
    // update();
});

canvas.addEventListener("click", (event) => {
    event.preventDefault();
    const [cellX, cellY] = getCellCoordsFromMouseCoords(event, canvas);
    gridGUI.setSourceNode(cellX, cellY);
    update();
});

canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const [cellX, cellY] = getCellCoordsFromMouseCoords(event, canvas);
    gridGUI.setDestinationNode(cellX, cellY);
    update();
});



/* Testing */
// const testBFS = () => {
//     const graph = new Graph(4);
//     graph.addEdge(0, 1);
//     graph.addEdge(0, 2);
//     graph.addEdge(1, 2);
//     graph.addEdge(2, 0);
//     graph.addEdge(2, 3);
//     graph.addEdge(3, 3);
//
//     BFS(graph, 2);
// }