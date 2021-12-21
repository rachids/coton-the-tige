import AbstractServiceProducer from "~/app/Services/Resources/AbstractProducer";
import score from "~/app/Stores";

export default class WoodProducer extends AbstractServiceProducer
{
    generateResource(amount: number)
    {
        score.wood += amount;
    }
}