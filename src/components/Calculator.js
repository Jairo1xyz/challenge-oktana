import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';
import history from '../extras/history';

import { connect } from 'react-redux';

import CalculatorTable from './CalculatorTable';

class Calculator extends Component {

    render() {
        const risk = this.props.risk;
        if( risk === 0 ){
            return <div style = {labelStyles}>Risk level not setted. Go home and set a risk level first.</div>
        }
        else{
            const level = risk === 0 ? null : this.props.data[risk-1];

            return <div> 
                <div style = {labelStyles}>Personalized Portfolio</div>
                <div style = {subLabelStyles}>Risk Level { risk }</div>
                <div style = {basicStyles}>
                    <table>
                        <thead>
                            <tr>
                                <th>Bonds</th>
                                <th>Large Cap</th>
                                <th>Mid Cap</th>
                                <th>Foreign</th>
                                <th>Small Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{level.bonds}%</td>
                                <td>{level.largeCap}%</td>
                                <td>{level.midCap}%</td>
                                <td>{level.foreign}%</td>
                                <td>{level.smallCap}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style = {subLabelStyles}>Please Enter Your Current Portfolio</div>
                <CalculatorTable/>
            </div>
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

const labelStyles = {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 'bold'
}

const subLabelStyles = {
    fontSize: '22px',
    fontWeight: 'bold'
}

const basicStyles = {
    display: 'flex',
    justifyContent: 'center'
}

export default connect(mapStateToProps)(Calculator);