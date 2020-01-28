import React from 'react';
import { Image} from 'react-konva';

const Rover = (props:{
  robot:{
    position:[number, number],
    orientation:string
  },
  orientations: {[key  : string]: number},
  robotImg: HTMLImageElement | undefined
  }) => {
  return (
        <Image
        x        = {props.robot.position[0]}
        y        = {props.robot.position[1]}
        rotation = {props.orientations[props.robot.orientation]}
        image    = {props.robotImg}
        width    = {50}
        height   = {50}
      />
  );
}

export default Rover;
