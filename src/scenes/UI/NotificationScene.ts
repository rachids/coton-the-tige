import eventsCenter from "~/app/EventsCenter";
import { Position } from "~/app/Models/Types/Position";
import CotonTextStyle from "~/config/textstyle";
import colors from "~/utils/Colors";
import Fonts from "~/utils/Fonts";

export default class NotificationScene extends Phaser.Scene {
    constructor()
    {
        super('notification');
    }

    create()
    {
        eventsCenter.on('NOTIFY_PLAYER', this.handleNotification, this)
    }

    handleNotification(event: {message: string, position: Position }, fontConfig: Phaser.Types.GameObjects.Text.TextStyle = CotonTextStyle)
    {
        let posX = event.position.x - 30 ?? 200;
        let posY = event.position.y - 20 ?? 400;
        let message = event.message ?? '';

        let notification = this.add.text(posX, posY, message, fontConfig);

        this.tweens.add({
            targets: notification,
            duration: 200,
            y: posY - 25,
            ease: Phaser.Math.Easing.Sine.InOut,
            onComplete: this.removeNotification,
            completeDelay: 500,
        });
    }

    removeNotification(tween: Phaser.Tweens.Tween, targets: Phaser.GameObjects.Text[])
    {
        targets.forEach(item => { item.destroy() });
    }
}