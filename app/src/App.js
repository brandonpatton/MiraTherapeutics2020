import React, { Component } from "react";
import logo from './Mira.jpg';
import banner from './MiraBanner.png';
import bubble from './bubbles.png';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCard, MDBCardBody, MDBContainer,MDBCardTitle,MDBCardText } from "mdbreact";
import {Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:3080/")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
      this.callAPI();
  }

  render(){
    return(
      <div className="App">

        <header className = "Mira-site-header">
            <img src={banner} className="Mira-banner" alt="banner"/>
        </header>

        <div className = "App-logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <body>
          <div className = "App-background-container">
            <div className = "bg"></div>
          </div> 
        </body>


        <div className = "Username-bubble-image">
          <img src={bubble} className="bubble1" alt="bubble" />
        </div>

        <div className = "Password-bubble-image">
          <img src={bubble} className="bubble2" alt="bubble" />
        </div>

        <div className = "Login-container">
          <form>
            <input className = "Username" type="text" placeholder="Username" id="unamee" name="username"></input>
            <input className = "Password" type="text" placeholder="Password"id="pword" name="password"></input>
         </form>
        </div>


        <Link to = "/PracticeView"><Button  className = "Button" onClick="window.location.href='/PracticeView'"type="button">Log In</Button></Link>

        <div className = "New-user-container">
          <a href = "www.google.com" className = "user">New User?</a>
        </div>             
        
        <div className = "Forgot-password-container">
          <a href = "www.google.com" className= "pword">Forgot Password?</a>
        </div>

        <div>  
        <MDBContainer className = "Card">
          <MDBCard className="card-body">
            <MDBCardTitle className = "Card1-title">Miratx Articles</MDBCardTitle>
            <MDBCardText>
              Articles from Miratx
            </MDBCardText>
          </MDBCard>          
        </MDBContainer>
        </div>

        <div>
        <MDBContainer className = "Card-2">
          <MDBCard className="card-body-2">
            <MDBCardTitle className = "Card2-title">Miratx Articles</MDBCardTitle>
            <MDBCardText>
              Articles from Miratx
            </MDBCardText>
          </MDBCard>          
        </MDBContainer>
        </div>

        <p className="App-intro">{this.state.apiResponse}</p>

      </div>
    )
  }
}



export default App;
