import Phaser from 'phaser';

export default class Dice
{
    min: number = 0;
    max: number = 100;

    constructor(min: number, max: number)
    {
        this.min = min;
        this.max = max;
    }

    throw(): number
    {
        return Phaser.Math.Between(this.min, this.max);
    }
}