import AbstractServiceProducer from "~/app/Contracts";
import score from "~/app/Stores";

export default class GoldProducer extends AbstractServiceProducer
{
    generateResource(amount: number)
    {
        score.gold += amount;
    }
}