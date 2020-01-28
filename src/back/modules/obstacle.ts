export interface Obstacle{
    x: number,
    y: number
}

export function isInObstacle([x,y]:[number, number], obstacle:Obstacle): boolean{
    return obstacle.x === x && obstacle.y === y;
}
