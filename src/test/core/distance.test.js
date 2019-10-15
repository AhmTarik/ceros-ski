import "babel-polyfill";
import { Distance } from '../../Core/Distance';

test('should distance between two points equal to_10_When two points 0,0 - 0,10', () => {
    let _distance = new Distance();
    expect(_distance.calcDistance({ x: 0, y: 0 }, { x: 0, y: 10 })).toBe(10);
});

test('should skierMoved be true two poinst 0,0 - 10,10', () => {
    let _distance = new Distance();
    _distance.setSkierPosition({ x: 10, y: 10 })
    expect(_distance.skierMoved).toBe(true);
});









