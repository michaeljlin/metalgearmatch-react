import React, { Component } from 'react';

class Healthbar extends Component{

    constructor(props){
        super(props);

        this.state = {
            HP: props.HP,
            healthStyle:{
                width: props.HP+'%'
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.HP !== nextProps.HP){
            const tempState = {...nextProps};

            this.setState(tempState);
        }
    }

    render(){
        const {healthStyle} = this.state;

        return(
            <div className="healthContainer">
                <div style={healthStyle} className="health">
                </div>
                <p className="lifeText">LIFE</p>
            </div>
        );
    }
}

export default Healthbar;