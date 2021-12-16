import { Vec2 } from "../utils/Vec2";
import { CellData } from "./CellData";

export class Cell {

    public position: Vec2;
    public data: CellData;

    constructor(x: number, y: number, data: CellData) {
        this.position = new Vec2();
        this.position.x = x;
        this.position.y = y;
        this.data = data;
    }

}