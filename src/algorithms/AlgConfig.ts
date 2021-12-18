

export class AlgConfig {
    algorithm: string;
    allowedActions: Array<Array<number>>;

    constructor(algorithm: string, allowedActions: Array<Array<number>>) {
        this.algorithm = algorithm;
        this.allowedActions = allowedActions;
    }
}