import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';

import { connect } from 'react-redux';

import { SET_BONDS, SET_LARGE_CAP, SET_MID_CAP, SET_FOREIGN, SET_SMALL_CAP, REBALANCE, CLEAR_VALUES } from '../extras/actions';

class CalculatorTable extends Component {

    rebalance = () => {
        const risk = this.props.risk;
        const level = this.props.data[risk-1];

        const bonds = {
            current: parseFloat(this.props.bonds.current),
            difference: 0.0,
            new: 0.0
        };
        const largeCap = {
            current: parseFloat(this.props.largeCap.current),
            difference: 0.0,
            new: 0.0
        };
        const midCap = {
            current: parseFloat(this.props.midCap.current),
            difference: 0.0,
            new: 0.0
        };
        const foreign = {
            current: parseFloat(this.props.foreign.current),
            difference: 0.0,
            new: 0.0
        };
        const smallCap = {
            current: parseFloat(this.props.smallCap.current),
            difference: 0.0,
            new: 0.0
        };

        const total = bonds.current + largeCap.current + midCap.current + foreign.current + smallCap.current;

        bonds.new = (total*level.bonds/100).toFixed(2);
        largeCap.new = (total*level.largeCap/100).toFixed(2);
        midCap.new = (total*level.midCap/100).toFixed(2);
        foreign.new = (total*level.foreign/100).toFixed(2);
        smallCap.new = (total*level.smallCap/100).toFixed(2);

        bonds.difference = (bonds.new-bonds.current).toFixed(2);
        largeCap.difference = (largeCap.new-largeCap.current).toFixed(2);
        midCap.difference = (midCap.new-midCap.current).toFixed(2);
        foreign.difference = (foreign.new-foreign.current).toFixed(2);
        smallCap.difference = (smallCap.new-smallCap.current).toFixed(2);

        this.props.dispatch({ type: REBALANCE, bonds, largeCap, midCap, foreign, smallCap, recommended: 'LISTO' });
    }

    render() {
        const risk = this.props.risk;

        return <div> 
            <div style = {buttonsStyles}>
                <Button 
                color={Colors.WARNING}
                onClick={() => this.props.dispatch({ type: CLEAR_VALUES })} >
                    Clear Values
                </Button>
                <Button 
                color={Colors.PRIMARY} 
                onClick={this.rebalance} >
                    Rebalance
                </Button>
            </div>
            <div style = {basicStyles}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2} >Current Amount</th>
                            <th>Difference</th>
                            <th>New Amount</th>
                            <th>Recommended Transfers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bonds $:</td>
                            <td><input type="number" value={this.props.bonds.current} 
                            onChange={(e) => this.props.dispatch({ type: SET_BONDS, value: e.target.value })}/></td>
                            <td><input type="number" value={this.props.bonds.difference} disabled
                            style={ this.props.bonds.difference >= 0 ? positive : negative }/></td>
                            <td><input type="number" value={this.props.bonds.new} disabled style={newAmount}/></td>
                            <td rowSpan={5} ><textarea disabled rows={12} value={this.props.recommended}></textarea></td>
                        </tr>
                        <tr>
                            <td>Large Cap $:</td>
                            <td><input type="number" value={this.props.largeCap.current} 
                            onChange={(e) => this.props.dispatch({ type: SET_LARGE_CAP, value: e.target.value  })}/></td>
                            <td><input type="number" value={this.props.largeCap.difference} disabled
                            style={ this.props.largeCap.difference >= 0 ? positive : negative }/></td>
                            <td><input type="number" value={this.props.largeCap.new} disabled style={newAmount}/></td>
                        </tr>
                        <tr>
                            <td>Mid Cap $:</td>
                            <td><input type="number" value={this.props.midCap.current} 
                            onChange={(e) => this.props.dispatch({ type: SET_MID_CAP, value: e.target.value  })}/></td>
                            <td><input type="number" value={this.props.midCap.difference} disabled
                            style={ this.props.midCap.difference >= 0 ? positive : negative }/></td>
                            <td><input type="number" value={this.props.midCap.new} disabled style={newAmount}/></td>
                        </tr>
                        <tr>
                            <td>Foreign $:</td>
                            <td><input type="number" value={this.props.foreign.current} 
                            onChange={(e) => this.props.dispatch({ type: SET_FOREIGN, value: e.target.value  })}/></td>
                            <td><input type="number" value={this.props.foreign.difference} disabled
                            style={ this.props.foreign.difference >= 0 ? positive : negative }/></td>
                            <td><input type="number" value={this.props.foreign.new} disabled style={newAmount}/></td>
                        </tr>
                        <tr>
                            <td>Small Cap $:</td>
                            <td><input type="number" value={this.props.smallCap.current} 
                            onChange={(e) => this.props.dispatch({ type: SET_SMALL_CAP, value: e.target.value  })}/></td>
                            <td><input type="number" value={this.props.smallCap.difference} disabled 
                            style={ this.props.smallCap.difference >= 0 ? positive : negative }/></td>
                            <td><input type="number" value={this.props.smallCap.new} disabled style={newAmount}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

const basicStyles = {
    display: 'flex',
    justifyContent: 'center'
}

const buttonsStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

const positive = {
    color: 'green'
}

const negative = {
    color: 'red'
}

const newAmount = {
    color: 'blue'
}

export default connect(mapStateToProps)(CalculatorTable);