import { Grid } from "../grid/Grid";
import { Vec2 } from "../utils/Vec2";
import { Cell } from "../grid/Cell";
import { Constants } from "../utils/Constants";

export interface GridGUIHTML {
    canvas: HTMLCanvasElement;
    strokeBtn: HTMLInputElement;
}

export class GridGUI {

    private readonly canvas: HTMLCanvasElement;
    private readonly strokeBtn: HTMLInputElement;

    private grid: Grid;

    private mousePosition: Vec2;

    private readonly cellWidthInPixels;
    private readonly cellHeightInPixels;

    private sourceCell: Cell | undefined;
    private destinationCell: Cell | undefined;

    constructor(html: GridGUIHTML, mapConfig: string) {
        this.canvas = html.canvas;
        this.strokeBtn = html.strokeBtn;

        this.grid = new Grid(mapConfig);

        this.mousePosition = new Vec2();
        this.mousePosition.x = -1;
        this.mousePosition.y = -1;

        this.cellWidthInPixels = this.canvas.width / this.grid.getWidth();
        this.cellHeightInPixels = this.canvas.height / this.grid.getHeight();

        this.sourceCell = undefined;
        this.destinationCell = undefined;

        this.setupEventListeners();
    }

    draw() {
        const ctx = this.canvas.getContext("2d")!;

        for (let i = 0; i < this.grid.cells.length; i++) {
            for (let j = 0; j < this.grid.cells[i].length; j++) {
                // Drawing
                const cell: Cell = this.grid.cells[i][j];
                ctx.fillStyle = cell.data.color;

                // Highlight
                if (this.mousePosition.x === i && this.mousePosition.y === j) {
                    ctx.fillStyle = Constants.COLOR_HIGHLIGHT;
                }

                // Source and Destination
                if (cell.data.isSource) {
                    ctx.fillStyle = Constants.COLOR_SOURCE;
                }
                if (cell.data.isDestination) {
                    ctx.fillStyle = Constants.COLOR_DESTINATION;
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
        ctx.fillText(`Mouse [${ this.mousePosition.x }][${ this.mousePosition.y }]`, 5, this.canvas.height - 5);
    }

    setupEventListeners(): void {
        // Mouse Position
        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();

            const distance: Vec2 = new Vec2();
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
                })
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
                })
            });

            this.destinationCell = this.grid.cells[this.mousePosition.x][this.mousePosition.y];
            this.destinationCell.data.isDestination = true;
        });
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

    debugPrintCells(): string {
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