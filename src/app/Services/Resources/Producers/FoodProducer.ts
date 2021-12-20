import AbstractServiceProducer from "~/app/Contracts";
import score from "~/app/Stores";

export default class FoodProducer extends AbstractServiceProducer
{
    generateResource(amount: number)
    {
        score.food += amount;
    }
}