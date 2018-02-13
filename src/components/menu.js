import React, { Component } from 'react';

class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showCards: this.props.showCards,
            start: this.props.start,
            mouseover: this.props.mouseover
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.state.showCards !== nextProps.showCards){
            this.setState({
                showCards: nextProps.showCards
            });
        }
    }

    render(){
        const showCards = this.state.showCards;

        let pointerStyle = null;
        let clearStyle = null;

        if(showCards){
            pointerStyle = {
                'pointer-events': 'none'
            };

            clearStyle = {
                opacity: 0
            }
        }
        else{
            pointerStyle = {
                'pointer-events': 'auto'
            };

            clearStyle = {
                opacity: 1
            }
        }

        return (
            <div className="menu" style={pointerStyle}>
                <div className="scanlines"></div>
                <div className="select">
                    <h1 style={clearStyle}>$ METAL GEAR SO$LID MEMORY MATCH</h1>
                    <p style={clearStyle} className="startClick" onMouseOver={this.props.mouseover} onClick={this.props.start}>Click Here to Start</p>
                </div>
                <div className="backgroundMenu" style={clearStyle}></div>
                <div className="transitionMenu"></div>
            </div>
        );
    }
}

export default Menu;