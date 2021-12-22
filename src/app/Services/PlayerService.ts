import Player from "../Models/Player";
import { playerState } from "../Stores/player";

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
        playerState.setFieldId(fieldId);
    }
}

const playerManager = new PlayerService();

export default playerManager;