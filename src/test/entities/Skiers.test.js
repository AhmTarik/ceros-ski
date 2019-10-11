import "babel-polyfill";
import { Skier } from "../../Entities/Skier";
import * as Constants from "../../Constants";


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


    function initializeSkier() {
        _skier = new Skier(0, 0);
    }


});

describe(`Skier Jumping feature valid if`, () => {
    let _skier;

    beforeEach(() => {
        _skier = new Skier(0, 0);
    });

    it(`skier not jumping when initialized`, () => {
        expect(_skier.isJumping).toBe(false);
    });

    it(`skier stop jumping after ${Constants.JUMPING_TIME}mSec`, (doneCB) => {
        jest.setTimeout(Constants.JUMPING_TIME+101)
        expect(_skier.isJumping).toBe(false);
        _skier.turnDown();
        _skier.jump();
        expect(_skier.isJumping).toBe(true);
        let resTimeout = setTimeout(()=>{
            expect(_skier.isJumping).toBe(false);
            doneCB();
        },Constants.JUMPING_TIME+100);
    });

    it(`allow to jump when skier direction to down and dircetion does not change`, () => {
        expect(_skier.isJumping).toBe(false);
        _skier.turnDown();
        _skier.jump();
        expect(_skier.isJumping).toBe(true);
        expect(_skier.direction).toBe(Constants.SKIER_DIRECTIONS.DOWN);
    });

    it(`allow to jump when skier direction to right-down and dircetion does not change`, () => {
        expect(_skier.isJumping).toBe(false);
        let currenDirection = Constants.SKIER_DIRECTIONS.RIGHT_DOWN
        _skier.setDirection(currenDirection);
        _skier.jump();
        expect(_skier.isJumping).toBe(true);
        expect(_skier.direction).toBe(currenDirection);
    });

    it(`allow to jump when skier direction to left-down and dircetion does not change`, () => {
        expect(_skier.isJumping).toBe(false);
        let currenDirection = Constants.SKIER_DIRECTIONS.LEFT_DOWN
        _skier.setDirection(currenDirection);
        _skier.jump();
        expect(_skier.isJumping).toBe(true);
        expect(_skier.direction).toBe(currenDirection);
    });

    it(`not allowed to jump when skier direction to right`, () => {
        expect(_skier.isJumping).toBe(false);
        let currenDirection = Constants.SKIER_DIRECTIONS.RIGHT
        _skier.setDirection(currenDirection);
        _skier.jump();
        expect(_skier.isJumping).toBe(false);
        expect(_skier.direction).toBe(currenDirection);
    });

    it(`not allowed to jump when skier direction to left`, () => {
        expect(_skier.isJumping).toBe(false);
        let currenDirection = Constants.SKIER_DIRECTIONS.LEFT
        _skier.setDirection(currenDirection);
        _skier.jump();
        expect(_skier.isJumping).toBe(false);
        expect(_skier.direction).toBe(currenDirection);
    });

    it(`not allowed to jump when skier direction to left`, () => {
        expect(_skier.isJumping).toBe(false);
        let currenDirection = Constants.SKIER_DIRECTIONS.LEFT
        _skier.setDirection(currenDirection);
        _skier.jump();
        expect(_skier.isJumping).toBe(false);
        expect(_skier.direction).toBe(currenDirection);
    });

    it(`not allowed to jump when skier was crashed`, () => {
        expect(_skier.isJumping).toBe(false);
        let currenDirection = Constants.SKIER_DIRECTIONS.CRASH
        _skier.setDirection(currenDirection);
        _skier.jump();
        expect(_skier.isJumping).toBe(false);
        expect(_skier.direction).toBe(currenDirection);
    });

    it(`not allowed to jump when skier was caught`, () => {
        expect(_skier.isJumping).toBe(false);
        let currenDirection = Constants.SKIER_DIRECTIONS.CAUGHT
        _skier.setDirection(currenDirection);
        _skier.jump();
        expect(_skier.isJumping).toBe(false);
        expect(_skier.direction).toBe(currenDirection);
    });



});

