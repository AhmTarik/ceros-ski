import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { Distance } from './Distance'
import { Dashboard } from "./dashboard";

export class Game {
    gameWindow = null;


    constructor() {

        this.gamePaused = false;
        this.rhinoCaughtTheSkier = false;
        this.distance = new Distance();
        this.dashboard = new Dashboard();
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.rhino = new Rhino(0, 0);
        this.obstacleManager = new ObstacleManager();
        }

    

    init() {
        this.obstacleManager.placeInitialObstacles();
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener(Constants.SKI_EVENTS_ASSET.GAME_OVER, this.onGameOverChange.bind(this));
        document.addEventListener(Constants.SKI_EVENTS_ASSET.RHINO_CAUGHT_THE_SKIER, this.onRhinoCaughtTheSkier.bind(this));
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        if (!this.canPlay())
            return requestAnimationFrame(this.run.bind(this));
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        this.skier.move();
        this.rhino.move();
        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
        this.rhino.checkIfRhinoCathTheSkier();
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        this.skier.draw(this.canvas, this.assetManager);
        this.rhino.draw(this.canvas, this.assetManager);

        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    restart() {
        // simple way
        window.location.reload(true);
    }

    pauseGame() {
        if (!this.canPause())
            return;
        this.gamePaused = !this.gamePaused;
        // notify game pused or resume
        let element = document;
        let event = document.createEvent("CustomEvent");
        event.initCustomEvent(Constants.SKI_EVENTS_ASSET.GAME_STOPPED_RESUME, true, false, { gamePaused: this.gamePaused });
        element.dispatchEvent(event);
    }

    canPlay(number = -10) {
        return (
            (Constants.KEYS.PAUSE === number || !this.gamePaused)
            ||
            Constants.KEYS.RESTART === number
        );
    }

    // can't stop the game when rhino caught the skier
    canPause() {
        return !this.rhinoCaughtTheSkier;
    }

    onGameOverChange(e) {
        if (!e || !e.detail || !e.detail.gameOver == null) {
            return;
        }
        e.preventDefault();
        this.restart();
    }

    onRhinoCaughtTheSkier(e) {
        if (!e || !e.detail) {
            return;
        }
        e.preventDefault();
        this.rhinoCaughtTheSkier = true;
    }

    handleKeyDown(event) {

        if (!this.canPlay(event.which)) {
            event.preventDefault();
            return
        }
        switch (event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.JUMP:
                this.skier.jump();
                event.preventDefault();
                break;
            case Constants.KEYS.PAUSE:
                this.pauseGame();
                event.preventDefault();
                break;
            case Constants.KEYS.FAST:
                this.skier.increaseSpeed(1);
                event.preventDefault();
                break;
        }
    }
}