import { makeAutoObservable } from "mobx"

class ScoreState {
    food: number = 0;
    wood: number = 0;
    stone: number = 0;
    money: number = 0;
    gold: number = 0;
    playerXP: number = 0;
    turn: number = 0;

    constructor()
    {
        makeAutoObservable(this);
    }

    setFood(value: number)
    {
        this.food = value;
    }

    setWood(value: number)
    {
        this.wood = value;
    }

    setStone(value: number)
    {
        this.stone = value;
    }
}

export const scoreState = new ScoreState();