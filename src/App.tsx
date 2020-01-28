import React from 'react';
import Rover from './components/Rover'
import Map from './components/Map'
import './App.css'
import { Stage, Layer, Rect, Text } from 'react-konva';



const App: React.FC = () => {
  return (
    <div className="App">
          <Map/>
    </div>
  );
}

export default App;
