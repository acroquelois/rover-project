"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const robot_1 = require("./modules/robot");
const obstacle_1 = require("./modules/obstacle");
const configuration_1 = require("./configuration");
function moveForward(robot, deplacement, obstacles, opposite_direction, orientation) {
    let deplacedRobot = robot_1.forward(robot, deplacement);
    let encounteredObstacle = obstacles.filter(x => obstacle_1.isInObstacle(deplacedRobot.position, x));
    if (encounteredObstacle.length > 0) {
        return robot;
    }
    else {
        return deplacedRobot;
    }
}
exports.moveForward = moveForward;
function moveBackward(robot, deplacement, obstacles, opposite_direction, orientation) {
    let deplacedRobot = robot_1.backward(robot, deplacement, opposite_direction);
    let encounteredObstacle = obstacles.filter(x => obstacle_1.isInObstacle(deplacedRobot.position, x));
    if (encounteredObstacle.length > 0) {
        return robot;
    }
    else {
        return deplacedRobot;
    }
}
exports.moveBackward = moveBackward;
function moveTurnLeft(robot, deplacement, obstacles, opposite_direction, orientation) {
    return robot_1.turnLeft(robot, orientation);
}
exports.moveTurnLeft = moveTurnLeft;
function moveTurnRight(robot, deplacement, obstacles, opposite_direction, orientation) {
    return robot_1.turnRight(robot, orientation);
}
exports.moveTurnRight = moveTurnRight;
exports.COMMAND = {
    'a': moveForward,
    'r': moveBackward,
    'g': moveTurnLeft,
    'd': moveTurnRight
};
const reducer = (robot, command) => exports.COMMAND[command](robot, configuration_1.DEPLACEMENT, configuration_1.LIST_OBSTACLE, configuration_1.OPPOSITE_DIRECTION, configuration_1.ORIENTATION);
function commandReader(robot, listcommand) {
    let newRobot = listcommand.reduce(reducer, robot);
    return newRobot;
}
exports.commandReader = commandReader;
