import "babel-polyfill";
import { Skier } from "../../Entities/Skier";
import { Distance } from '../../Core/Distance';
import { Dashboard } from '../../Core/Dashboard';
 import * as Constants from "../../Constants";
 import { Canvas } from '../../Core/Canvas';

describe(`dashboard controls valid if`, () => {
    let _skier;
    let _distance;
    let _dashboard;
    let _canvas;
    beforeEach(() => {
        initialize();
    });

    function initialize() {
        _canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        _skier = new Skier(0, 0);
        _distance = new Distance();
        _dashboard = new Dashboard();
    }
    it(`should update speed control value when skier speed increased`,()=>{
        let currentSpeed =10;
        _skier.setSpeed(currentSpeed);
        let selectedControl = document.querySelector('[speed] span');
        expect(selectedControl.textContent).toBe(currentSpeed.toString());
        currentSpeed=11
        _skier.increaseSpeed(1);
        expect(selectedControl.textContent).toBe(currentSpeed.toString());
    })

    it(`should update distance covered control value when skier moved`,()=>{
        _skier.setSpeed(10);
        _skier.turnDown();
        _skier.move();
        _skier.move();
        let actualDistance = 10;
        let selectedControl = document.querySelector('[scores] span');
        expect(selectedControl.textContent).toBe(actualDistance.toString());
        _skier.move();
        _skier.move();
        actualDistance = 30;
        expect(selectedControl.textContent).toBe(actualDistance.toString());
    })

})