import React, { Component } from "react";
import logo from './Mira.png';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  render() {
    return (
      <div className="App">
        <div className = "App-logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className = "App-background-container">
          <div className = "bg"></div>
        </div> 
        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
