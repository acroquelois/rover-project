"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isInObstacle([x, y], obstacle) {
    return obstacle.x === x && obstacle.y === y;
}
exports.isInObstacle = isInObstacle;
