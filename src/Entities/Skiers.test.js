import "babel-polyfill";
import { Skier } from "../Entities/Skier";
import * as Constants from "../Constants";


describe(`Skier direction valid if`, () => {
    let _skier;
    beforeEach(() => {
        initializeSkier();
      });
      
    it(`disallow set not valid direction`, () => {
        let currentDirection = _skier.direction;
        _skier.setDirection(-576767676);
        expect(_skier.direction).toBe(currentDirection);
    });

    it(`allow skier gets up after crashed when turn left <--`, () => {
        // crashing the skier
        _skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        // make sure skier is crashed
        expect(_skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
        // turn skier to left
        _skier.turnLeft();
        // expected skier gets up after crashed
        expect(_skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
    });

    it(`allow skier gets up after crashed when turn right -->`, () => {
        // crashing the skier
        _skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        // make sure skier is crashed
        expect(_skier.direction).toBe(Constants.SKIER_DIRECTIONS.CRASH);
        // turn skier to right
        _skier.turnRight();
        // expected skier gets up after crashed
        expect(_skier.direction).not.toBe(Constants.SKIER_DIRECTIONS.CRASH);
    });


    function initializeSkier(){
        _skier = new Skier(0,0);
    }


});