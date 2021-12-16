import { Grid } from "../grid/Grid";
import { Vec2 } from "../utils/Vec2";
import { Cell } from "../grid/Cell";
import { Constants } from "../utils/Constants";

export class GridGUI {

    private readonly canvas: HTMLCanvasElement;
    private grid: Grid;

    private mousePosition: Vec2;

    constructor(canvas: HTMLCanvasElement, mapConfig: string) {
        this.canvas = canvas;
        this.grid = new Grid(mapConfig);

        this.mousePosition = new Vec2();
        this.mousePosition.x = -1;
        this.mousePosition.y = -1;
    }

    draw() {
        const ctx = this.canvas.getContext("2d")!;
        const width = this.canvas.width;
        const height = this.canvas.height;

        const cellWidthInPixels = this.canvas.width / this.grid.getWidth();
        const cellHeightInPixels = this.canvas.height / this.grid.getHeight();

        for (let i = 0; i < this.grid.cells.length; i++) {
            for (let j = 0; j < this.grid.cells[i].length; j++) {
                const cell: Cell = this.grid.cells[i][j];
                ctx.fillStyle = cell.data.color;
                ctx.fillRect(cell.position.x * cellWidthInPixels, cell.position.y * cellHeightInPixels, cellWidthInPixels, cellHeightInPixels);

                ctx.strokeStyle = "#000000";
                ctx.strokeRect(cell.position.x * cellWidthInPixels, cell.position.y * cellHeightInPixels, cellWidthInPixels, cellHeightInPixels);
            }
        }
    }

    debugString(): string {
        return `GridGUI` + "<br/>" +
            `- canvas: ${ this.canvas }` + "<br/>" +
            `- mousePosition: [${ this.mousePosition.x }][${ this.mousePosition.y }] ` + "<br/><br/>" +
            `Grid` + "<br/>" +
            `- width: ${ this.grid.getWidth() }` + "<br/>" +
            `- height: ${ this.grid.getHeight() }` + "<br/>" +
            `${ this.debugPrintCells() }`;
    }

    debugPrintCells() : string {
        let string = "";
        for (let i = 0; i < this.grid.cells.length; i++) {
            for (let j = 0; j < this.grid.cells[i].length; j++) {
                let no;
                Object.keys(Constants.CELL_TYPE_MAP).forEach(t => {
                    if (Constants.CELL_TYPE_MAP[t] === this.grid.cells[i][j].data.color) {
                        no = t;
                    } else {
                        no = 'x';
                    }
                })
                string += `${ no }`;
            }
            string += "<br/>";
        }
        return string;
    }
}