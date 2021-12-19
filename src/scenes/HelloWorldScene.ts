import Phaser from 'phaser'
import GameDice from '~/app/Models/Dice/GameDice';
import Player from '~/app/Models/Player';
import { CasePosition } from '~/app/Models/CasePosition';
import getLandingCase from '~/app/Models/CasePosition';
import Terrain from '~/app/Models/Terrain';
import { ResourceType } from "~/game";
import eventsCenter from '~/app/EventsCenter';
import ScoreScene from './UI/ScoreScene';
import score from '~/app/Stores';
export default class HelloWorldScene extends Phaser.Scene
{
    dice: GameDice;
    player: Player;
    terrains: Terrain[];

	constructor()
	{
		super('hello-world')
        this.terrains = [];
	}

    create()
    {
        eventsCenter.on('dice-rolled', this.handleDiceRolled, this);
        eventsCenter.on('PLAYER_SWITCHED_TERRAIN', this.handleTerrainSwitch, this);
        this.add.image(400, 300, 'board');

        // Score
        this.data.set('wood', 0);
        this.data.set('food', 0);
        this.data.set('stone', 0);

        this.scene.run('score-scene');
        this.scene.run('current-terrain-infos');

        // Instancier les terrains
        for(let i=0; i<16; i++) {
            this.terrains.push(
                new Terrain(this, CasePosition[i])
            )
        }

        this.dice = new GameDice(this, 560, 90);

        this.player = new Player(this, this.terrains[0]);

        eventsCenter.on('NEW_TURN', this.player.restoreEnergy, this);
    }

    handleDiceRolled(dice: GameDice)
    {
        let landingCase = getLandingCase(this.player.position.caseNumber, dice.currentValue);

        this.player.updateTerrain(this.terrains[landingCase]);
    }

    handleTerrainSwitch(terrain: Terrain)
    {
        if ( terrain.position.caseNumber > 6) {
            score.hasLeftStartOfBoard = true;
        }

        if ( terrain.position.caseNumber <= 6 && score.hasLeftStartOfBoard) {
            score.turn++;
            score.hasLeftStartOfBoard = false;
            eventsCenter.emit('NEW_TURN');
        }

        terrain.onLanding();
    }
}
