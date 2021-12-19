import Phaser from 'phaser'
import Preloader from './scenes/Preloader';

import HelloWorldScene from './scenes/HelloWorldScene'
import ScoreScene from './scenes/UI/ScoreScene';
import CurrentTerrainInfos from './scenes/UI/CurrentTerrain';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: { }
	},
	scene: [
		Preloader,
		HelloWorldScene,

		// UI
		ScoreScene,
		CurrentTerrainInfos,
	]
}

export default new Phaser.Game(config)
