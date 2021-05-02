import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';
import history from '../extras/history';

import { connect } from 'react-redux';

import Container from "./Container";
import { SET, CLEAR_REBALANCED_VALUES } from '../extras/actions';

class Home extends Component {

    render() {

        const btns = [];

        for(let i=1; i<=10; i++){
            btns.push(
                <Button 
                color={Colors.SECONDARY} 
                isHollow={ this.props.risk === i ? false : true } 
                key={i} 
                onClick={() => {
                    this.props.dispatch({ type: SET, risk: i });
                    this.props.dispatch({ type: CLEAR_REBALANCED_VALUES });
                }}
                style = {buttonStyles}>
                    {i}
                </Button>
            );
        }

        return this.props.loading ? <div style={labelStyles}>Loading...</div> : ( this.props.error === null ? <div> 
            <div style = {labelStyles}>Please Select A Risk Level For Your Investment Portfolio</div>
            
            <div style = {riskLevelsStyles}>
                <div>Low</div>
                <div>High</div>
            </div>

            <div style = {basicStyles}>
                {btns}
            </div>

            <div style = {basicStyles}>
                <Button 
                color={Colors.SUCCESS} 
                isDisabled={ this.props.risk === 0 ? true : false }
                onClick={() => {
                    if(this.props.risk !== 0) 
                        history.push('/Calculator')
                }}
                style = {buttonStyles}>
                    Continue
                </Button>
            </div>

            <Container/>

        </div> : <div style={labelStyles}>An error ocurred while loading risk levels data. { this.props.error }</div> )
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

const buttonStyles = {
    margin: '5px'
}

const labelStyles = {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold'
}

const basicStyles = {
    display: 'flex',
    justifyContent: 'center'
}

const riskLevelsStyles ={
    display: 'flex',
    flexDirection: 'row',
    fontSize: '18px',
    justifyContent: 'space-between'
}

export default connect(mapStateToProps)(Home);