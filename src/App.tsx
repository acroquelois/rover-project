import React from 'react';
import Rover from './components/Rover'
import './App.css'
import { Stage, Layer, Rect, Text } from 'react-konva';



const App: React.FC = () => {
  return (
    <div className="App">
      <Stage 
      width={window.innerWidth} 
      height={window.innerHeight}
      className='container'
      >
        <Layer>
          <Rover/>
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
