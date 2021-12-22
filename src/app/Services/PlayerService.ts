import Player from "../Models/Player";

class PlayerService
{
    player: Player;

    constructor()
    {
        this.player = new Player();   
    }

    generatePlayer(fieldId: number)
    {
        this.player = new Player();
        this.player.setFieldId(fieldId);
    }
}

const playerManager = new PlayerService();

export default playerManager;