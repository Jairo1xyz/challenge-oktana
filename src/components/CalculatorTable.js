import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';

import { connect } from 'react-redux';

import { SET_BONDS, SET_LARGE_CAP, SET_MID_CAP, SET_FOREIGN, SET_SMALL_CAP, REBALANCE, CLEAR_VALUES } from '../extras/actions';

class CalculatorTable extends Component {

    recordTransfers = (diffs) => {
        let recommended = '', left = 0.0, missing = 0.0;
        const amountMatch = [], diffsLength = diffs.length;

        for(let i = 0; diffs[i].value < 0 && i < diffsLength - 1; i++){
            const low = parseFloat(diffs[i].value);
            for(let j = diffsLength - 1; diffs[j].value > 0 && j > 0; j--){
                const high = parseFloat(diffs[j].value);
                if(Math.abs(low) == high ){
                    let prevMatched = false;
                    for(let k = 0; k < amountMatch.length; k++){
                        if(i == amountMatch[k].fromIndex || j == amountMatch[k].toIndex){
                            prevMatched = true;
                        }
                    }
                    if(!prevMatched){
                        recommended+='* Transfer $'+Math.abs(low).toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        amountMatch.push({ from: diffs[i].category, fromIndex: i, to: diffs[j].category, toIndex: j, amount: high });
                    }
                }
            }
        }

        const nMatches = amountMatch.length;

        if(nMatches == 2){
            return recommended;
        } else if(nMatches == 1){
            let i = 0, j = diffsLength - 1;
            diffs[amountMatch[0].fromIndex].value = 0;
            diffs[amountMatch[0].toIndex].value = 0;
            while(i < j){
                const low = parseFloat(diffs[i].value), high = parseFloat(diffs[j].value);
                
                if(missing == 0 && left == 0){
                    if(Math.abs(low) < high ){
                        if(low == 0){
                            i++;
                        } else if(high == 0){
                            j--;
                        } else{
                            recommended+='* Transfer $'+Math.abs(low).toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                            missing = high + low;
                            i++;
                        }
                    } else if(Math.abs(low) > high ){
                        if(low == 0){
                            i++;
                        } else if(high == 0){
                            j--;
                        } else{
                            recommended+='* Transfer $'+high.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                            left = Math.abs(low) - high;
                            j--;
                        }
                    } else{
                        i++;
                        j--;
                    }
                } else if(missing > 0){
                    if(Math.abs(low) < missing){
                        if(low == 0){
                            i++;
                        } else if(high == 0){
                            j--;
                        } else{
                            recommended+='* Transfer $'+Math.abs(low).toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                            missing += low;
                            i++;
                        }
                    } else if(Math.abs(low) > missing ){
                        if(low == 0){
                            i++;
                        } else if(high == 0){
                            j--;
                        } else{
                            recommended+='* Transfer $'+missing.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                            left = Math.abs(low) - missing;
                            missing = 0;
                            j--;
                        }
                    } else{
                        recommended+='* Transfer $'+missing.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        missing = 0;
                        left = 0;
                        i++;
                        j--;
                    }
                } else if(left > 0){
                    if(left < high){
                        if(low == 0){
                            i++;
                        } else if(high == 0){
                            j--;
                        } else{
                            recommended+='* Transfer $'+left.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                            missing = high - left;
                            left = 0;
                            i++;
                        }
                    } else if(left > high ){
                        if(low == 0){
                            i++;
                        } else if(high == 0){
                            j--;
                        } else{
                            recommended+='* Transfer $'+high.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                            left -= high;
                            j--;
                        }
                    } else{
                        recommended+='* Transfer $'+left.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        missing = 0;
                        left = 0;
                        i++;
                        j--;
                    }
                }
            }
        } else if(nMatches == 0){
            let i = 0, j = diffsLength - 1;
            while(i < j){
                const low = parseFloat(diffs[i].value), high = parseFloat(diffs[j].value);
                
                if(missing == 0 && left == 0){
                    if(Math.abs(low) < high ){
                        recommended+='* Transfer $'+Math.abs(low).toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        missing = high + low;
                        i++;
                    } else if(Math.abs(low) > high ){
                        recommended+='* Transfer $'+high.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        left = Math.abs(low) - high;
                        j--;
                    } else{
                        if(high != 0){
                            recommended+='* Transfer $'+high.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        }
                        i++;
                        j--;
                    }
                } else if(missing > 0){
                    if(Math.abs(low) < missing){
                        recommended+='* Transfer $'+Math.abs(low).toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        missing += low;
                        i++;
                    } else if(Math.abs(low) > missing ){
                        recommended+='* Transfer $'+missing.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        left = Math.abs(low) - missing;
                        missing = 0;
                        j--;
                    } else{
                        recommended+='* Transfer $'+missing.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        missing = 0;
                        i++;
                        j--; 
                    }
                } else if(left > 0){
                    if(left < high){
                        recommended+='* Transfer $'+left.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        missing = high - left;
                        left = 0;
                        i++;
                    } else if(left > high ){
                        recommended+='* Transfer $'+high.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        left -= high;
                        j--;
                    } else{
                        recommended+='* Transfer $'+left.toFixed(2)+' from '+diffs[i].category+' to '+diffs[j].category+'.\n';
                        left = 0;
                        i++;
                        j--; 
                    }
                }
            }
        }

        return recommended === '' ? 'No transfers needed.' : recommended;
    }

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

        const diffs = [
            { category: 'Bonds', value: bonds.difference },
            { category: 'Large Cap', value: largeCap.difference },
            { category: 'Mid Cap', value: midCap.difference },
            { category: 'Foreign', value: foreign.difference },
            { category: 'Small Cap', value: smallCap.difference }
        ];

        diffs.sort(function (a, b) {
            return a.value - b.value;
        });

        let recommended = this.recordTransfers(diffs);

        this.props.dispatch({ type: REBALANCE, bonds, largeCap, midCap, foreign, smallCap, recommended });
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
                isDisabled={ (
                    this.props.bonds.current >= 0 && this.props.bonds.current !== '' &&
                    this.props.largeCap.current >= 0 && this.props.largeCap.current !== '' &&
                    this.props.midCap.current >= 0 && this.props.midCap.current !== '' &&
                    this.props.foreign.current >= 0 && this.props.foreign.current !== '' &&
                    this.props.smallCap.current >= 0 && this.props.smallCap.current !== '' ) ? false : true }
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
                            <td><input type="number" value={this.props.bonds.current} min={0}
                            onChange={(e) => this.props.dispatch({ type: SET_BONDS, value: e.target.value })}/></td>
                            <td><input type="number" value={this.props.bonds.difference} disabled
                            style={ this.props.bonds.difference >= 0 ? positive : negative }/></td>
                            <td><input type="number" value={this.props.bonds.new} disabled style={newAmount}/></td>
                            <td rowSpan={5} ><textarea disabled rows={12} value={this.props.recommended}></textarea></td>
                        </tr>
                        <tr>
                            <td>Large Cap $:</td>
                            <td><input type="number" value={this.props.largeCap.current} min={0}
                            onChange={(e) => this.props.dispatch({ type: SET_LARGE_CAP, value: e.target.value  })}/></td>
                            <td><input type="number" value={this.props.largeCap.difference} disabled
                            style={ this.props.largeCap.difference >= 0 ? positive : negative }/></td>
                            <td><input type="number" value={this.props.largeCap.new} disabled style={newAmount}/></td>
                        </tr>
                        <tr>
                            <td>Mid Cap $:</td>
                            <td><input type="number" value={this.props.midCap.current} min={0}
                            onChange={(e) => this.props.dispatch({ type: SET_MID_CAP, value: e.target.value  })}/></td>
                            <td><input type="number" value={this.props.midCap.difference} disabled
                            style={ this.props.midCap.difference >= 0 ? positive : negative }/></td>
                            <td><input type="number" value={this.props.midCap.new} disabled style={newAmount}/></td>
                        </tr>
                        <tr>
                            <td>Foreign $:</td>
                            <td><input type="number" value={this.props.foreign.current} min={0}
                            onChange={(e) => this.props.dispatch({ type: SET_FOREIGN, value: e.target.value  })}/></td>
                            <td><input type="number" value={this.props.foreign.difference} disabled
                            style={ this.props.foreign.difference >= 0 ? positive : negative }/></td>
                            <td><input type="number" value={this.props.foreign.new} disabled style={newAmount}/></td>
                        </tr>
                        <tr>
                            <td>Small Cap $:</td>
                            <td><input type="number" value={this.props.smallCap.current} min={0}
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