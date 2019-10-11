import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";
import { SkiTimer } from "../Core/timer";


export class Skier extends Entity {
    assetName = Constants.SKIER_RIGHT;
    direction = Constants.SKIER_DIRECTIONS.RIGHT;
    speed;

    constructor(x, y) {
        super(x, y);
        this.isJumping = false;
        this.jumpingTimeout = {};
        this.skiTimer = new SkiTimer();
        this.setSpeed(Constants.SKIER_STARTING_SPEED);
        this.initEvents();
    }

    initEvents() {
        document.addEventListener(Constants.SKI_EVENTS_ASSET.RHINO_CAUGHT_THE_SKIER, this.onSkierCaught.bind(this));
        document.addEventListener(Constants.SKI_EVENTS_ASSET.GAME_STOPPED_RESUME, this.onGamePaused.bind(this));
    }

    setDirection(direction) {
        // check incoming direction value exist in SKIER_DIRECTION_ASSET object before set it to direction.
        if (Constants.SKIER_DIRECTION_ASSET[direction] != null && this.direction !== direction) {
            this.direction = direction;
            this.updateAsset();
        }
    }

    setSpeed(value) {
        this.speed = value;
        this.notifyCurrentSpeed();
    }

    increaseSpeed(speed = 1) {
        this.setSpeed(this.speed + speed)
    }

    updateAsset() {
        if (this.isJumping && this.direction != Constants.SKIER_DIRECTIONS.CRASH)
            this.assetName = Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.JUMP];
        else
            this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction]
     }

    setJumping(value) {
            this.isJumping = value;
            this.updateTimeOut();
            this.updateAsset();
    }

    updateTimeOut() {
        if (this.isJumping) {
            this.jumpingTimeout = this.skiTimer.createTimeout(() => { this.setJumping(false) }, Constants.JUMPING_TIME);
        } else if (this.jumpingTimeout) {
            this.skiTimer.cancelTimeout(this.jumpingTimeout)
        }
    }

    resetJumping() {
        this.skiTimer.cancelTimeout(this.jumpingTimeout);
        this.setJumping(true);
    }



    move() {
        this.notifySkierPosition();
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
        if (this.direction !== Constants.SKIER_DIRECTIONS.CAUGHT)
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

    getObstacleCollisionAsset(obstacleName) {
        return Constants.OBSTACLE_COLLISION_ASSET[obstacleName];
    }

    checkIfSkierAllowedToStepover(name) {
        let _obstacleAsset = this.getObstacleCollisionAsset(name);
        // allow to jump based on obstacle type and jumping status
        if (_obstacleAsset && _obstacleAsset.stepover) {
            return _obstacleAsset.stepover && (this.checkIfSkierAllowedToJump(name) || this.isJumping);
        }
        return false;
    }

    checkIfSkierAllowedToJump(name) {
        let _obstacleAsset = this.getObstacleCollisionAsset(name);
        if (_obstacleAsset && _obstacleAsset.allowToJump) {
            return _obstacleAsset.allowToJump
        }
        return false;
    }

    checkIfSkierCatched(name) {
        let _obstacleAsset = this.getObstacleCollisionAsset(name);
        if (_obstacleAsset && _obstacleAsset.catch) {
            return _obstacleAsset.catch
        }
        return false;
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
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
            return intersectTwoRects(skierBounds, obstacleBounds) ? obstacle.getAssetName() : false;
        });

        if (collision) {
            if (this.checkIfSkierAllowedToStepover(collision.assetName)) {
                // use the ramp asset to have the skier jump whenever he hits a ramp.
                if (this.checkIfSkierAllowedToJump(collision.assetName)) {
                    this.resetJumping();
                }
            } else {
                this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            }
        }
    };

    onSkierCaught(e) {
        if (!e || !e.detail) {
            return;
        }
        e.preventDefault();
        this.setDirection(Constants.SKIER_DIRECTIONS.CAUGHT)
    }

    onGamePaused(e) {
        if (!e || !e.detail || e.detail.gamePaused == null) {
            return;
        }
        e.preventDefault();

        if (e.detail.gamePaused)
            this.skiTimer.cancelTimeout(this.jumpingTimeout);
        else
            this.skiTimer.resumeTimeout(this.jumpingTimeout)
    }

    notifySkierPosition() {
        let element = document;
        let event = document.createEvent("CustomEvent");
        event.initCustomEvent(Constants.SKI_EVENTS_ASSET.SKIER_SEND_POSITION, true, true, {
            position: this.getPosition()
        });
        element.dispatchEvent(event);
    }

    notifyCurrentSpeed() {
        let element = document;
        let event = document.createEvent("CustomEvent");
        event.initCustomEvent(Constants.SKI_EVENTS_ASSET.SKIER_CURRENT_SPEED, true, true, {
            speed: this.speed
        });
        element.dispatchEvent(event);
    }
} 