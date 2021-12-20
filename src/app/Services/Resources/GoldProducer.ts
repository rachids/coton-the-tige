import AbstractServiceProducer from "~/app/Contracts";
import score from "../../Stores";

export class GoldProducer extends AbstractServiceProducer
{
    generateResource(amount: number)
    {
        score.gold += amount;
    }
}