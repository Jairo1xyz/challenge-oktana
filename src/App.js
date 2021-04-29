import React , { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import './App.css';

import Routes from './extras/Routes';

class App extends Component {

  render() {
    return <div style = {styles} >
      <Router>
        <Routes />
      </Router>
    </div>
  }
}

const styles = {
  padding: '20px'
}

export default App;

