"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATEAU = [100, 100];
exports.ORIENTATION = ['N', 'E', 'S', 'W'];
exports.STEP = 1;
exports.DEPLACEMENT = {
    'N': function ([x, y]) {
        return [x, (y + exports.STEP) % (exports.PLATEAU[1] + 1)];
    },
    'E': function ([x, y]) {
        return [(x + exports.STEP) % (exports.PLATEAU[0] + 1), y];
    },
    'S': function ([x, y]) {
        return [x, (((exports.PLATEAU[1] + 1) + y - exports.STEP) % (exports.PLATEAU[1] + 1))];
    },
    'W': function ([x, y]) {
        return [(((exports.PLATEAU[0] + 1) + x - exports.STEP) % (exports.PLATEAU[0] + 1)), y];
    },
};
exports.OPPOSITE_DIRECTION = {
    'N': 'S',
    'E': 'W',
    'S': 'N',
    'W': 'E'
};
exports.LIST_OBSTACLE = [
    {
        x: 10,
        y: 80
    },
    {
        x: 20,
        y: 20
    },
];
