import eventsCenter from "~/app/EventsCenter";
import { Position } from "~/app/Models/Types/Position";

const Notify = {
    NOTIFICATION_EVENT_NAME: 'NOTIFY_PLAYER',

    sendMessage(message: string, position: Position)
    {
        eventsCenter.emit(
            this.NOTIFICATION_EVENT_NAME, 
            { 
                message: message, 
                position: position, 
            }
        );
    }
};

export default Notify;