import Terrain from "~/app/Models/Terrain";
import { AbstractManager } from "../AbstractStatManager";

export default abstract class AbstractRatioManager extends AbstractManager
{
    fieldId?: number;

    constructor(fieldId?: number)
    {
        super();
        this.fieldId = fieldId;
    }

    abstract add(value: number): void;
    abstract remove(value: number): void;
}