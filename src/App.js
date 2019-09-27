import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from "clarifai";

import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import ImageLinKForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank';

// for clarifai
const app = new Clarifai.App({ apiKey: '123ee1204be645ecb5012a411f7275dd' });

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
    // Importing the clarifai Api
    app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40" })
      .then(generalModel => {
        return generalModel.predict("the-image-url");
      })
      .then(response => {
        //  var concepts = response['outputs'][0]['data']['concepts']
      })
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
        {/*  <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;
