import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors } from 'react-foundation';
import history from '../extras/history';

import { connect } from 'react-redux';

import Container from "./Container";

class Home extends Component {

    /*async componentDidMount() {
        const res = await fetch("http://jsonplaceholder.typicode.com/posts")
        const data = await res.json()
        console.log(data)
        this.setState({
            posts: data
        })
    }*/

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
                isDisabled={ this.props.risk === 0 ? true : false }
                style = {buttonStyles}>
                    Continue
                </Button>
            </div>
            <Button 
            color={Colors.WARNING} 
            onClick={() => this.props.dispatch({ type: "LOADED" })}
            style = {buttonStyles}>
                Finish loading...
            </Button>
            { this.props.loading ? <div style={labelStyles}>Loading...</div> : <Container/> }
            <div style = {basicStyles}>
                <table>
                    <thead>
                        <tr>
                            <th>t1</th>
                            <th>t2</th>
                            <th>t3</th>
                            <th>t4</th>
                            <th>t5</th>
                            <th>t6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style = {trHighlightedStyles}>
                            <td>td1</td>
                            <td>td2</td>
                            <td>td3</td>
                            <td>td4</td>
                            <td>td5</td>
                            <td>td6</td>
                        </tr>
                        <tr>
                            <td>td1</td>
                            <td>td2</td>
                            <td>td3</td>
                            <td>td4</td>
                            <td>td5</td>
                            <td>td6</td>
                        </tr>
                        <tr>
                            <td>td1</td>
                            <td>td2</td>
                            <td>td3</td>
                            <td>td4</td>
                            <td>td5</td>
                            <td>td6</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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

const trHighlightedStyles = {
    background: 'gray',
    color: 'white'
}

export default connect(mapStateToProps)(Home);