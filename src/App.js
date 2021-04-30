import React , { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import './App.css';

import Routes from './extras/Routes';

import { connect } from 'react-redux';

import { fetchRiskLevels } from "./extras/riskLevelsActions";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRiskLevels());
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
      risk: state.risk,
      loading: state.loading,
      showChart: state.showChart,
      error: state.error,
      data: state.data
  };
}

const styles = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center'
}

export default connect(mapStateToProps)(App);

