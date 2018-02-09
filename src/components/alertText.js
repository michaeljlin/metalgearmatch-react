import React, { Component } from 'react';

class AlertText extends Component{
    constructor(props){
        super(props);

        this.state = {
            cardID: this.props.cardID
        };
    }


    render(){
        const {cardID} = this.state;

        return (
            <div className={'alertText'}>{`Card #: ${cardID}`}</div>
        );
    }
}

export default AlertText;