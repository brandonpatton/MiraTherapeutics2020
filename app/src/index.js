import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import {store, persistor} from "./redux/configureStore"
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import Page1 from "./App";
import PracticeView from "./views/PracticeView";
import ExerciseForm from "./views/ExerciseFormFn";
import ClientView from "./views/ClientViewFn";
import AssignmentForm from "./views/AssignmentFormFn";
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Page1} />
          <Route path="/PracticeView" component={PracticeView} />
          <Route path="/ExerciseForm" component={ExerciseForm} />
          <Route path="/ClientView" component={ClientView} />
          <Route path="/AssignmentForm" component={AssignmentForm} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
 </Provider>,
 rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
