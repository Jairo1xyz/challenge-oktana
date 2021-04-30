import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';

import { connect } from 'react-redux';

class Chart extends Component {

    render() {
        const tRows = this.props.data.map(level => {
            return <tr style = { this.props.risk === level.risk ? trHighlightedStyles : null }>
                <td>{level.risk}</td>
                <td>{level.bonds}</td>
                <td>{level.largeCap}</td>
                <td>{level.midCap}</td>
                <td>{level.foreign}</td>
                <td>{level.smallCap}</td>
            </tr>
        });

        return <div style = {basicStyles}>
        <table>
            <thead>
                <tr>
                    <th>Risk</th>
                    <th>Bonds %</th>
                    <th>Large Cap %</th>
                    <th>Mid Cap %</th>
                    <th>Foreign %</th>
                    <th>Small Cap %</th>
                </tr>
            </thead>
            <tbody>
                {tRows}
            </tbody>
        </table>
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

const basicStyles = {
    display: 'flex',
    justifyContent: 'center'
}

const trHighlightedStyles = {
    background: 'gray',
    color: 'white'
}

export default connect(mapStateToProps)(Chart);