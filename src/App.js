import React from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import ImageLinKForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank';

const particlesOption = {
  polygon: {
    enable: true,
    type: 'inside',
    move: {
      radius: 100
    },
    url: 'path/to/svg.svg'
  }
}

function App() {
  return (

    <div className="App">
      <Particles className='particles'
        params={particlesOption} />

      < Navigation />
      <Logo />
      <ImageLinKForm />
      <Rank />
      {/*  <FaceRecognition /> */}
    </div>
  );
}

export default App;
