import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { SkiTimer } from "../Core/timer";

export class Rhino extends Entity {
    
    
    constructor(x, y) {
        super(x, y);
        this.skierPosition;
        this.canHunt = false;
        this.catchIt = false;
        this.startEat = false;
        this.direction = Constants.RHINO_DIRECTOIN.LEFT;
        this.space = Constants.SPACE_BETWEEN_SKIER_AND_RHINO;
        this.speed = Constants.RHINO_STARTING_SPEED;
        this.skiTimer = new SkiTimer();
        this.rhinoSkiTimer = this.skiTimer.createTimeout(
            ()=>{
                this.canHunt = true;
            },5000
        );
        document.addEventListener(Constants.SKI_EVENTS_ASSET.GAME_STOPPED_RESUME, this.onGamePaused.bind(this));

        // setTimeout(
        //     () => {
        //         this.canHunt = true;
        //         // console.log(`the skier position in timeout is ${JSON.stringify(this.skierPosition)}`);
        //         //this.setPosition()
        //     }
        //     , 5000)
    }

    setDirection(direction){
        if (Constants.RHINO_DIRECTION_ASSET[direction] != null && this.direction !== direction) {
            this.direction = direction;
            this.updateAsset();
        }
    }

    updateAsset() {
            this.assetName = Constants.RHINO_DIRECTION_ASSET[this.direction]
    }

    setSpace() {
        this.space = this.space - this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        if (this.space < 0) {
            this.space = 0;
        }
    }

    setPosition() {
        this.x = this.skierPosition.x + this.space;
        this.y = this.skierPosition.y - this.space;
    }

    setSkierPosition(skierPosition) {
        this.skierPosition = skierPosition;
    }

    setCatchIt(value) {
        this.catchIt = value;
    }

    draw(canvas, assetManager) {
        if (!this.canHunt)
            return;
        super.draw(canvas, assetManager);
    }


    move(skierPosition) {
        // start save skier position
        this.setSkierPosition(skierPosition);
        // start move rhino to skier position
        this.setPosition();
        if (this.canHunt) {
            this.setSpace();
        }

        // change asset img for runing direction
        if(!this.startEat){
            this.setDirection(this.getRhinoRuningDirectionAsset());
        }
    }

    eat() {
       // console.log('start eat the skier')
        // Start notify the skier to stop move
        this.notifySkierBeenCaught();
        // start eat skier
        //start update eat asset's name every .25 sec
        let _moveCounter = Constants.RHINO_DIRECTOIN.LIFT;
        let eatAnimate = setInterval(() => {
            if(_moveCounter == Constants.RHINO_DIRECTOIN.LIFT_EAT_4){
                clearInterval(eatAnimate);
                // notify game over
                this.notifyGameOver();
            }
            this.setDirection(_moveCounter);
            _moveCounter++;
        }, Constants.RHINO_EAT_SLIDER_TIME_INTERVAL)
        this.startEat = true;
    }


    checkIfRhinoCathTheSkier() {
        if (this.space === 0 && !this.startEat) {
            this.setCatchIt(true);
            //start eat the skier
            this.eat();
        }
    }

    getRhinoRuningDirectionAsset(){
       return  Math.random() < 0.5 ? Constants.RHINO_DIRECTOIN.LEFT : Constants.RHINO_DIRECTOIN.LEFT_2;
    }


    notifyGameOver() {
        let element = document;
        let event = document.createEvent("CustomEvent");
        event.initCustomEvent(Constants.SKI_EVENTS_ASSET.GAME_OVER, true, true, { gameOver: true });
        element.dispatchEvent(event);
    }

    notifySkierBeenCaught() {
        let element = document;
        let event = document.createEvent("CustomEvent");
        event.initCustomEvent(Constants.SKI_EVENTS_ASSET.RHINO_CAUGHT_THE_SKIER, true, true, { rhinoCaugthSkier: true });
        element.dispatchEvent(event);
    }

    onGamePaused(e) {
        if (!e || !e.detail || e.detail.gamePaused == null) {
            e.preventDefault();
            return;
        }
        console.log(`inside rhino onGampaused ,gamePaused is ${e.detail.gamePaused}`)
        if(e.detail.gamePaused)
            this.skiTimer.cancelTimeout(this.rhinoSkiTimer);
        else
            this.skiTimer.resumeTimeout(this.rhinoSkiTimer)
        e.preventDefault();
    }

}