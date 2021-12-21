import AbstractServiceProducer from "~/app/Services/Resources/AbstractProducer";
import score from "~/app/Stores";

export default class FoodProducer extends AbstractServiceProducer
{
    generateResource(amount: number)
    {
        score.food += amount;
    }
}