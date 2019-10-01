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
      "value": 50
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

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box

    // DOM manipulation to get bounding box  to show
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    // Whatever is returned here is the box parameter
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  displayBoundingBox = (box) => {
    // Updates the box state with the return values in calc face method
    console.log(box)
    this.setState({ box: box });
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
      // use the clarifai response to call the calculateFace method
      // return value of calc method is needed by display method to render bounding box
      .then(response => this.displayBoundingBox(this.calculateFaceLocation(response))).catch(err => console.log(err))
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
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    )
  }
}

export default App;






/*
Line 69 -71 was modifed to use => syntax

Block 51
We are creating an id , after boxing the response into a variable. This id is going to represnt the bouding box, i.e it will serve as an endpoint we can use to grab this box and manipulate it

We wrap width and height in a Number because it will return a string, but we wish to do some calculations on them

Line 58 This return value is an object, and is what will fill up the  object returned by the box state;

left col: Is the  left_col property of the clarifaiFace variable
it is the percentage of the width, which gives us the width of the actual displayed image and where the left column of the bounding box should be.

line 88 :
calculateFaceLocation takes the response, returns the object of it's return value, which is piped into displayBoundingBox

*/