export abstract class AbstractManager {
    min: number = 0;
    max: number = 999999;

    abstract add(value: number): void;

    abstract remove(value: number): void;

    setMin(value: number): void
    {
        this.min = value;
    }

    setMax(value: number): void
    {
        this.max = value;
    }
}

export abstract class AbstractResourceManager extends AbstractManager implements CanSpendStat {
    
    abstract hasEnough(value: number): boolean;

    validateTooMuch(value: number): number
    {
        return value > this.max ? this.max : value;
    }

    validateTooLittle(value: number): number
    {
        return value < this.min ? this.min : value;
    }
}