import React from 'react';
import { Image} from 'react-konva';
import useImage from 'use-image';
import rover from '../assets/mars-rover.png';
import Canvg from 'canvg';
import {genereteNewRobot} from  '../back/modules/robot'

const Rover: React.FC = () => {
  const [myrover]         = useImage(rover);
  const orientation       : {[key  : string]: number} = {'N': 90, 'E': 180, 'S': 270, 'W': 0}
  const robot               = genereteNewRobot()
  return (
        <Image
        x        = {robot.position[0]}
        y        = {robot.position[1]}
        rotation = {orientation[robot.orientation]}
        image    = {myrover}
        width    = {50}
        height   = {50}
      />
  );
}

export default Rover;
