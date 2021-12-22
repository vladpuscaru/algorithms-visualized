const grid = new Grid(map_default);
grid.render();

const selectAlgorithm = document.getElementById("algorithm");
const btnRun = document.getElementById("run");

btnRun.addEventListener('click', (event) => {
    grid.data[grid.sourceCell[1]][grid.sourceCell[0]] = grid.sourceCell[2];
    grid.data[grid.destCell[1]][grid.destCell[0]] = grid.destCell[2];
    const requestBody = {
        data: grid.data,
        startIndices: [grid.sourceCell[1], grid.sourceCell[0]],
        endIndices: [grid.destCell[1], grid.destCell[0]],
        actions: [
            [-1, 0],  // Left
            [1, 0],  // Right
            [0, 1],  // Up
            [0, -1], // Down
        ],
    };
    grid.clearCanvas();

    if (selectAlgorithm.value === 'BFS') {
        axios({
            method: 'post',
            url: 'http://localhost:8080/algorithms/pathfinding/bfs',
            data: requestBody
        })
            .then(response => {
                const { open, closed, path } = response.data;
                grid.animateBatches(open, CELL_TYPE_OPEN);
                grid.animate(closed, CELL_TYPE_CLOSED);
                grid.updateAfterAnimations(path, CELL_TYPE_PATH);
            })
            .catch(error => {
                console.error(error)
            });
    } else if (selectAlgorithm.value === 'DFS') {
        axios({
            method: 'post',
            url: 'http://localhost:8080/algorithms/pathfinding/dfs',
            data: requestBody
        })
            .then(response => {
                const { open, closed, path } = response.data;
                grid.animate(open, CELL_TYPE_OPEN);
                grid.animate(closed, CELL_TYPE_CLOSED);
                grid.updateAfterAnimations(path, CELL_TYPE_PATH);
            })
            .catch(error => {
                console.error(error)
            });
    }
});