import AbstractServiceProducer from "~/app/Services/Resources/AbstractProducer";
import score from "~/app/Stores";

export default class StoneProducer extends AbstractServiceProducer 
{
    generateResource(amount: number)
    {
        score.stone += amount;
    }
}