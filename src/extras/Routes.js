import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../components/Home";
import Calculator from "../components/Calculator";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Calculator" exact component={Calculator} />
                </Switch>
            </Router>
        )
    }
}