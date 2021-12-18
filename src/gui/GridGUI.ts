import { Grid } from "../grid/Grid";
import { Vec2 } from "../utils/Vec2";
import { Cell } from "../grid/Cell";
import { Constants } from "../utils/Constants";
import { Graph } from "../structures/Graph";
import { AlgConfig } from "../algorithms/AlgConfig";
import { Algorithm } from "../algorithms/Algorithm";
import { Queue } from "../structures/Queue";

export interface GridGUIHTML {
    canvas: HTMLCanvasElement;
    strokeBtn: HTMLInputElement;
    runBtn: HTMLButtonElement;
    clearBtn: HTMLButtonElement;
    allowedActionsCBs: HTMLCollection;
    algorithm: HTMLSelectElement;
}

export class GridGUI {

    private readonly canvas: HTMLCanvasElement;
    private readonly strokeBtn: HTMLInputElement;
    private readonly runBtn: HTMLButtonElement;
    private readonly clearBtn: HTMLButtonElement;
    private readonly allowedActionsCBs: HTMLCollection;
    private readonly algorithm: HTMLSelectElement;

    private grid: Grid;
    private graph: Graph;

    private mousePosition: Vec2;

    private readonly cellWidthInPixels;
    private readonly cellHeightInPixels;

    private sourceCell: Cell | undefined;
    private destinationCell: Cell | undefined;

    private algConfig: AlgConfig;

    private animQueue: Queue;
    private animationID: number;

    constructor(html: GridGUIHTML, mapConfig: string) {
        this.canvas = html.canvas;
        this.strokeBtn = html.strokeBtn;
        this.runBtn = html.runBtn;
        this.clearBtn = html.clearBtn;
        this.allowedActionsCBs = html.allowedActionsCBs;
        this.algorithm = html.algorithm;

        this.algConfig = new AlgConfig(50, []);
        const allowedActions: Array<Array<number>> = [];
        for (let j = 0; j < html.allowedActionsCBs.length; j++) {
            if ((<HTMLInputElement>html.allowedActionsCBs[j]).checked) {
                allowedActions.push((<HTMLInputElement>html.allowedActionsCBs[j]).dataset['action']!.split(",").map(e => Number.parseInt(e)));
            }
        }

        this.algConfig.allowedActions = allowedActions;

        this.grid = new Grid(mapConfig);
        this.graph = Graph.constructFromMatrix(this.grid.cells, this.algConfig.allowedActions);

        this.mousePosition = new Vec2();
        this.mousePosition.x = -1;
        this.mousePosition.y = -1;

        this.cellWidthInPixels = this.canvas.width / this.grid.getWidth();
        this.cellHeightInPixels = this.canvas.height / this.grid.getHeight();

        this.sourceCell = undefined;
        this.destinationCell = undefined;

        this.animQueue = new Queue();
        this.animationID = -1;

        this.setupEventListeners();
    }

    draw() {
        const ctx = this.canvas.getContext("2d")!;

        const highlightedCell: Cell | undefined = this.grid.cells[this.mousePosition.x] ? this.grid.cells[this.mousePosition.x][this.mousePosition.y] : undefined;
        const highlightedNeighbours: Cell[] = highlightedCell ? this.graph.elements.get(highlightedCell)! : [];

        for (let i = 0; i < this.grid.cells.length; i++) {
            for (let j = 0; j < this.grid.cells[i].length; j++) {
                // Drawing
                const cell: Cell = this.grid.cells[i][j];
                ctx.fillStyle = cell.data.color;

                // Visited cell
                if (cell.data.isVisited) {
                    ctx.fillStyle = Constants.COLOR_VISITED;
                }

                // Highlight hovered cell
                if (cell === highlightedCell) {
                    ctx.fillStyle = Constants.COLOR_HIGHLIGHT_CELL;
                }

                // Highlight neighbours of hovered cell
                if (highlightedNeighbours.find(c => c.position.x === cell.position.x && c.position.y === cell.position.y)) {
                    ctx.fillStyle = Constants.COLOR_HIGHLIGHT_NEIGHBOUR;
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
        const gridGUIInstance = this;

        // Allowed actions
        for (let i = 0; i < this.allowedActionsCBs.length; i++) {
            this.allowedActionsCBs[i].addEventListener('change', () => {
                const allowedActions: Array<Array<number>> = [];
                for (let j = 0; j < this.allowedActionsCBs.length; j++) {
                    if ((<HTMLInputElement>this.allowedActionsCBs[j]).checked) {
                        allowedActions.push((<HTMLInputElement>this.allowedActionsCBs[j]).dataset['action']!.split(",").map(e => Number.parseInt(e)));
                    }
                }

                this.algConfig.allowedActions = allowedActions;

                this.graph = Graph.constructFromMatrix(this.grid.cells, this.algConfig.allowedActions);
            });
        }

        // Run algorithm
        this.runBtn.addEventListener('click', (event) => {
            event.preventDefault();

            this.clearCanvas();

            if (this.algorithm.value === Constants.ALGORITHM_BFS) {
                Algorithm.BFS(this.graph, this.sourceCell!, gridGUIInstance);
            } else if (this.algorithm.value === Constants.ALGORITHM_DFS) {
                Algorithm.DFS(this.graph, this.sourceCell!, gridGUIInstance);
            }

            this.animationID = setInterval(() => {
                const cell: Cell = this.animQueue.dequeue();
                cell.data.isVisited = true;

                if (this.animQueue.isEmpty()) {
                    clearInterval(this.animationID);
                }
            }, this.algConfig.animationTime);
        });

        // Clear canvas
        this.clearBtn.addEventListener('click', (event) => {
            event.preventDefault();

            this.clearCanvas();
        });

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

    clearCanvas(): void {
        this.animQueue.clear();
        if (this.animationID != -1) {
            clearInterval(this.animationID);
        }
        this.grid.cells.forEach(cellRow => cellRow.forEach(cell => cell.data.isVisited = false));
    }

    addToAnimQueue(cell: Cell): void {
        this.animQueue.enqueue(cell);
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