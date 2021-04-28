import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';
import history from '../extras/history';

class Sample1 extends Component {

    render() {

        return <div> 
            <h1> This Is Sample 1</h1>
            <Button color={Colors.SUCCESS} onClick={() => history.push('/Sample2')}>Go to Sample2</Button>
        </div>
    }
}

export default Sample1;