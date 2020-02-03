import React from 'react';
import {Rect} from 'react-konva';
import {Obstacle} from '../back/modules/obstacle'

const ObstacleKanva = (props:{
    obstacle:Obstacle
})=> {
  return (
        <Rect
        x        = {props.obstacle.x}
        y        = {props.obstacle.y}
        fill     = {'black'}
        width    = {1}
        height   = {1}
      />
  );
}

export default ObstacleKanva;
