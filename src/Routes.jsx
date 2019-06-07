import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login/components/views/Login";
import Home from "./Home/components/views/Home";

const Routes = (props) => (
  <Switch style={{ height: "100%" }}>
    <Route exact path="/" component={Login} />
    <Route exact path="/home" component={Home} />
  </Switch>
);

export default Routes;
