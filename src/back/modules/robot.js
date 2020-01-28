"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function genereteNewRobot(plateau, orientation) {
    return {
        position: generateRandomCoord(plateau[0], plateau[1]),
        orientation: generateRandomOrientation(orientation)
    };
}
exports.genereteNewRobot = genereteNewRobot;
function generateRandomCoord(xmax, ymax) {
    return [utils_1.generateRandom(xmax), utils_1.generateRandom(ymax)];
}
exports.generateRandomCoord = generateRandomCoord;
;
function generateRandomOrientation(orientation) {
    return orientation[utils_1.generateRandom(orientation.length)];
}
exports.generateRandomOrientation = generateRandomOrientation;
;
function turnRight(robot, orientation) {
    return {
        position: robot.position,
        orientation: orientation[(orientation.indexOf(robot.orientation) + 1) % orientation.length]
    };
}
exports.turnRight = turnRight;
function turnLeft(robot, orientation) {
    return {
        position: robot.position,
        orientation: orientation[(orientation.length + (orientation.indexOf(robot.orientation) - 1)) % orientation.length]
    };
}
exports.turnLeft = turnLeft;
function forward(robot, deplacement) {
    return {
        position: deplacement[robot.orientation](robot.position),
        orientation: robot.orientation
    };
}
exports.forward = forward;
function backward(robot, deplacement, opposite_direction) {
    return {
        position: deplacement[opposite_direction[robot.orientation]](robot.position),
        orientation: robot.orientation
    };
}
exports.backward = backward;
function printRobot(robot) {
    let xpos = robot.position[0];
    let ypos = robot.position[1];
    let direction = robot.orientation;
    console.log(`Le robot se situe à la position ${xpos};${ypos}, il est orienté vers ${direction} `);
}
exports.printRobot = printRobot;
