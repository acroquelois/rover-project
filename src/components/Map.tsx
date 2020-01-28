import React, {useState} from 'react';
import Rover from './Rover'
import ObstacleKanva from './Obstable'
import useImage from 'use-image';
import rover from '../assets/mars-rover.png';
import { Stage, Layer, Rect, Text } from 'react-konva';
import {Robot, genereteNewRobot} from  '../back/modules/robot'
import {Obstacle} from '../back/modules/obstacle'
import {commandReader} from '../back/game'
import {PLATEAU, ORIENTATION, DEPLACEMENT, LIST_OBSTACLE, OPPOSITE_DIRECTION} from '../back/configuration'

const Map: React.FC = () => {
  const [myrover]  = useImage(rover);
  const orientation: {[key    : string]: number} = {'N': 90, 'E': 180, 'S': 270, 'W': 0}


  const [robot, setRobot] = useState(genereteNewRobot(PLATEAU, ORIENTATION));
  const [commands, setCommands] = useState("")

  const handleTexte = (event: React.SyntheticEvent<EventTarget>) => {
      setCommands((event.target as HTMLInputElement).value);
  }

  const generateObstacles = (obstacles:Obstacle[]):JSX.Element[] => {
    if(obstacles.length == 0){
      return []
    }else{
      return [<ObstacleKanva obstacle={obstacles[0]}/>].concat(generateObstacles(obstacles.slice(1)))
    }
  }

  return (
    <div className="Map">
        <Stage 
        width={window.innerWidth} 
        height={window.innerHeight-100}
        className='container'
        >
          <Layer>
            <Rover robot={robot} orientations={orientation} robotImg={myrover}/>
            {generateObstacles(LIST_OBSTACLE)}
          </Layer>
        </Stage>
        <input
        type="text"
        value={commands}
        onChange={handleTexte}
        />
        <button onClick={() =>{setRobot(commandReader(commands, robot, DEPLACEMENT, LIST_OBSTACLE, OPPOSITE_DIRECTION, ORIENTATION))}}>
        Cliquez ici
      </button>
    </div>
  );
}

export default Map;
