import React from "react";
import Table from 'react-bootstrap/Table';
import { Component } from "react";
import ReactDOM from 'react-dom';

  class PracticeView extends Component {
    constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
      this.listItems = []
      this.numbers = [1, 2, 3, 4, 5];
    }

    render(){
      return(
        <NumberList numbers = {this.numbers} />
      )
    }
  }
      
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
export default PracticeView;