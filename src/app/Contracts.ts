interface ServiceProducer {
    produce(value: number): number;
    generateResource(amount: number): void;
}

export default abstract class AbstractServiceProducer implements ServiceProducer {
    canHaveSurplus: boolean;

    constructor(canHaveSurplus: boolean = true) {
        this.canHaveSurplus = canHaveSurplus;
    }

    produce(value: number): number {
        let surplus: number = 0;
        if (value < 100) {
            return value;
        }

        let amount = value / 100;

        this.generateResource(amount);

        if (this.canHaveSurplus) {
            surplus = value % 100;
        }

        return surplus;
    }

    abstract generateResource(amount: number): void;
}