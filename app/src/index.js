import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ClientPage from "./views/ClientPage";
import Page1 from "./App";
import PracticeView from "./views/PracticeView";
import ExerciseForm from "./views/ExerciseForm";
import ClientView from "./views/ClientView";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
  <Switch>
   <Route exact path="/" component={Page1} />
   <Route path="/PracticeView" component={PracticeView} />
   <Route path="/ExerciseForm" component={ExerciseForm} />
   <Route path="/ClientView" component={ClientView} />
   <Route path="/ClientPage/1" component={ClientPage} />
 </Switch>
 </BrowserRouter>,
 rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
