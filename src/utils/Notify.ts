import eventsCenter from "~/app/EventsCenter";
import { Position } from "~/app/Models/Types/Position";

export enum NotificationType {
    STATS,
    INFO,
    ALERT,
}

export const Notify = {
    NOTIFICATION_EVENT_NAME: 'NOTIFY_PLAYER',

    sendMessage(message: string, position: Position, type: NotificationType = NotificationType.STATS)
    {
        eventsCenter.emit(
            this.NOTIFICATION_EVENT_NAME, 
            { 
                message: message, 
                position: position,
                notificationType: type,
            }
        );
    }
};