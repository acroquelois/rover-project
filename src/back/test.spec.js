"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const robot_1 = require("./modules/robot");
const obstacle_1 = require("./modules/obstacle");
const configuration_1 = require("./configuration");
const utils_1 = require("./modules/utils");
const game_1 = require("./game");
describe('Test du robot:', () => {
    describe('Initialisation:', () => {
        it("Génération d'un nombre aléatoire", () => {
            expect(utils_1.generateRandom(1)).toBe(0);
        });
        it("Génération de coordonnée aléatoire", () => {
            expect(robot_1.generateRandomCoord(1, 1)).toStrictEqual([0, 0]);
        });
        it("Génération d'une orientation aléatoire", () => {
            expect(configuration_1.ORIENTATION).toContain(robot_1.generateRandomOrientation(configuration_1.ORIENTATION));
        });
    });
    describe("Changement d'orientation:", () => {
        it('Tourner vers la droite depuis N', () => {
            let robot = { position: [50, 50], orientation: 'N' };
            expect(robot_1.turnRight(robot, configuration_1.ORIENTATION)).toStrictEqual({ position: [50, 50], orientation: 'E' });
        });
        it('Tourner vers la droite depuis W', () => {
            let robot = { position: [50, 50], orientation: 'W' };
            expect(robot_1.turnRight(robot, configuration_1.ORIENTATION)).toStrictEqual({ position: [50, 50], orientation: 'N' });
        });
        it('Tourner vers la gauche depuis S', () => {
            let robot = { position: [50, 50], orientation: 'S' };
            expect(robot_1.turnLeft(robot, configuration_1.ORIENTATION)).toStrictEqual({ position: [50, 50], orientation: 'E' });
        });
        it('Tourner vers la gauche depuis N', () => {
            let robot = { position: [50, 50], orientation: 'N' };
            expect(robot_1.turnLeft(robot, configuration_1.ORIENTATION)).toStrictEqual({ position: [50, 50], orientation: 'W' });
        });
    });
    describe("Déplacement Robot:", () => {
        describe("Avancer:", () => {
            it('Avancer en haut', () => {
                let robot = { position: [50, 50], orientation: 'N' };
                expect(robot_1.forward(robot, configuration_1.DEPLACEMENT)).toStrictEqual({ position: [50, 51], orientation: 'N' });
            });
            it('Avancer sur le coté', () => {
                let robot = { position: [50, 50], orientation: 'E' };
                expect(robot_1.forward(robot, configuration_1.DEPLACEMENT)).toStrictEqual({ position: [51, 50], orientation: 'E' });
            });
            it('Avancer bordure de map en haut ', () => {
                let robot = { position: [50, 100], orientation: 'N' };
                expect(robot_1.forward(robot, configuration_1.DEPLACEMENT)).toStrictEqual({ position: [50, 0], orientation: 'N' });
            });
            it('Avancer bordure de map sur le coté ', () => {
                let robot = { position: [100, 50], orientation: 'E' };
                expect(robot_1.forward(robot, configuration_1.DEPLACEMENT)).toStrictEqual({ position: [0, 50], orientation: 'E' });
            });
        });
        describe("Reculer:", () => {
            it('Reculer en bas', () => {
                let robot = { position: [50, 50], orientation: 'N' };
                expect(robot_1.backward(robot, configuration_1.DEPLACEMENT, configuration_1.OPPOSITE_DIRECTION)).toStrictEqual({ position: [50, 49], orientation: 'N' });
            });
            it('Reculer de coté', () => {
                let robot = { position: [50, 50], orientation: 'E' };
                expect(robot_1.backward(robot, configuration_1.DEPLACEMENT, configuration_1.OPPOSITE_DIRECTION)).toStrictEqual({ position: [49, 50], orientation: 'E' });
            });
            it('Reculer bordure de map sur le coté', () => {
                let robot = { position: [0, 50], orientation: 'E' };
                expect(robot_1.backward(robot, configuration_1.DEPLACEMENT, configuration_1.OPPOSITE_DIRECTION)).toStrictEqual({ position: [100, 50], orientation: 'E' });
            });
            it('Reculer bordure de map en bas', () => {
                let robot = { position: [50, 0], orientation: 'N' };
                expect(robot_1.backward(robot, configuration_1.DEPLACEMENT, configuration_1.OPPOSITE_DIRECTION)).toStrictEqual({ position: [50, 100], orientation: 'N' });
            });
        });
    });
});
describe('Test des obstacles:', () => {
    it("Test de coordonée dans l'obstacle", () => {
        let obstacle = {
            x: 10,
            y: 80
        };
        expect(obstacle_1.isInObstacle([10, 80], obstacle)).toBeTruthy();
    });
    it("Test de coordonée en dehors de l'obstacle", () => {
        let obstacle = {
            x: 10,
            y: 80
        };
        expect(obstacle_1.isInObstacle([10, 85], obstacle)).toBeFalsy();
    });
});
describe('Test déplacement en jeu:', () => {
    it("Test de déplacement vers l'avant", () => {
        let robot = { position: [15, 20], orientation: 'E' };
        expect(game_1.moveForward(robot, configuration_1.DEPLACEMENT, configuration_1.LIST_OBSTACLE, configuration_1.OPPOSITE_DIRECTION, configuration_1.ORIENTATION)).toStrictEqual({ position: [16, 20], orientation: 'E' });
    });
    it("Test de déplacement vers l'avant rencontrant un obstacle", () => {
        let robot = { position: [19, 20], orientation: 'E' };
        expect(game_1.moveForward(robot, configuration_1.DEPLACEMENT, configuration_1.LIST_OBSTACLE, configuration_1.OPPOSITE_DIRECTION, configuration_1.ORIENTATION)).toStrictEqual({ position: [19, 20], orientation: 'E' });
    });
    it("Test de déplacement vers l'arrière", () => {
        let robot = { position: [15, 20], orientation: 'E' };
        expect(game_1.moveBackward(robot, configuration_1.DEPLACEMENT, configuration_1.LIST_OBSTACLE, configuration_1.OPPOSITE_DIRECTION, configuration_1.ORIENTATION)).toStrictEqual({ position: [14, 20], orientation: 'E' });
    });
    it("Test de déplacement vers l'arrière rencontrant un obstacle", () => {
        let robot = { position: [21, 20], orientation: 'E' };
        expect(game_1.moveBackward(robot, configuration_1.DEPLACEMENT, configuration_1.LIST_OBSTACLE, configuration_1.OPPOSITE_DIRECTION, configuration_1.ORIENTATION)).toStrictEqual({ position: [21, 20], orientation: 'E' });
    });
});
describe('Test lecteur de commande:', () => {
    it("Test commandes", () => {
        let robot = { position: [15, 20], orientation: 'E' };
        let commandList = ["a", "a", "a"];
        expect(game_1.commandReader(robot, commandList)).toStrictEqual({ position: [18, 20], orientation: 'E' });
    });
});
