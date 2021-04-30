import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';
import history from '../extras/history';

class Calculator extends Component {

    render() {

        return <div> 
            <h1> This Is Calculator</h1>
            <Button color={Colors.SUCCESS} onClick={() => history.push('/')}>Go to Home</Button>
        </div>
    }
}

export default Calculator;