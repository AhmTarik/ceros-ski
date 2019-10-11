import "babel-polyfill";
import { Skier } from "../../Entities/Skier";
import { Rhino } from "../../Entities/Rhino";
import { Distance } from '../../Core/Distance';


import * as Constants from "../../Constants";


describe(`Rhino can hunt skier if`, () => {
    let _skier;
    let _rhino;
    let _distance;
    beforeEach(() => {
        initialize();
    });

    function initialize() {
        _skier = new Skier(0, 0);
        _rhino = new Rhino(0, 0);
        _distance = new Distance();
    }

    it(`after skier coverd ${Constants.DISTANCE_SKIED_TO_START_RHINO} distance`,
    () => {
        let currentSpeed = 10;
        _skier.turnDown();
        _skier.setSpeed(currentSpeed);
        for (let index = 0; index < (Constants.DISTANCE_SKIED_TO_START_RHINO/currentSpeed); index++) {
            _skier.move();
        }
        expect(_rhino.canHunt).toBe(false);
        _skier.move();
        expect(_rhino.canHunt).toBe(true);
        expect(_distance.distanceCovered).toBe(Constants.DISTANCE_SKIED_TO_START_RHINO);

    })

    it(`after a set amount of time ${Constants.RHINO_COUNTDOWN_TIME_TO_START_HUNTING}mSec and skier moved`,
        (doneCB) => {
            jest.setTimeout(Constants.RHINO_COUNTDOWN_TIME_TO_START_HUNTING + 1000);
            _skier.turnDown();
            _skier.move();
            _skier.move();
            setTimeout(() => {
                expect(_rhino.canHunt).toBe(true);
                doneCB();
            }, Constants.RHINO_COUNTDOWN_TIME_TO_START_HUNTING)
        })

       
});
