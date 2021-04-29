import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { Button, Colors, MenuText, Menu } from 'react-foundation';
import history from '../extras/history';

import { connect } from 'react-redux';

class Home extends Component {

    render() {

        const btns = [];

        for(let i=1; i<=10; i++){
            btns.push(
                <Button color={Colors.SECONDARY} 
                isHollow={this.props.risk === i ? false : true } 
                key={i} 
                onClick={() => this.props.dispatch({ type: "SET", risk: i })}
                style = {styles}>
                    {i}
                </Button>
            );
        }

        return <div> 
            <div>Please Select A Risk Level For Your Investment Portfolio</div>
            <div>{this.props.risk}</div>
            <Menu isExpanded>
                <MenuText>Low</MenuText>
                <MenuText>High</MenuText>
            </Menu>
            <div>
                {btns}
            </div>
            
            {/*<Button color={Colors.SUCCESS} onClick={() => history.push('/Sample2')}>Go to Sample2</Button>*/}
        </div>
    }
}

function mapStateToProps(state) {
    return {
        risk: state.risk
    };
}

const styles = {
    margin: '5px'
  }

export default connect(mapStateToProps)(Home);