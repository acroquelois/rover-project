import {generateRandom} from './utils'

export interface Obstacle{
    x: number,
    y: number
}

export function isInObstacle([x,y]:[number, number], obstacle:Obstacle): boolean{
    return obstacle.x === x && obstacle.y === y;
}

export function generateObstable(nbObstacle: number, [maxX, maxY]:[number, number]): Obstacle[]{
    if(nbObstacle == 0){
        return []
    }else{
        return [{x:generateRandom(maxX), y:generateRandom(maxY)}].concat(generateObstable(nbObstacle-1, [maxX, maxY]))
    }
}
