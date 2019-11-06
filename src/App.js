import React, {
    Component
} from 'react';
import Particles from 'react-particles-js';

import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import ImageLinKForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'


const particlesOption = {

    "particles": {
        "number": {
            "value": 80
        },
        "size": {
            "value": 4
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


const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    // for user profile returned by register component
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
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
        this.state = initialState;
    }

    // Will update state with user loaded from register component
    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    // Life cycle hook to connect with server connection
    // lifecycle hooks don't need arrow functions.
    // componentDidMount() {
    //     fetch('https://stormy-tundra-86347.herokuapp.com/:3000/')
    //         .then(response => response.json())
    //         .then(console.log);
    // }


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
        this.setState({
            box: box
        });
    }

    //track changes to text area of input
    onInputChange = (e) => {
        //target.value gets the exact value
        this.setState({
            input: e.target.value
        });
    }

    // Detect an image
    onPictureSubmit = () => {
        // this.state helps it target what input has been defined as in the App class
        this.setState({
            imageUrl: this.state.input
        })

        // use the clarifai response to call the calculateFace method
        // return value of calc method is needed by display method to render bounding box

        // for clarifai
        fetch('https://stormy-tundra-86347.herokuapp.com/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('https://stormy-tundra-86347.herokuapp.com/:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    }).then(response => response.json())
                        .then(count => {
                            // Object.assign prevents setState 
                            // from changing objects value
                            this.setState(Object.assign(this.state.user, { entries: count }))
                        })
                        .catch(err => console.log(err))
                }
                this.displayBoundingBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err))
    }

    //Naming the value of route our param, it simply means  the state of route will be equal to  whatever the value of onRouteChange is
    onRouteChange = (route) => {
        // This conditional  sets the state of isSignedin in for different states of route
        if (route === 'signout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({
                isSignedIn: true
            })
        }
        this.setState({
            route: route
        });
    }

    render() {
        // This destructuring helps us reduce our use of this.state
        const {
            isSignedIn,
            imageUrl,
            route,
            box
        } = this.state;
        return (

            <div className="App">

                <Particles className='particles canvas'
                    params={
                        particlesOption
                    } />

                <Navigation isSignedIn={
                    isSignedIn
                }
                    onRouteChange={
                        this.onRouteChange
                    } />

                { /* This conditional determines what is rendered as signin. hence when state is sign in the first expression is run */}
                {
                    route === 'home' ? <div >
                        <Logo />

                        <Rank name={this.state.user.name} entries={this.state.user.entries} />
                        { // Passing inputchange prop  You must add this. to access it because it is a property of the App class
                        }
                        <ImageLinKForm onInputChange={
                            this.onInputChange
                        }
                            onPictureSubmit={
                                this.onPictureSubmit
                            } />

                        {/* Turnery operator present, toggling between sign in and register route */}
                        <FaceRecognition box={box}
                            imageUrl={
                                imageUrl
                            } /> </div> : (route === 'signin' ?
                                <SignIn loadUser={this.loadUser} onRouteChange={
                                    this.onRouteChange} /> :
                                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                        )
                } </div>

        );

    }
}
export default App;


// moved Clarifai to backend due to security issues with the api key.

/*
  Line 69 -71 was modifed to use => syntax

  Block 51
  We are creating an id , after boxing the response into a variable. This id is going to represent the bouding box, i.e it will serve as an endpoint we can use to grab this box and manipulate it

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