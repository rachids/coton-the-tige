/**
 * This class is in charge of handling a turn : 
 * - fire events, set new position, fire actions etc. 
 */

import { getLandingCase } from "./Models/CasePosition";
import fieldManager from "./Services/FieldService";
import playerManager from "./Services/PlayerService";
import score from "./Stores";

export const TurnHandler = {
    
    newTurn() {
        let player = playerManager.player;

        let currentField = player.getFieldId();

        let landingFieldId = getLandingCase(currentField, score.lastDiceValue);
        let fieldDestination = fieldManager.getFieldAtPosition(landingFieldId);

        fieldDestination.onLanding();

        player.updateTerrain(fieldDestination);
    }
};