import AbstractResourceManager from "./AbstractResourceManager";

export default class ResourceProducer {
    canHaveSurplus: boolean;
    ratio: number = 1;
    manager: AbstractResourceManager;

    constructor(manager: AbstractResourceManager, canHaveSurplus: boolean = true) {
        this.manager = manager;
        this.canHaveSurplus = canHaveSurplus;
    }

    setRatio(value: number) {
        this.ratio = value;
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

    generateResource(amount: number) {
        this.manager.add(amount);
    }
}