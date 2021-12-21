import AbstractServiceProducer from "~/app/Services/Resources/Contracts";
import score from "~/app/Stores";

export default class WoodProducer extends AbstractServiceProducer
{
    generateResource(amount: number)
    {
        score.wood += amount;
    }
}