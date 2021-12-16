define(["require", "exports", "./Cell", "./CellData", "../utils/Constants"], function (require, exports, Cell_1, CellData_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Grid = void 0;
    class Grid {
        constructor(mapConfig) {
            this.cells = new Array();
            const map = mapConfig.split("\n");
            map.shift(); // Remove first blank element
            let column;
            let cellType;
            let cellData;
            let cell;
            for (let i = 0; i < map.length; i++) {
                column = [];
                for (let j = 0; j < map[i].length; j++) {
                    cellType = Number.parseInt(map[i].charAt(j));
                    cellData = new CellData_1.CellData({ color: Constants_1.Constants.CELL_TYPE_MAP[cellType] });
                    cell = new Cell_1.Cell(i, j, cellData);
                    column.push(cell);
                }
                this.cells.push(column);
            }
        }
        getWidth() {
            return this.cells ? this.cells.length : 0;
        }
        getHeight() {
            return this.cells[0] ? this.cells[0].length : 0;
        }
    }
    exports.Grid = Grid;
});
//# sourceMappingURL=Grid.js.map