import {PLATEAU, DEPLACEMENT, OPPOSITE_DIRECTION, ORIENTATION} from '../configuration';
import {generateRandom} from './utils'
import {Obstacle, isInObstacle} from './obstacle'
import {LIST_OBSTACLE} from '../configuration'

export interface Robot{
    position: [number, number];
    orientation: string;
}

export function genereteNewRobot(plateau:[number, number], orientation:string[]): Robot{
    return {
        position: generateRandomCoord(plateau[0], plateau[1]),
        orientation: generateRandomOrientation(orientation)
    }
}
export function generateRandomCoord(xmax: number, ymax: number): [number, number] { 
    return [generateRandom(xmax), generateRandom(ymax)];
};

export function generateRandomOrientation(orientation: string[]): string{
    return orientation[generateRandom(orientation.length)]
};

export function turnRight(robot: Robot, orientation:string[]): Robot{
    return {
        position: robot.position,
        orientation: orientation[(orientation.indexOf(robot.orientation)+1)%orientation.length]
    };
}

export function turnLeft(robot: Robot, orientation:string[]): Robot{
    return {
        position: robot.position,
        orientation: orientation[(orientation.length + (orientation.indexOf(robot.orientation)-1))%orientation.length]
    };
}

export function forward(robot: Robot, deplacement:{ [key: string]: ((arg0: [number,number]) => [number, number])}): Robot{
    return {
        position: deplacement[robot.orientation](robot.position),
        orientation: robot.orientation

    }
}

export function backward(robot: Robot, deplacement:{ [key: string]: ((arg0: [number,number]) => [number, number])}, opposite_direction:{ [key: string]:string}): Robot{
    return {
        position: deplacement[opposite_direction[robot.orientation]](robot.position),
        orientation: robot.orientation

    }
}

export function equals(robot1:Robot, robot2:Robot):boolean{
    return ((robot1.position === robot2.position) && (robot1.orientation === robot2.orientation))
}
export function printRobot(robot: Robot): void{
    let xpos = robot.position[0];
    let ypos = robot.position[1];
    let direction = robot.orientation;
    console.log(`Le robot se situe à la position ${xpos};${ypos}, il est orienté vers ${direction} `)
}

