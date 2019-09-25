import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import ImageLinKForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank';

const particlesOption = {

  "particles": {
    "number": {
      "value": 60
    },
    "size": {
      "value": 5
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }

}

// You have to use class syntax once state or this is involved
// class 
//constructor
//super : what does super do?
// state
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  //track changes to text area of input
  onInputChange = (e) => {
    //target.value gets the exact value
    console.log(e.target.value);
  }

  // Detect an image
  onButtonSubmit = () => {
    console.log('click')
  }

  render() {
    return (

      <div className="App">
        <Particles className='particles canvas '
          params={particlesOption} />

        < Navigation />
        <Logo />
        {/* Passing inputchange prop  You must add this to access it because it is a property of the App class*/}
        <ImageLinKForm onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
        <Rank />
        {/*  <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;
