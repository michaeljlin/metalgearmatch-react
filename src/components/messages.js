import React, { Component } from 'react';

class Messages extends Component{
    constructor(props){
        super(props);

        this.state = {
            message: props.message,
            messageStyle: {
                height: '80%',
                width: '99%',
            }
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.state.message !== nextProps.message){
            const tempState = {...this.state};
            tempState.message = nextProps.message;

            this.setState(tempState);
        }
    }

    render(){

        const {messageStyle, message} = this.state;

        return(
            <div style={{...messageStyle}} className="message">
                <div>{message}</div>
            </div>
        );
    }
}

export default Messages;