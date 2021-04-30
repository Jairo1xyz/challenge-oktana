import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';

import { connect } from 'react-redux';

class Chart extends Component {

    render() {

        return <div> 
            Here we have the Chart...
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

export default connect(mapStateToProps)(Chart);