import AbstractServiceProducer from "~/app/Contracts";
import score from "~/app/Stores";

export default class StoneProducer extends AbstractServiceProducer 
{
    generateResource(amount: number)
    {
        score.stone += amount;
    }
}