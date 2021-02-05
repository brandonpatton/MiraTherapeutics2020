import React from "react";
import { Component } from "react";
import '../css/ExerciseForm.css';
import { MDBCard, MDBCardTitle } from "mdbreact";
import logo from '../Mira.jpg';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class ClientView extends Component {
  
    constructor(props) {
      super(props);
        this.assignment = 
                {
                    due: '11/17',
                    status: 'Ongoing',
                    exercises: [
                        {
                            name: "Breathing Exercises",
                            due: '11/12',
                            completionStatus: "danger",
                            completionAmount: 75
                        },
                        {
                            name: "PCL-5 Assessments",
                            due: '11/15',
                            completionStatus: "success",
                            completionAmount: 100
                        },
                        {
                            name: "Readings",
                            due: '11/17',
                            completionAmount: "info",
                            completionAmount: 50
                            
                        }
                    ]
                }
            
          

      

    }

    render(){
      
       
    }
  }