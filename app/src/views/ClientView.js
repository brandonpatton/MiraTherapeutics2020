import React from "react";
import ReactDOM from 'react-dom';
import { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import useState from 'react';
import { FormControl } from '@material-ui/core';
import '../ClientView.css';
import { MDBCard, MDBCardTitle } from "mdbreact";
import logo from '../Mira.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import picture from '../Bonelli-RECT.jpg';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class ClientView extends Component {
  
    constructor(props) {
      super(props);
      
      this.bubbleInfo = [
        {
          bubble1Percentage: 100,
          bubble1Date: "11/20",
          bubble2Percentage: 50,
          bubble3Percentage: 100,
          bubble4Percentage: 100,
          bubble5Percentage: 100,
          bubble6Percentage: 100,
          bubble7Percentage: 50
        }
      ]
      this.clientInfo = [
        {
          picture: picture,
          name: 'Eduardo Bonelli', //Get this from previous page
          clientSince: '11/10/19',
          nextSession: '11/28'
        }
      ]
    }

    render(){
      const percentage = 66;
      return(
        <div>
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}
            <div className = "App-logo-container">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className = "Client-view-title-container">
                <p className = "Client-view-title-text">Eduardo Bonelli</p> {/*Get this from previous page*/}
            </div>
            
            {/* <DropdownButton id="dropdown-item-button" title = "Dropdown">
              <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
              <Dropdown.Item as="a" value = "Action">Action</Dropdown.Item>
              <Dropdown.Item as="a" value = "Another Action">Another action</Dropdown.Item>
              <Dropdown.Item as="a" value = "Something Else">Something else</Dropdown.Item>
            </DropdownButton> */}
              
            <Container fluid className = "background-container">
              <Row className = "background">
                <div className = "Client-information-container">
                  <Col>
                    <ClientInfo  clientInfo={this.clientInfo} />
                  </Col>
                </div>
                {/*<Col>
                  <MDBCard className="Exercise-preview-body">
                    <MDBCardTitle className="Exercise-preview-placeholder-text">-Exercise Preview-</MDBCardTitle>
                  </MDBCard>         
                </Col>*/} 
                <Col>
                  
                    <MDBCard className="Assignment-completion-body">
                      <div className = "Assignment-completion-status-text-container">
                        <MDBCardTitle className="Assignment-completion-status-text">Ongoing</MDBCardTitle> {/*Get this from patient data*/}
                      </div>
                    </MDBCard> 
                  
                  <Row>
                    {/*<MDBCard className="Assignment">
                      <div className = "">
                        <MDBCardTitle className="t">Ongoing</MDBCardTitle> {/*Get this from patient data}
                      </div>
                    </MDBCard> */}
                    <BubbleInfo bubbleInfo={this.bubbleInfo} />
                    
                  </Row>        
                </Col>
              </Row>
            </Container> 
       </div>
       )
    }
  }

class ClientInfo extends Component {
  constructor(props) {
    super(props);
    this.clientInfo = props.clientInfo;
  }

  getClientInfo(clientInfo) {
    const result = clientInfo.map((client) =>
      <Row>
        <MDBCard className = "Client-information">
          <Image src={picture} roundedCircle className="picture"/>
          <div className="clientInfoCardContainer">
            <p className="clientInfoCard">{client.name}</p>
            <p className="clientInfoCard">Client Since: {client.clientSince}</p>
            <p className="clientInfoCard">Next Session: {client.nextSession}</p>
          </div>
        </MDBCard>
      </Row>
    );
    return result;
  }
  
  render() {
    return(this.getClientInfo(this.clientInfo))
  }
}

class BubbleInfo extends Component {
  constructor(props) {
    super(props);
    this.bubbleInfo = props.bubbleInfo;
  }
  getBubbleInfo(bubbleInfo) {
    const result = bubbleInfo.map((bubbles) =>
        <div className = "Progress-bubbles-container">
          <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble1Percentage}
            text={`${bubbles.bubble1Date}`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#3e98c7",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent"
            })} />
                
          <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble2Percentage}
            text={`${bubbles.bubble2Percentage}%`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#3e98c7",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent"
            })} />

            <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble3Percentage}
              text={`${bubbles.bubble3Percentage}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#3e98c7",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent"
            })} />

            <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble4Percentage}
              text={`${bubbles.bubble4Percentage}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#3e98c7",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent"
            })} />
            <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble5Percentage}
              text={`${bubbles.bubble5Percentage}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#3e98c7",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent"
            })} />
            <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble6Percentage}
              text={`${bubbles.bubble6Percentage}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#3e98c7",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent"
            })} />
            <CircularProgressbar className = "Progress-bubbles" value={bubbles.bubble7Percentage}
              text={`${bubbles.bubble7Percentage}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#3e98c7",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent"
            })} />
        </div>
    );
    return result;
  }
  render() {
    return(this.getBubbleInfo(this.bubbleInfo))
  }
}

  //#region Exercise Type Dropdown
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="./ClientView"
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


export default ClientView;