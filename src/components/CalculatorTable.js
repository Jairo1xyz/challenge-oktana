import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';

import { connect } from 'react-redux';

import { SET_BONDS, SET_LARGE_CAP, SET_MID_CAP, SET_FOREIGN, SET_SMALL_CAP, REBALANCE, CLEAR_VALUES } from '../extras/actions';

class CalculatorTable extends Component {

    render() {

        const risk = this.props.risk;
        
        const level = this.props.data[risk-1];

        return <div> 
            <div style = {buttonsStyles}>
                <Button 
                color={Colors.WARNING}
                onClick={() => this.props.dispatch({ type: CLEAR_VALUES })} >
                    Clear Values
                </Button>
                <Button 
                color={Colors.PRIMARY} >
                    Rebalance
                </Button>
            </div>
            <div style = {basicStyles}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2} >Curren Amount</th>
                            <th>Difference</th>
                            <th>New Amount</th>
                            <th>Recommended Transfers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bonds $:</td>
                            <td><input type="number" value={this.props.bonds} onChange={(e) => this.props.dispatch({ type: SET_BONDS, value: e.target.value })}/></td>
                            <td><input type="number" disabled/></td>
                            <td><input type="number" disabled/></td>
                            <td rowSpan={5} ><textarea disabled rows={12} ></textarea></td>
                        </tr>
                        <tr>
                            <td>Large Cap $:</td>
                            <td><input type="number" value={this.props.largeCap} onChange={(e) => this.props.dispatch({ type: SET_LARGE_CAP, value: e.target.value  })}/></td>
                            <td><input type="number" disabled/></td>
                            <td><input type="number" disabled/></td>
                        </tr>
                        <tr>
                            <td>Mid Cap $:</td>
                            <td><input type="number" value={this.props.midCap} onChange={(e) => this.props.dispatch({ type: SET_MID_CAP, value: e.target.value  })}/></td>
                            <td><input type="number" disabled/></td>
                            <td><input type="number" disabled/></td>
                        </tr>
                        <tr>
                            <td>Foreign $:</td>
                            <td><input type="number" value={this.props.foreign} onChange={(e) => this.props.dispatch({ type: SET_FOREIGN, value: e.target.value  })}/></td>
                            <td><input type="number" disabled/></td>
                            <td><input type="number" disabled/></td>
                        </tr>
                        <tr>
                            <td>Small Cap $:</td>
                            <td><input type="number" value={this.props.smallCap} onChange={(e) => this.props.dispatch({ type: SET_SMALL_CAP, value: e.target.value  })}/></td>
                            <td><input type="number" disabled/></td>
                            <td><input type="number" disabled/></td>
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

const buttonsStyles ={
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export default connect(mapStateToProps)(CalculatorTable);