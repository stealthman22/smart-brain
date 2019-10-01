import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from "clarifai";

import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import ImageLinKForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'

// for clarifai
const app = new Clarifai.App({ apiKey: '123ee1204be645ecb5012a411f7275dd' });

const particlesOption = {

  "particles": {
    "number": {
      "value": 60
    },
    "size": {
      "value": 2
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
      box: {},
      route: 'signin',
      isSignedIn: false
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
    // Outputs result of input
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      // use the clarifai response to call the calculateFace method
      // return value of calc method is needed by display method to render bounding box
      .then(response => this.displayBoundingBox(this.calculateFaceLocation(response))).catch(err => console.log(err))
  }

  //Naming the value of route our param, it simply means  the state of route will be equal to  whatever the value of onRouteChange is
  onRouteChange = (route) => {
    // This conditional  sets the state of isSignedin in for different states of route
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
     // This destructuring helps us reduce our use of this.state
     const {isSignedIn, imageUrl, route, box} = this.state;
    return (
     
      <div className="App">

        <Particles className='particles canvas '
          params={particlesOption} />

        < Navigation isSignedIn={isSignedIn}  onRouteChange={this.onRouteChange} />
        {/* This conditional determines what is rendered as signin. hence when state is sign in the first expression is run */}
{route === 'home'
        ?  <div>
        <Logo />
      {// Passing inputchange prop  You must add this. to access it because it is a property of the App class
      }
        <Rank />
      <ImageLinKForm onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} />
    
      <FaceRecognition box={box} imageUrl={imageUrl} />
      </div>
       : (
         route === 'signin'
         ? <SignIn onRouteChange={this.onRouteChange} />
         : <Register onRouteChange={this.onRouteChange} />
       )
      }
      </div>

    );

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
  
  
  route state requires a conditional.

  Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?
  This error requires wrapping from the ending part of the conditional inside a div




  
*/

