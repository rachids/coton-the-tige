export interface Bonus {
    execute(): void;
}

export interface Cost extends Bonus {
    hasEnough(): boolean;
}