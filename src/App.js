import React , { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import './App.css';

import Routes from './extras/Routes';

import { connect } from 'react-redux';

import { fetchRiskLevels } from "./extras/riskLevelsActions";

class App extends Component {
  componentDidMount() {
    // This code is for testing Loading Display message
    //setTimeout(() => {
      //console.log("Test Time finished");
      this.props.dispatch(fetchRiskLevels());
    //}, 5000);
  }

  render() {
    return <div style = {styles} >
      <Router>
        <Routes/>
      </Router>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

const styles = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center'
}

export default connect(mapStateToProps)(App);

