/**
 * This class is in charge of handling a turn : 
 * - fire events, set new position, fire actions etc. 
 */

import eventsCenter from "./EventsCenter";
import { getLandingCase } from "./Models/CasePosition";
import EnergyManager from "./Services/Resources/Managers/EnergyManager";
import fieldState from "./Stores/fields";
import { gameState } from "./Stores/game";
import { playerState } from "./Stores/player";
import { scoreState } from "./Stores/score";

export const TurnHandler = {
    
    newTurn() {
        let currentField = playerState.fieldId;

        let landingFieldId = getLandingCase(currentField, gameState.lastDiceValue);
        let fieldDestination = fieldState.getFieldById(landingFieldId);

        if (fieldDestination.id > 6) {
            playerState.setLeftStartOfBoard(true);
        }

        if (fieldDestination.id <= 6 && playerState.hasLeftStartOfBoard) {
            scoreState.incrementsTurn();
            playerState.setLeftStartOfBoard(false);
            let energyManager = new EnergyManager();
            energyManager.refillOnNewTurn();
        }

        fieldDestination.onLanding();

        playerState.setFieldId(fieldDestination.id);

        eventsCenter.emit('PLAYER_SWITCHED_TERRAIN');
    }
};