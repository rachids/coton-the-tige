import { scoreState } from "~/app/Stores/score";

const ResourceHelper = {
    isValidResource(name: string)
    {
        return scoreState.hasOwnProperty(name);
    },

    findResourceFromString(resource: string)
    {
        if (this.isValidResource(resource)) {
            return scoreState[resource];
        }
    }
};

export default ResourceHelper;