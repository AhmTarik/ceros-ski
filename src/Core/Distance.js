
import * as Constants from "../Constants";
export class Distance {

    constructor() {
        this.distanceCovered = 0;
        this.skierPosition = { x: 0, y: 0 };
        this.skierMoved = false;
        this.cutDistanceTriggered = false;
        // listen on skier postition
        document.addEventListener(Constants.SKI_EVENTS_ASSET.SKIER_SEND_POSITION, this.onSkierSendPosition.bind(this));
    }

    onSkierSendPosition(e) {
        if (!e || !e.detail) {
            return;
        }
        e.preventDefault();
        this.setSkierPosition(e.detail.position);
    }

    setSkierPosition(postition) {
        let oldPoistion = this.skierPosition;
        this.skierPosition = postition;
        this.setDistanceCovered(oldPoistion, postition);
    }

    calcDistance(oldPosition, newPosition) {
        let a = oldPosition.x - newPosition.x;
        let b = oldPosition.y - newPosition.y;
        return Math.sqrt(a * a + b * b);
    }

    setDistanceCovered(oldPoistion, newPosition) {
        let _distanceCovered = this.calcDistance(oldPoistion, newPosition);
        if (_distanceCovered > 0) {
            this.distanceCovered += this.calcDistance(oldPoistion, newPosition);
            this.checkSkierIsMoved();
            this.notifySkierDistanceCovered()
        }
    }

    checkSkierIsMoved() {
        if (this.skierMoved)
            return;
        if (this.distanceCovered > 0) {// notify skier start moved
            this.notifySkierMoved();
            this.skierMoved = true;
        }
    }

    notifySkierMoved() {
        let element = document;
        let event = document.createEvent("CustomEvent");
        event.initCustomEvent(Constants.SKI_EVENTS_ASSET.SKIER_MOVED, true, true, { moveAt: new Date() });
        element.dispatchEvent(event);
    }

    notifySkierDistanceCovered() {
        let element = document;
        let event = document.createEvent("CustomEvent");
        event.initCustomEvent(Constants.SKI_EVENTS_ASSET.SKIER_DISTANCE_COVERED, true, true, {
            distanceCovered: Number(this.distanceCovered).toFixed(0),
        });
        element.dispatchEvent(event);
    }
}