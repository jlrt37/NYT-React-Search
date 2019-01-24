import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Background from './background.jpeg';
import './App.css';

const App = () => (
  <Router>
    <div id="wrapper" style={{ backgroundImg: `url(${Background})`}} >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/news" component={Home} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
