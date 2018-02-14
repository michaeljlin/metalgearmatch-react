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

            console.log('showinfo is: ', nextProps.showInfo);
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
                    <h1>Instructions will go here</h1>
                    <p className="startClick" onMouseOver={this.props.mouseover} onClick={this.props.info} >Return to Game</p>
                </div>
                <div className="select">
                    <h1 className="titleWords" style={clearStyle}>{message !== "" ? message : '$ METAL GEAR SO$LID MEMORY MATCH'}</h1>
                    <p style={clearStyle} className="startClick" onMouseOver={this.props.mouseover} onClick={this.props.start}>{message !== "" && message !== "GAME OVER" ? "" : 'Click Here to Start'}</p>
                </div>
                <div className="backgroundMenu" style={clearStyle}></div>
                <div className="transitionMenu" ></div>
            </div>
        );
    }
}

export default Menu;