
class Queue {
    constructor() {
        this.elements = [];
    }

    enqueue = (e) => {
        this.elements.push(e);
    }

    dequeue = () => {
        return this.elements.shift();
    }

    isEmpty = () => {
        return this.elements.length === 0;
    }
}