

export class Queue {

    private elements: Array<any>;


    constructor() {
        this.elements = new Array<any>();
    }

    enqueue(element: any): void {
        this.elements.push(element);
    }

    dequeue(): any {
        return this.elements.shift();
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