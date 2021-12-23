import Terrain from "~/app/Models/Terrain";
import AbstractStatManager from "../AbstractStatManager";

export default abstract class AbstractRatioManager extends AbstractStatManager
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