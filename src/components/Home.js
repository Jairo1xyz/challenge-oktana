import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';
import history from '../extras/history';

import { connect } from 'react-redux';

import Container from "./Container";

class Home extends Component {

    render() {

        const btns = [];

        for(let i=1; i<=10; i++){
            btns.push(
                <Button 
                color={Colors.SECONDARY} 
                isHollow={ this.props.risk === i ? false : true } 
                key={i} 
                onClick={() => this.props.dispatch({ type: "SET", risk: i })}
                style = {buttonStyles}>
                    {i}
                </Button>
            );
        }

        return <div> 
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
                onClick={() => history.push('/Calculator')}
                isDisabled={ this.props.risk === 0 && this.props.error === null ? true : false }
                style = {buttonStyles}>
                    Continue
                </Button>
            </div>

            { this.props.loading ? <div style={labelStyles}>Loading...</div> : 
            (this.props.error === null ? <Container/> : 
            <div style={labelStyles}>An error ocurred while loading risk levels data</div> ) }

            
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