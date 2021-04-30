import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';

import { connect } from 'react-redux';

import Chart from "./Chart";
import Donut from "./Donut";

class Container extends Component {

    render() {

        return <div> 
            { this.props.showChart ? <Chart/> : <Donut/> }
            <Button 
            color={Colors.PRIMARY} 
            onClick={() => this.props.dispatch({ type: "TOGGLE" })}
            isDisabled={ this.props.risk === 0 ? true : false }>
                { this.props.showChart ? 'See Donut Chart' : 'See Table Chart' }
            </Button>
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

export default connect(mapStateToProps)(Container);