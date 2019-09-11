import * as Constants from "../Constants";
import { Entity } from "./Entity";

export class Rhino extends Entity {
    assetName = Constants.RHINO_LEFT;
    skierPosition;
    canHunt = false;
    catchIt = false;
    
    space = Constants.SPACE_BETWEEN_SKIER_AND_RHINO;
    speed = Constants.RHINO_STARTING_SPEED;

    constructor(x, y) {
        super(x, y);
        //listen to skier direction
        //document.addEventListener('skierDirectionChanged', this.onSkierDirectionChanged);
        
        document.addEventListener(Constants.SKI_EVENTS_ASSET.RHINO_CATCH_THE_SKIER, this.eat());
        
        setTimeout(
            () => {
                this.canHunt = true;
               // console.log(`the skier position in timeout is ${JSON.stringify(this.skierPosition)}`);
                //this.setPosition()
            }
            , 5000)
    }

    setSpace(){
        this.space = this.space - this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        if(this.space < 0){
            this.space = 0;
        }
    }

    setPosition() {
        this.x = this.skierPosition.x + this.space;
        this.y = this.skierPosition.y + this.space;
    }

    setSkierPosition(skierPosition){
        this.skierPosition = skierPosition;
    }

    setCatchIt(value){
        this.catchIt = value;
        //TODO notify the skier and eat function

    }

    draw(canvas, assetManager) {
        if (!this.canHunt)
            return;
        super.draw(canvas, assetManager);
    }

    move(skierPosition) {
        if(!this.canMove())
            return;
        //TODO start save skier position
        this.setSkierPosition(skierPosition);
        //TODO start move rhino to skier
        this.setPosition();
        if(this.canHunt ){
            //debugger;
            this.setSpace();
            // console.log(`rhino positio is x: ${this.x} y:${this.y}\n 
            // \n space is ${this.space}
            // \n speed is : ${this.speed}
            // \n skier position is x: ${this.skierPosition.x} y:${this.skierPosition.y}
            // `)
        }
    }

    eat() {
        //TODO start eat skier
        console.log('start eat the skier')
        //start update asset name every .25 sec
    }

    checkIfRhinoCathTheSkier(){
        if(this.space === 0){
            this.setCatchIt(true);
        }
    }



    //listen on skier direction
    onSkierDirectionChanged(e) {
        if (!e || !e.detail)
            return
        let data = { ...e.detail }
        if (data.direction === Constants.SKIER_DIRECTIONS.CATCH) {
            // start eat process
        }
        // console.log(`on rhino and skier direction is : ${JSON.stringify(data)}`);
    }








}