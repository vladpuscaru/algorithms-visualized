

export class Stack {

    private elements: Array<any>;


    constructor() {
        this.elements = new Array<any>();
    }

    push(element: any): void {
        this.elements.push(element);
    }

    pop(): any {
        return this.elements.pop();
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    clear(): void {
        this.elements = [];
    }

    print(): void {
        console.log(this.elements);
    }
}