import Phaser from "phaser";
import eventsCenter from "~/app/EventsCenter";
import Terrain from "~/app/Models/Terrain";

export default class CurrentTerrainInfos extends Phaser.Scene {

    currentTerrain: Terrain;
    terrainType: Phaser.GameObjects.Text;
    discoveryXp: Phaser.GameObjects.Text;

    constructor() {
        super('current-terrain-infos');
    }

    create()
    {
        let panel = this.add.graphics();

        panel.fillStyle(Phaser.Display.Color.ValueToColor('#f9e784').color, 0.75);
        panel.fillRoundedRect(530, 140, 260, 368, 15);
        
        let fontConfig = {
            fontFamily: 'Arial, serif',
            fontSize: '24px',
            color: '#191919',
        };

        let fontDetailsConfig = {
            fontFamily: 'Arial, serif',
            fontSize: '18px',
            color: '#191919',
        };
        
        this.add.text(600, 140, 'Current Field', fontConfig);
        this.terrainType = this.add.text(535, 180, 'Type: ?', fontDetailsConfig);
        this.discoveryXp = this.add.text(535, 200, 'Discovery: 0 / 0', fontDetailsConfig);

        eventsCenter.on('PLAYER_SWITCHED_TERRAIN', this.updateTerrain, this);
    }

    refreshInfos()
    {
        this.terrainType.text = `Type: ${this.currentTerrain.type}`;
        this.discoveryXp.text = `Discovery: ${this.currentTerrain.discoveryXp} / 0`
    }

    updateTerrain(terrain: Terrain)
    {
        this.currentTerrain = terrain;
        this.refreshInfos();
    }
}