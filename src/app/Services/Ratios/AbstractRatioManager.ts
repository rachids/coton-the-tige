import Terrain from "~/app/Models/Terrain";
import AbstractStatManager from "../AbstractStatManager";

export default abstract class AbstractRatioManager extends AbstractStatManager
{
    field?: Terrain;

    constructor(field?: Terrain)
    {
        super();
        this.field = field;
    }

    abstract add(value: number): void;
    abstract remove(value: number): void;
}