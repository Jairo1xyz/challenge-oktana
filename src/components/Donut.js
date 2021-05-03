import React, { Component } from 'react';
import 'foundation-sites/dist/css/foundation.min.css';
import { PieChart } from 'react-minimal-pie-chart';

import { connect } from 'react-redux';

class Donut extends Component {

    render() {
        const riskIndex = this.props.risk - 1;
        let data = [];
        if(this.props.data[riskIndex].bonds != 0){
            data.push({ title: `Bonds: ${this.props.data[riskIndex].bonds}%`, value: this.props.data[riskIndex].bonds, color: '#FF0000' });
        }
        if(this.props.data[riskIndex].largeCap != 0){
            data.push({ title: `Large Cap: ${this.props.data[riskIndex].largeCap}%`, value: this.props.data[riskIndex].largeCap, color: '#00FF00' });
        }
        if(this.props.data[riskIndex].midCap != 0){
            data.push({ title: `Mid Cap: ${this.props.data[riskIndex].midCap}%`, value: this.props.data[riskIndex].midCap, color: '#0000FF' });
        }
        if(this.props.data[riskIndex].foreign != 0){
            data.push({ title: `Foreign: ${this.props.data[riskIndex].foreign}%`, value: this.props.data[riskIndex].foreign, color: '#AAAA00' });
        }
        if(this.props.data[riskIndex].smallCap != 0){
            data.push({ title: `Small Cap: ${this.props.data[riskIndex].smallCap}%`, value: this.props.data[riskIndex].smallCap, color: '#00AAAA' });
        }
        return <div> 
            <PieChart
                center={[50, 50]}
                data={data}
                lengthAngle={360}
                lineWidth={60}
                paddingAngle={0}
                radius={50}
                startAngle={0}
                viewBoxSize={[100, 100]}
                label={(data) => data.dataEntry.title}
                labelPosition={65}
                labelStyle={{
                  fontSize: '3px',
                  fontWeight: '700'
                }}
            />
        </div>
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(Donut);