
import * as Constants from "../Constants";

export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    gamePaused = false;
    gameOver = false;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        let element = document;
        element.addEventListener(Constants.SKI_EVENTS_ASSET.GAME_OVER, this.setGameOver.bind(this));
        element.addEventListener('gemeStoppedResume', this.setGamePaused.bind(this));
    }

    getAssetName() {
        return this.assetName;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    draw(canvas, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }

    setGameOver(e) {
        if(!e || !e.detail || !e.detail.gameOver == null){
            e.preventDefault();
            return;
        }
        this.gameOver = e.detail.gameOver;
        e.preventDefault();
    }

    setGamePaused(event) {
        if(!event || !event.detail || !event.detail.gamePaused == null){
            //console.log('empty')
            event.preventDefault();
            return;
        }
           // debugger;
        this.gamePaused = event.detail.gamePaused;
        event.preventDefault();
       
    }

    canMove(){
        return !(this.gamePaused || this.gameOver);
    }
}