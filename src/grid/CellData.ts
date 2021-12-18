
export class CellData {
    public color: string;
    public isSource: boolean;
    public isDestination: boolean;
    public isVisited: boolean;

    constructor(data: Partial<CellData>) {
        this.color = data.color!;
        this.isSource = false;
        this.isDestination = false;
        this.isVisited = false;

        Object.keys(data).forEach((key) => {
           this[key] = data[key];
        });
    }
}