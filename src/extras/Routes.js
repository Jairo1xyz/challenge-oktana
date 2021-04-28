import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Sample1 from "../components/Sample1";
import Sample2 from "../components/Sample2";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Sample1} />
                    <Route path="/Sample2" component={Sample2} />
                </Switch>
            </Router>
        )
    }
}