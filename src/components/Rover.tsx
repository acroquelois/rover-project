import React from 'react';
import {Arrow, Group} from 'react-konva';

const Rover = (props:{
  robot:{
    position:[number, number],
    orientation:string
  },
  orientations: {[key  : string]: number}
  }) =>{
  return (
        <Group
          rotation = {props.orientations[props.robot.orientation]}
          x        = {props.robot.position[0]}
          y        = {props.robot.position[1]}
        >
          <Arrow
          points={[0, 0]}
          pointerLength={20}
          pointerWidth={20}
          fill="white"
          stroke="white"
          strokeWidth={4}
          />
          <Arrow
          points={[-10, 0]}
          pointerLength={15}
          pointerWidth={15}
          fill="#DD682E"
          stroke="#DD682E"
          strokeWidth={4}
          />
          <Arrow
          points={[0, 0]}
          pointerLength={10}
          pointerWidth={10}
          fill="white"
          stroke="white"
          strokeWidth={4}
          />
        </Group>
  );
}

export default Rover;
