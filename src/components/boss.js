import React, { Component } from 'react';

class Boss extends Component{
    constructor(props) {
        super(props);

        this.state = {
            attack: this.props.attack,
            attempts: this.props.attempts,
            maxAttempts: 10
        }
    }

    componentWillReceiveProps(nextProps){
        // console.log(`boss received new props: `, nextProps);

        if(nextProps.attempts!== this.state.attempts){

            if(nextProps.attempts === this.state.maxAttempts){
                this.state.attack();
                return;
            }

            this.setState({
                attempts: nextProps.attempts
            });
        }
    }

    render(){
        // console.log('boss alerts state: ', this.state.alerts);
        const attempts = this.state.attempts;

        return(
            <div className="boss">
                <p>Boss Profile</p>
                <p>Turns until attack: {this.state.maxAttempts-attempts}</p>
            </div>
        );
    }
}

export default Boss;