import { Cell } from "./Cell";
import { CellData } from "./CellData";
import { Constants } from "../utils/Constants";

export class Grid {

    public readonly cells: Array<Array<Cell>>;

    constructor(mapConfig: string) {
        this.cells = new Array<Array<Cell>>();

        const map = mapConfig.split("\n");
        map.shift(); // Remove first blank element

        let column: Array<Cell>;
        let cellType: number;
        let cellData: CellData;
        let cell: Cell;

        for (let i = 0; i < map.length; i++) {
            column = [];
            for (let j = 0; j < map[i].length; j++) {
                cellType = Number.parseInt(map[i].charAt(j));
                cellData = new CellData({ color: Constants.CELL_TYPE_MAP[cellType] });
                cell = new Cell(i, j, cellData);
                column.push(cell);
            }
            this.cells.push(column);
        }
    }

    getWidth(): number {
        return this.cells ? this.cells.length : 0;
    }

    getHeight(): number {
        return this.cells[0] ? this.cells[0].length : 0;
    }
}