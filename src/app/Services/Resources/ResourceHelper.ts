import score from '~/app/Stores'

const ResourceHelper = {
    isValidResource(name: string)
    {
        return score.hasOwnProperty(name);
    },

    findResourceFromString(resource: string)
    {
        if (this.isValidResource(resource)) {
            return score[resource];
        }
    },

    consume(resourceName: string, amount: number)
    {
        if (this.isValidResource(resourceName)) {
            score[resourceName] -= amount;
        }
    }
};

export default ResourceHelper;