import AbstractServiceProducer from "~/app/Contracts";
import score from "../../Stores";

export default class WoodProducer extends AbstractServiceProducer
{
    generateResource(amount: number)
    {
        score.wood += amount;
    }
}