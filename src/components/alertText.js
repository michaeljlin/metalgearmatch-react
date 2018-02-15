import React, { Component } from 'react';

class AlertText extends Component{
    constructor(props){
        super(props);

        this.state = {
            cardID: this.props.cardID,
            remainingTime: null,
            cardState: this.props.cardState
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

        if(nextProps.cardState !== this.state.cardState){
            this.setState({
                cardState: nextProps.cardState
            });
        }
    }

    render(){
        const {remainingTime, cardState} = this.state;

        return (
            <div style={{display: `${remainingTime === null || !cardState ? 'none' : 'block'}`}} className={'alertText digitalText'}>{
                remainingTime === null ? "" : `${(remainingTime-remainingTime%1000)/1000}:${(remainingTime%1000)/10}`
            }</div>
        );
    }
}

export default AlertText;