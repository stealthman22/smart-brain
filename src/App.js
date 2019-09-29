import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from "clarifai";

import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import ImageLinKForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'

// for clarifai
const app = new Clarifai.App({ apiKey: '123ee1204be645ecb5012a411f7275dd' });

const particlesOption = {

  "particles": {
    "number": {
      "value": 70
    },
    "size": {
      "value": 3
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
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = () => {

  }

  //track changes to text area of input
  onInputChange = (e) => {
    //target.value gets the exact value
    this.setState({ input: e.target.value });
  }

  // Detect an image
  onButtonSubmit = () => {
    // this.state helps it target what input has been defined as in the App class
    this.setState({ imageUrl: this.state.input })
    // Outputs result of this.state.input
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(
        function (response) {
          // do something with response
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box)

        },
        function (err) {
          // there was an error
        }
      );
  }

  render() {
    return (

      <div className="App">
        <Particles className='particles canvas '
          params={particlesOption} />

        < Navigation />
        <Logo />
        {/* Passing inputchange prop  You must add this. to access it because it is a property of the App class*/}
        <ImageLinKForm onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
        <Rank />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    )
  }
}

export default App;
