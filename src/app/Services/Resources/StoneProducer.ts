import AbstractServiceProducer from "~/app/Contracts";
import score from "../../Stores";

export default class StoneProducer extends AbstractServiceProducer 
{
    generateResource(amount: number)
    {
        score.stone += amount;
    }
}