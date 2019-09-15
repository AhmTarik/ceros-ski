
import * as Constants from "../Constants";

export class Dashboard {

    constructor() {
        this.initEvents();
    }

    initEvents() {
        document.addEventListener(Constants.SKI_EVENTS_ASSET.GAME_STOPPED_RESUME, this.onGamePaused.bind(this));
        document.addEventListener(Constants.SKI_EVENTS_ASSET.SKIER_DISTANCE_COVERED, this.onSkierDistanceCovered.bind(this));
        document.addEventListener(Constants.SKI_EVENTS_ASSET.SKIER_CURRENT_SPEED, this.onSkierCurrentSpeed.bind(this));
    }

    setValueToElement(selector, value) {
        let elem = document.querySelector(selector);
        if (!elem || value == null)
            return;
        elem.textContent = value;
    }


    onGamePaused(e) {
        if (!e || !e.detail)
            return;
        e.preventDefault();
        this.setValueToElement('[status] span',
            e.detail.gamePaused ? 'Paused' : 'Playing');

    }

    onSkierDistanceCovered(e) {
        if (!e || !e.detail) {
            return;
        }
        e.preventDefault();
        this.setValueToElement('[scores] span', e.detail.distanceCovered);
    }

    onSkierCurrentSpeed(e) {
        if (!e || !e.detail) {
            return;
        }
        e.preventDefault();
        this.setValueToElement('[speed] span', e.detail.speed);
    }


}