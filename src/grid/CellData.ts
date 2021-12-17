
export class CellData {
    public color: string;
    public isSource: boolean;
    public isDestination: boolean;

    constructor(data: Partial<CellData>) {
        this.color = data.color!;
        this.isSource = false;
        this.isDestination = false;

        Object.keys(data).forEach((key) => {
           this[key] = data[key];
        });
    }
}