import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';

export class Game {
    gameWindow = null;
    gamePaused = false;
    gameOver = false;
    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.rhino = new Rhino(0, 0);
        this.obstacleManager = new ObstacleManager();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        this.skier.move();
        const skierPosition = this.skier.getPosition();
        this.rhino.move(skierPosition);
        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
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

    pauseGame() {

        this.gamePaused = !this.gamePaused;
        // notify
        let element = document;
        let event = document.createEvent("CustomEvent");
        event.initCustomEvent('gemeStoppedResume', true, false, { gamePaused: this.gamePaused });
        element.dispatchEvent(event);
    }

    canPlay() {
        let res =
            (
                ([Constants.KEYS.PAUSE, Constants.KEYS.PAUSE_CAPITA].includes(event.which))
                ||
                !this.gamePaused
            )
            &&
            !this.gameOver;

        return res;
    }



    handleKeyDown(event) {
        // debugger;
        if (!this.canPlay()) {
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
            case Constants.KEYS.PAUSE_CAPITA:
                this.pauseGame();
                event.preventDefault();
                break;
        }
    }
}