import {Obstacle} from './modules/obstacle'

export const PLATEAU:[number,number] = [1200, 500];

export const ORIENTATION:string[] = ['N','E','S','W'];

export const STEP:number = 10;

export const DEPLACEMENT:{ [key: string]: ((arg0: [number,number]) => [number, number]);} = {
    'N': function([x,y]:[number,number]): [number, number]{
        return [x, (y+STEP)%(PLATEAU[1]+1)]
    },
    'E': function([x,y]:[number,number]): [number, number]{
        return [(x+STEP)%(PLATEAU[0]+1), y]
    },
    'S': function([x,y]:[number,number]): [number, number]{
        return [x, (((PLATEAU[1] + 1) + y-STEP)%(PLATEAU[1]+1))]
    },
    'W': function([x,y]:[number,number]): [number, number]{
        return [(((PLATEAU[0]+1)+x-STEP)%(PLATEAU[0]+1)), y]
    },
}

export const OPPOSITE_DIRECTION:{ [key: string]:string} = {
    'N':'S',
    'E':'W',
    'S':'N',
    'W':'E'
}

export const LIST_OBSTACLE:Obstacle[] = [
        {
            x:10,
            y:80
        },
        {
            x:20,
            y:20
        },
        {
            x:250,
            y:250
        },
        {
            x:800,
            y:100
        },
]