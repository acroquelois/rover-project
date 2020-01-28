import {Robot, generateRandomCoord, generateRandomOrientation, turnRight, turnLeft, forward, backward} from './modules/robot';
import {Obstacle, isInObstacle} from './modules/obstacle'
import {ORIENTATION, DEPLACEMENT, OPPOSITE_DIRECTION, LIST_OBSTACLE} from './configuration';
import { generateRandom} from './modules/utils'
import {moveForward, moveBackward, moveTurnRight, moveTurnLeft, commandReader} from './game'


describe('Test du robot:', () => {
    describe('Initialisation:', () => {
        it("Génération d'un nombre aléatoire", () => {
            expect(generateRandom(1)).toBe(0);
        });

        it("Génération de coordonnée aléatoire", () => {
            expect(generateRandomCoord(1,1)).toStrictEqual([0, 0]);
        });

        it("Génération d'une orientation aléatoire", () => {
            expect(ORIENTATION).toContain(generateRandomOrientation(ORIENTATION));
        });
    })
    describe("Changement d'orientation:", () => {
        it('Tourner vers la droite depuis N', () => {
            let robot:Robot = {position:[50,50], orientation: 'N'};
            expect(turnRight(robot, ORIENTATION)).toStrictEqual({position:[50,50], orientation: 'E'});
        });
        it('Tourner vers la droite depuis W', () => {
            let robot:Robot = {position:[50,50], orientation: 'W'};
            expect(turnRight(robot, ORIENTATION)).toStrictEqual({position:[50,50], orientation: 'N'});
        });
        it('Tourner vers la gauche depuis S', () => {
            let robot:Robot = {position:[50,50], orientation: 'S'};
            expect(turnLeft(robot, ORIENTATION)).toStrictEqual({position:[50,50], orientation: 'E'});
        });
        it('Tourner vers la gauche depuis N', () => {
            let robot:Robot = {position:[50,50], orientation: 'N'};
            expect(turnLeft(robot, ORIENTATION)).toStrictEqual({position:[50,50], orientation: 'W'});
        });
    })

    describe("Déplacement Robot:", () => {
        describe("Avancer:", () => {
            it('Avancer en haut', () => {
                let robot:Robot = {position:[50,50], orientation: 'N'};
                expect(forward(robot, DEPLACEMENT)).toStrictEqual({position:[50,51], orientation: 'N'});
            });
            it('Avancer sur le coté', () => {
                let robot:Robot = {position:[50,50], orientation: 'E'};
                expect(forward(robot, DEPLACEMENT)).toStrictEqual({position:[51,50], orientation: 'E'});
            });
            it('Avancer bordure de map en haut ', () => {
                let robot:Robot = {position:[50,100], orientation: 'N'};
                expect(forward(robot, DEPLACEMENT)).toStrictEqual({position:[50,0], orientation: 'N'});
            });
            it('Avancer bordure de map sur le coté ', () => {
                let robot:Robot = {position:[100,50], orientation: 'E'};
                expect(forward(robot, DEPLACEMENT)).toStrictEqual({position:[0,50], orientation: 'E'});
            });
        })
        describe("Reculer:", () => {
            it('Reculer en bas', () => {
                let robot:Robot = {position:[50,50], orientation: 'N'};
                expect(backward(robot, DEPLACEMENT, OPPOSITE_DIRECTION)).toStrictEqual({position:[50,49], orientation: 'N'});
            });
            it('Reculer de coté', () => {
                let robot:Robot = {position:[50,50], orientation: 'E'};
                expect(backward(robot, DEPLACEMENT, OPPOSITE_DIRECTION)).toStrictEqual({position:[49,50], orientation: 'E'});
            });
            it('Reculer bordure de map sur le coté', () => {
                let robot:Robot = {position:[0,50], orientation: 'E'};
                expect(backward(robot, DEPLACEMENT, OPPOSITE_DIRECTION)).toStrictEqual({position:[100,50], orientation: 'E'});
            });
            it('Reculer bordure de map en bas', () => {
                let robot:Robot = {position:[50,0], orientation: 'N'};
                expect(backward(robot, DEPLACEMENT, OPPOSITE_DIRECTION)).toStrictEqual({position:[50,100], orientation: 'N'});
            });
        })
    })
})

describe('Test des obstacles:', () => {
    it("Test de coordonée dans l'obstacle", () => {
        let obstacle:Obstacle = {
            x:10,
            y:80
        }
        expect(isInObstacle([10,80], obstacle)).toBeTruthy();
    });
    it("Test de coordonée en dehors de l'obstacle", () => {
        let obstacle:Obstacle = {
            x:10,
            y:80
        }
        expect(isInObstacle([10,85], obstacle)).toBeFalsy();
    });
})

describe('Test déplacement en jeu:', () => {
    it("Test de déplacement vers l'avant", () => {
        let robot:Robot = {position:[15,20], orientation: 'E'};
        expect(moveForward(robot, DEPLACEMENT, LIST_OBSTACLE, OPPOSITE_DIRECTION, ORIENTATION)).toStrictEqual({position:[16,20], orientation: 'E'});
    });
    it("Test de déplacement vers l'avant rencontrant un obstacle", () => {
        let robot:Robot = {position:[19,20], orientation: 'E'};
        expect(moveForward(robot, DEPLACEMENT, LIST_OBSTACLE, OPPOSITE_DIRECTION, ORIENTATION)).toStrictEqual({position:[19,20], orientation: 'E'});
    });
    it("Test de déplacement vers l'arrière", () => {
        let robot:Robot = {position:[15,20], orientation: 'E'};
        expect(moveBackward(robot, DEPLACEMENT, LIST_OBSTACLE, OPPOSITE_DIRECTION, ORIENTATION)).toStrictEqual({position:[14,20], orientation: 'E'});
    });
    it("Test de déplacement vers l'arrière rencontrant un obstacle", () => {
        let robot:Robot = {position:[21,20], orientation: 'E'};
        expect(moveBackward(robot, DEPLACEMENT, LIST_OBSTACLE, OPPOSITE_DIRECTION, ORIENTATION)).toStrictEqual({position:[21,20], orientation: 'E'});
    });
})


describe('Test lecteur de commande:', () => {
    it("Test commandes", () => {
        let robot:Robot = {position:[15,20], orientation: 'E'};
        let commandList = ["a","a","a"] 
        expect(commandReader(robot, commandList)).toStrictEqual({position:[18,20], orientation: 'E'});
    });
})
