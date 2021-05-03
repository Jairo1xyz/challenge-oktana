import React , { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import icon from './img/home.ico';

import history from './extras/history';
import Routes from './extras/Routes';
import { connect } from 'react-redux';

import { fetchRiskLevels } from "./extras/riskLevelsActions";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRiskLevels());
  }

  render() {
    return <div>
      <header style={headerStyles}>
        <img src={icon} style={iconStyles} onClick={() => history.push('/')}/>
        <div style={titleStyles}>Financial Advisor</div>
      </header>
      <div style = {styles} >
        <Router>
          <Routes/>
        </Router>
    </div>
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

const headerStyles = {
  display: 'flex',
  justifyContent: 'center',
  background: '#0084bf',
  backgroundImage: 'linear-gradient(45deg, #0084bf, #0c8996)',
  marginBottom: '20px',
  height: '100px'
}

const titleStyles = {
  fontSize: '55px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'rgba(255,255,255,0.85)',
  fontFamily: 'Roboto, sans-serif',
}

const iconStyles = {
  position: 'absolute',
  left: '0px',
  width: '52px',
  height: 'auto',
  margin: '25px',
  cursor: 'pointer'
}

export default connect(mapStateToProps)(App);

