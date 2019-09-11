export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const SKIER_JUMP = 'skierJump';

export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const JUMP_RAMP = 'jumpramp';

export const RHINO_LEFT = 'rhinoLeft';
export const RHINO_LEFT2 = 'rhinoLeft2';


export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;

export const SPACE_BETWEEN_SKIER_AND_RHINO = 300;
export const RHINO_STARTING_SPEED = 2;
export const RHINO_DIAGONAL_SPEED_REDUCER = 1.7354;



export const JUMPING_TIME = 1500;

export const OBSTACLE_COLLISION_ASSET = {
  [TREE]: {
    stepover: false,
    allowToJump: false
  },
  [TREE_CLUSTER]: {
    stepover: false,
    allowToJump: false
  },
  [ROCK1]: {
    stepover: true,
    allowToJump: false
  },
  [ROCK2]: {
    stepover: true,
    allowToJump: false
  },
  [JUMP_RAMP]: {
    stepover: true,
    allowToJump: true
  },
  [RHINO_LEFT]: {
    stepover: false,
    allowToJump: false,
    catch: true
  },
  [RHINO_LEFT2]: {
    stepover: false,
    allowToJump: false,
    catch: true
  },
}

export const ASSETS = {
  [SKIER_CRASH]: 'img/skier_crash.png',
  [SKIER_LEFT]: 'img/skier_left.png',
  [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
  [SKIER_DOWN]: 'img/skier_down.png',
  [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
  [SKIER_RIGHT]: 'img/skier_right.png',
  [TREE]: 'img/tree_1.png',
  [TREE_CLUSTER]: 'img/tree_cluster.png',
  [ROCK1]: 'img/rock_1.png',
  [ROCK2]: 'img/rock_2.png',
  [JUMP_RAMP]: 'img/jump_ramp.png',
  [SKIER_JUMP]: 'img/skier_jump_3.png',
  [RHINO_LEFT]: 'img/rhino_run_left.png',
  [RHINO_LEFT2]: 'img/rhino_run_left_2.png'

};

export const SKIER_DIRECTIONS = {
  CRASH: 0,
  LEFT: 1,
  LEFT_DOWN: 2,
  DOWN: 3,
  RIGHT_DOWN: 4,
  RIGHT: 5,
  JUMP: 6,
  CATCH: 7
};

export const SKIER_DIRECTION_ASSET = {
  [SKIER_DIRECTIONS.CRASH]: SKIER_CRASH,
  [SKIER_DIRECTIONS.LEFT]: SKIER_LEFT,
  [SKIER_DIRECTIONS.LEFT_DOWN]: SKIER_LEFTDOWN,
  [SKIER_DIRECTIONS.DOWN]: SKIER_DOWN,
  [SKIER_DIRECTIONS.RIGHT_DOWN]: SKIER_RIGHTDOWN,
  [SKIER_DIRECTIONS.RIGHT]: SKIER_RIGHT,
  [SKIER_DIRECTIONS.JUMP]: SKIER_JUMP
};

export const SKI_EVENTS_ASSET = {
  RHINO_CATCH_THE_SKIER: 'rhinoCatchTheSkier',
  GAME_OVER: 'gameOver',
  GAME_STOPPED_RESUME: 'gemeStoppedResume',
  SKIER_JUMP_STATUS: 'skierJumpStatus',
  RHINO_CAN_HUNT: 'rhinoCanHunt'
}

export const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  JUMP: 32, //space
  PAUSE: 80,
  PAUSE_CAPITA: 112,

};