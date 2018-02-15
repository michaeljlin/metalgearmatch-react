import React, { Component } from 'react';

class AlertText extends Component{
    constructor(props){
        super(props);

        this.state = {
            cardID: this.props.cardID,
            remainingTime: null
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.alerts[0][this.state.cardID] === true){
            // console.log(`alertText cardID ${this.state.cardID} received props: `, nextProps.alerts);

            let alert = nextProps.alerts.find((alerts)=>{
                return alerts.cardID === this.state.cardID;
            });

            this.setState({
                remainingTime: alert.remainingTime
            });
        }
        else{
            this.setState({
                remainingTime: null
            });
        }
    }

    render(){
        const {cardID, remainingTime} = this.state;

        return (
            <div style={{display: `${remainingTime === null ? 'none' : 'block'}`}} className={'alertText digitalText'}>{
                remainingTime === null ? "" : `${(remainingTime-remainingTime%1000)/1000}:${(remainingTime%1000)/10}`
            }</div>
        );
    }
}

export default AlertText;