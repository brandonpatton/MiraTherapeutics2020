import React from "react";
import ReactDOM from 'react-dom'
import { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import useState from 'react';
import { FormControl } from '@material-ui/core';
import './ExerciseForm.css';
import { MDBCard, MDBContainer,MDBCardTitle } from "mdbreact";
import logo from './Mira.jpg';




class ExerciseForm extends Component {
    constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
    }

    



    render(){
      return(
        <div>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <div className = "App-logo-container">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className = "Exercise-form-title-container">
                <p className = "Exercise-form-title-text">Exercise Form</p>
            </div>
            <div className = "Added-exercise-list-container">
                <p className = "Added-exercise-list-text">Added Exercises:</p>
            </div>
            <DropdownButton id="dropdown-item-button" title = "Dropdown">
              <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
              <Dropdown.Item as="a" value = "Action">Action</Dropdown.Item>
              <Dropdown.Item as="a" value = "Another Action">Another action</Dropdown.Item>
              <Dropdown.Item as="a" value = "Something Else">Something else</Dropdown.Item>
            </DropdownButton>
            <body>
                <div className = "App-background-container">
                    <div className = "bg"></div>
                </div> 
            </body>
            <MDBContainer className = "Exercise-preview-container">
                <MDBCard className="Exercise-preview-body">
                    <MDBCardTitle className = "Exercise-preview-placeholder-text">-Exercise Preview-</MDBCardTitle>
                </MDBCard>          
            </MDBContainer>
       </div>
       
       
       )
    }
  }
  //#region Exercise Type Dropdown
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="./ExerciseForm"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
//#endregion  

/*<Dropdown className = "Exercise-type-dropdown-container">
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                Custom toggle
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                <Dropdown.Item eventKey="3" active>
                  Orange
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>,*/

export default ExerciseForm;