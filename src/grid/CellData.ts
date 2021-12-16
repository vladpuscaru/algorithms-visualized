
export class CellData {
    public color: string;

    constructor(data: Partial<CellData>) {
        this.color = data.color!;

        Object.keys(data).forEach((key) => {
           this[key] = data[key];
        });
    }
}