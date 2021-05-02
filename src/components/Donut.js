import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';

import { connect } from 'react-redux';

class Donut extends Component {

    render() {

        return <div> 
            Here we have the DONUT...
        </div>
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(Donut);