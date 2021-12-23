export default abstract class AbstractStatManager {
    min: number = 0;
    max: number = 999999;

    abstract add(value: number): void;

    abstract remove(value: number): void;

    abstract hasEnough(value: number): boolean;

    setMin(value: number): void
    {
        this.min = value;
    }

    setMax(value: number): void
    {
        this.max = value;
    }

    validateTooMuch(value: number): number
    {
        return value > this.max ? this.max : value;
    }

    validateTooLittle(value: number): number
    {
        return value < this.min ? this.min : value;
    }
}