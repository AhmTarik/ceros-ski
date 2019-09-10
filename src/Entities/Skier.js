import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    isJumping = false;
    jumpingTimeout = {};

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        // check incoming direction value exist in SKIER_DIRECTION_ASSET object before set it to direction.
        if (Constants.SKIER_DIRECTION_ASSET[direction] != null) {
            this.direction = direction;
            this.updateAsset();
        }
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    setJumping(value) {
        if (this.isJumping !== value) {
            this.isJumping = value;
            this.updateTimeOut();
        }
    }

    updateTimeOut() {
        if (this.isJumping) {
            this.jumpingTimeout = setTimeout(() => { this.setJumping(false) }, Constants.JUMPING_TIME);
        } else {
            if (this.jumpingTimeout) {
                clearTimeout(this.jumpingTimeout);
                this.jumpingTimeout = null;
            }
        }
    }

    move() {
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else {
            // allow skier gets up after crashed when turn left
            this.setDirection(
                (this.direction - 1 < 0) ? Constants.SKIER_DIRECTIONS.LEFT : this.direction - 1
            );
        }
    }

    turnRight() {
        if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    jump() {
        //make skier jump
        if (this.direction === Constants.SKIER_DIRECTIONS.DOWN ||
            this.direction === Constants.SKIER_DIRECTIONS.LEFT_DOWN ||
            this.direction === Constants.SKIER_DIRECTIONS.RIGHT_DOWN
        )
        this.setJumping(true);

    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        //console.log(`asset manager is : ${JSON.stringify(assetManager)}`);
        //debugger;
        const asset = assetManager.getAsset(this.assetName);
        //console.log(`asset  is : ${JSON.stringify(asset)}`);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if (collision) {
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        }
    };
} 