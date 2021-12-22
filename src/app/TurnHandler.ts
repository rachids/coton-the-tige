/**
 * This class is in charge of handling a turn : 
 * - fire events, set new position, fire actions etc. 
 */

import eventsCenter from "./EventsCenter";
import { getLandingCase } from "./Models/CasePosition";
import fieldManager from "./Services/FieldService";
import { gameState } from "./Stores/game";
import { playerState } from "./Stores/player";
import { scoreState } from "./Stores/score";

export const TurnHandler = {
    
    newTurn() {
        let currentField = playerState.fieldId;

        let landingFieldId = getLandingCase(currentField, gameState.lastDiceValue);
        let fieldDestination = fieldManager.getFieldAtPosition(landingFieldId);

        if (fieldDestination.id > 6) {
            playerState.setLeftStartOfBoard(true);
        }

        if (fieldDestination.id <= 6 && playerState.hasLeftStartOfBoard) {
            scoreState.turn++;
            playerState.setLeftStartOfBoard(false);
        }

        fieldDestination.onLanding();

        playerState.setFieldId(fieldDestination.id);

        eventsCenter.emit('PLAYER_SWITCHED_TERRAIN');
    }
};