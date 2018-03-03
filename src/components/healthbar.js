import React, { Component } from 'react';

class Healthbar extends Component{

    constructor(props){
        super(props);

        this.state = {
            HP: props.HP,
            maxHP: props.maxHP,
            healthStyle:{
                width: (props.HP/props.maxHP)*100+'%'
            }
        }
    }

    componentWillReceiveProps(nextProps){

        if(this.state.HP !== nextProps.HP){
            const tempState = {...nextProps};
            tempState.healthStyle = {
                width: (nextProps.HP/nextProps.maxHP)*100+'%'
            };

            this.setState(tempState);
        }

        if(this.state.maxHP !== nextProps.maxHP){
            const tempState = {...nextProps};
            tempState.healthStyle = {
                width: (nextProps.HP/nextProps.maxHP)*100+'%'
            };

            this.setState(tempState);
        }
    }

    render(){
        const {healthStyle, HP, maxHP} = this.state;

        return(
            <div className="healthContainer">
                <div style={healthStyle} className="health">
                </div>
                <p className="lifeText">LIFE: {HP}/{maxHP}</p>
            </div>
        );
    }
}

export default Healthbar;