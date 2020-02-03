import React, { useState, useEffect, useRef } from 'react';
import Rover from './Rover'
import ObstacleKanva from './Obstable'
import { Stage, Layer, Rect, Text } from 'react-konva';
import {Robot, genereteNewRobot} from  '../back/modules/robot'
import {Obstacle, generateObstable} from '../back/modules/obstacle'
import {execCommand} from '../back/game'
import {PLATEAU, ORIENTATION, DEPLACEMENT, LIST_OBSTACLE, OPPOSITE_DIRECTION, NB_OBSTACLE} from '../back/configuration'

const Map: React.FC = () => {
  const orientation: {[key    : string]: number} = {'N': 90, 'E': 0, 'S': 270, 'W': 180}


  const [robot, setRobot] = useState(genereteNewRobot(PLATEAU, ORIENTATION));
  const [commands, setCommands] = useState("")

  const handleTexte = (event: React.SyntheticEvent<EventTarget>) => {
      setCommands((event.target as HTMLInputElement).value);
  }

  const generateObstaclesKanva = (obstacles:Obstacle[]):JSX.Element[] => {
    if(obstacles.length == 0){
      return []
    }else{
      return [<ObstacleKanva obstacle={obstacles[0]}/>].concat(generateObstaclesKanva(obstacles.slice(1)))
    }
  }

  const launchRobot = (commands: string, interval:number, robot: Robot,deplacement:{ [key: string]: ((arg0: [number,number]) => [number, number])}, obstacles:Obstacle[], opposite_direction:{ [key: string]:string}, orientation:string[]):void=> {
    if(commands.length == 0){
      return
    }else{
      let newRobot:Robot = execCommand(commands[0], robot, deplacement, obstacles, opposite_direction, orientation)
      setTimeout(() => {
        setRobot(newRobot)
        return launchRobot(commands.slice(1), interval, newRobot, deplacement, obstacles, opposite_direction, orientation)
      }, interval)
    }
  }
  return (
    <div>
        <div className='container'>
          <Stage 
          width={PLATEAU[0]} 
          height={PLATEAU[1]}
          >
            <Layer>
              <Rover robot={robot} orientations={orientation}/>
              {generateObstaclesKanva(generateObstable(NB_OBSTACLE, PLATEAU))}
            </Layer>
          </Stage>
        </div>
        <input
        type="text"
        value={commands}
        onChange={handleTexte}
        />
        <button onClick={() =>{launchRobot(commands,100, robot, DEPLACEMENT, LIST_OBSTACLE, OPPOSITE_DIRECTION, ORIENTATION)}}>
          Cliquez ici
        </button>
    </div>
  );
}

export default Map;
