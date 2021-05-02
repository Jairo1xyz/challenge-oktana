import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';

import { connect } from 'react-redux';

import Chart from "./Chart";
import Donut from "./Donut";
import { TOGGLE } from '../extras/actions';

class Container extends Component {

    render() {

        return <div> 
            { this.props.showChart ? <Chart/> : <Donut/> }
            <Button 
            color={Colors.PRIMARY} 
            isDisabled={ this.props.risk === 0 ? true : false }
            onClick={ () => {
                if(this.props.risk !== 0) 
                    this.props.dispatch({ type: TOGGLE })
            }
            }>
                { this.props.showChart ? 'See Donut Chart' : 'See Table Chart' }
            </Button>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(Container);