import {Robot, turnRight, turnLeft, forward, backward, equals} from './modules/robot';
import {Obstacle, isInObstacle} from './modules/obstacle'
import {DEPLACEMENT, OPPOSITE_DIRECTION, ORIENTATION, LIST_OBSTACLE} from './configuration'

export function moveForward(robot: Robot, deplacement:{ [key: string]: ((arg0: [number,number]) => [number, number])}, obstacles:Obstacle[], opposite_direction:{ [key: string]:string}, orientation:string[]):Robot{
    let deplacedRobot = forward(robot, deplacement);
    let encounteredObstacle = obstacles.filter(x => isInObstacle(deplacedRobot.position, x))
    if (encounteredObstacle.length > 0){
        return robot;
    }else{
        return deplacedRobot;
    }
}

export function moveBackward(robot: Robot, deplacement:{ [key: string]: ((arg0: [number,number]) => [number, number])}, obstacles:Obstacle[], opposite_direction:{ [key: string]:string}, orientation:string[]):Robot{
    let deplacedRobot = backward(robot, deplacement, opposite_direction);
    let encounteredObstacle = obstacles.filter(x => isInObstacle(deplacedRobot.position, x))
    if (encounteredObstacle.length > 0){
        return robot;
    }else{
        return deplacedRobot;
    }
}

export function moveTurnLeft(robot: Robot, deplacement:{ [key: string]: ((arg0: [number,number]) => [number, number])}, obstacles:Obstacle[], opposite_direction:{ [key: string]:string}, orientation:string[]):Robot{
    return turnLeft(robot, orientation)
}

export function moveTurnRight(robot: Robot, deplacement:{ [key: string]: ((arg0: [number,number]) => [number, number])}, obstacles:Obstacle[], opposite_direction:{ [key: string]:string}, orientation:string[]):Robot{
    return turnRight(robot, orientation)
}

export const COMMAND:{[key: string]:(robot: Robot, deplacement:{ [key: string]: ((arg0: [number,number]) => [number, number])}, obstacles:Obstacle[], opposite_direction:{ [key: string]:string}, orientation:string[]) => Robot} = {
    'a':moveForward,
    'r':moveBackward,
    'g':moveTurnLeft,
    'd':moveTurnRight
}

const reducer = (robot:Robot, command:string) => COMMAND[command](robot, DEPLACEMENT, LIST_OBSTACLE,OPPOSITE_DIRECTION, ORIENTATION);

export function commandReaderReducer(robot: Robot, listcommand: string[]):Robot{
    let newRobot = listcommand.reduce(reducer, robot)
    return newRobot;
}

export function commandReader(commands: string, robot: Robot,deplacement:{ [key: string]: ((arg0: [number,number]) => [number, number])}, obstacles:Obstacle[], opposite_direction:{ [key: string]:string}, orientation:string[]):Robot {
    if(commands.length === 0){
        return robot
    }
    let newRobot:Robot = execCommand(commands[0], robot, deplacement, obstacles, opposite_direction, orientation);
    if(equals(robot, newRobot)){
        console.log("Obstacle rencontré")
        return robot
    }else{
        return commandReader(commands.substring(1), newRobot, deplacement, obstacles, opposite_direction, orientation);
    }
}

export function execCommand(command: string, robot: Robot,deplacement:{ [key: string]: ((arg0: [number,number]) => [number, number])}, obstacles:Obstacle[], opposite_direction:{ [key: string]:string}, orientation:string[]):Robot {
    return COMMAND[command](robot, DEPLACEMENT, LIST_OBSTACLE,OPPOSITE_DIRECTION, ORIENTATION);
}