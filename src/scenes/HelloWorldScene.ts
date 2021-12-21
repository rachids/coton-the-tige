import Phaser from 'phaser'
import GameDice from '~/app/Models/Dice/GameDice';
import Player from '~/app/Models/Player';
import { CasePosition } from '~/app/Models/CasePosition';
import getLandingCase from '~/app/Models/CasePosition';
import Terrain from '~/app/Models/Terrain';
import eventsCenter from '~/app/EventsCenter';
import score from '~/app/Stores';
import colors from '~/utils/Colors';
export default class HelloWorldScene extends Phaser.Scene
{
    dice!: GameDice;
    player!: Player;
    terrains: Terrain[];

	constructor()
	{
		super('hello-world')
        this.terrains = [];
	}

    create()
    {
        this.lights.enable();
        this.lights.setAmbientColor(colors.LAVENDER_GRAY);

        eventsCenter.on('dice-rolled', this.handleDiceRolled, this);
        eventsCenter.on('PLAYER_SWITCHED_TERRAIN', this.handleTerrainSwitch, this);
        this.add.image(400, 300, 'board').setPipeline('Light2D').setAlpha(0.8);

        this.lights.addLight(270, 260, 128, colors.TART_ORANGE, 3)

        // Instancier les terrains
        for(let i=0; i<16; i++) {
            this.terrains.push(
                new Terrain(this, CasePosition[i])
            )
        }

        this.dice = new GameDice(this, 560, 90);

        this.player = new Player(this, this.terrains[0]);

        this.scene.run('score-scene');
        this.scene.run('notification');
        this.scene.run('current-terrain-infos', this.player.currentTerrain);

        eventsCenter.on('NEW_TURN', this.player.restoreEnergy, this);
    }

    handleDiceRolled(dice: GameDice)
    {
        score.lastDiceValue = dice.currentValue;

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
