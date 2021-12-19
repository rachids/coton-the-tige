import Phaser from 'phaser'
import GameDice from '~/app/Models/Dice/GameDice';
import Player from '~/app/Models/Player';
import { CasePosition } from '~/app/Models/CasePosition';
import getLandingCase from '~/app/Models/CasePosition';
import Terrain from '~/app/Models/Terrain';
import { ResourceType } from "~/game";
import eventsCenter from '~/app/EventsCenter';
import ScoreScene from './UI/ScoreScene';
export default class HelloWorldScene extends Phaser.Scene
{
    text: Phaser.GameObjects.Text;
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

        // Instancier les terrains
        for(let i=0; i<16; i++) {
            this.terrains.push(
                new Terrain(CasePosition[i])
            )
        }

        
        this.text = this.add.text(600, 100, "Pos", {
            fontFamily: 'Arial, serif',
            fontSize: '24px',
            color: '#83BCFF',
        });

        this.dice = new GameDice(this, 560, 90);

        this.player = new Player(this, this.terrains[0]);
    }

    update()
    {

    }

    handleDiceRolled(dice: GameDice)
    {
        let landingCase = getLandingCase(this.player.position.caseNumber, dice.currentValue);

        this.player.updateTerrain(this.terrains[landingCase]);
        this.text.text = ResourceType[this.terrains[landingCase].type];
    }

    handleTerrainSwitch(terrain: Terrain)
    {
        terrain.onLanding();
        
    }
}
