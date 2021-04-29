import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';
import history from '../extras/history';

class Sample2 extends Component {

    render() {

        return <div> 
            <h1> This Is Sample 2</h1>
            <Button color={Colors.SUCCESS} onClick={() => history.push('/')} >Go to Sample1</Button>
        </div>
    }
}

export default Sample2;