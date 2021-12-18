

export class AlgConfig {
    allowedActions: Array<Array<number>>;
    animationTime: number;

    constructor(animationTime: number, allowedActions: Array<Array<number>>) {
        this.animationTime = animationTime;
        this.allowedActions = allowedActions;
    }
}