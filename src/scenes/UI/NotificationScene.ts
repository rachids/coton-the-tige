import eventsCenter from "~/app/EventsCenter";
import { Position } from "~/app/Models/Types/Position";
import colors from "~/utils/Colors";
import { Fonts, CotonTextStyle } from "~/utils/Fonts";
import { NotificationType } from "~/utils/Notify";

export default class NotificationScene extends Phaser.Scene {
    constructor()
    {
        super('notification');
    }

    create()
    {
        eventsCenter.on('NOTIFY_PLAYER', this.handleNotification, this)
    }

    handleNotification(event: {message: string, position: Position, notificationType: NotificationType })
    {
        let posX = event.position.x - 30 ?? 200;
        let posY = event.position.y - 20 ?? 400;
        let message = event.message ?? '';

        let notification = this.add.text(posX, posY, message, this.getTextConfiguration(event.notificationType));

        this.tweens.add({
            targets: notification,
            duration: 200,
            y: posY < 113 ? posY + 25 : posY - 25,
            ease: Phaser.Math.Easing.Sine.InOut,
            onComplete: this.removeNotification,
            completeDelay: this.getNotificationDuration(event.notificationType),
        });
    }

    removeNotification(tween: Phaser.Tweens.Tween, targets: Phaser.GameObjects.Text[])
    {
        targets.forEach(item => { item.destroy() });
    }

    getNotificationDuration(notificationType: NotificationType): number
    {
        switch (notificationType) {
            case NotificationType.STATS:
                return 500;

            case NotificationType.INFO:
            case NotificationType.ALERT:
                return 2000;

            default:
                return 500;
        }
    }

    getTextConfiguration(notificationType: NotificationType): Phaser.Types.GameObjects.Text.TextStyle
    {
        switch (notificationType) {
            case NotificationType.STATS:
                return {
                    fontFamily: Fonts.forStats,
                    fontSize: '20px',
                    color: colors.convertColorToString(colors.LAVENDER_GRAY),
                    fixedWidth: 94,
                };
            
            case NotificationType.INFO:
                return {
                    fontFamily: Fonts.forLabel,
                    fontSize: '20px',
                    color: colors.convertColorToString(colors.OLD_BURGUNDY),
                    backgroundColor: colors.convertColorToString(colors.CARRIBEAN_GREEN),
                    fixedWidth: 280,
                    wordWrap: {
                        width: 260,
                    },
                    padding: {
                        x: 10,
                        y: 5,
                    },
                };
            
            case NotificationType.ALERT:
                return {
                    fontFamily: Fonts.forLabel,
                    fontSize: '20px',
                    color: colors.convertColorToString(colors.LAVENDER_GRAY),
                    backgroundColor: colors.convertColorToString(colors.FRENCH_RASPBERRY),
                    fixedWidth: 280,
                    wordWrap: {
                        width: 260,
                    },
                    padding: {
                        x: 10,
                        y: 5,
                    },
                };
        
            default:
                return CotonTextStyle;
        }
    }
}