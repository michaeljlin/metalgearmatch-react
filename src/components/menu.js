import React, { Component } from 'react';

class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showCards: this.props.showCards,
            showInfo: this.props.showInfo,
            start: this.props.start,
            mouseover: this.props.mouseover,
            message: props.message
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.state.showCards !== nextProps.showCards){
            this.setState({
                showCards: nextProps.showCards
            });
        }

        if(this.state.message !== nextProps.message){
            this.setState({
                message: nextProps.message
            });
        }

        if(this.state.showInfo !== nextProps.showInfo){
            this.setState({
                showInfo: nextProps.showInfo
            });
        }
    }

    render(){
        const showCards = this.state.showCards;
        const showInfo = this.state.showInfo;
        const message = this.state.message;

        let pointerStyle = null;
        let infoStyle = {};
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

        if(showInfo){
            infoStyle.opacity = 1;
            infoStyle['pointer-events'] = 'auto';

            clearStyle.opacity = 0;
            pointerStyle = {
                'pointer-events': 'none'
            };
        }
        else{
            infoStyle.opacity = 0;
            infoStyle['pointer-events'] = 'none';

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
        }

        return (
            <div className="menu" style={pointerStyle}>
                <div className="scanlines"></div>
                <div draggable="false" style={ infoStyle } className="info">
                    <h2 className="instructions">Instructions</h2>
                    <ul>
                        <li>Revealed enemy cards start independent alarm timers.</li>
                        <li>Running out of time on any alarm will deal 1 damage to Snake.</li>
                        <li>Matching any enemy card pair will clear all alarms.</li>
                        <li>Matching any ally card will restore 1 health to Snake.</li>
                        <li>Making wrong matches will increment the boss countdown.</li>
                        <li>When the boss turns have run out Snake will lose 1 maximum HP. The current card set will also be shuffled and reset</li>
                        <li>Clearing all cards will defeat the current boss</li>
                    </ul>
                    <p className="startClick" onMouseOver={this.props.mouseover} onClick={this.props.info} >Return to Game</p>
                </div>
                <div className="select">
                    <h1 className="titleWords" style={clearStyle}>{message !== "" ? message : '$ METAL GEAR SO$LID MEMORY MATCH'}</h1>
                    <p style={clearStyle} className="startClick" onMouseOver={this.props.mouseover} onClick={this.props.start}>{message !== "" && message !== "GAME OVER" && message !== "Mission Accomplished!" ? "" : 'Click Here to Start New Game'}</p>
                </div>
                <div className="backgroundMenu" style={clearStyle}></div>
                <div className="transitionMenu" ></div>
            </div>
        );
    }
}

export default Menu;