import Conquest from "~/app/Models/Conquests/Conquest";
import Terrain from "~/app/Models/Terrain";

const ConquestManager = {
    getNextLevel(field: Terrain): Conquest {
        return field.conquestLevel.getNextLevel();
    }
}

export default ConquestManager;