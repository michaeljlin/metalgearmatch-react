import React, { Component } from 'react';

class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showCards: this.props.showCards
        }
    }

    render(){
        const showCards = this.state.showCards;

        let pointerStyle = null;

        if(showCards){
            pointerStyle = {
                'pointer-events': 'none'
            }
        }
        else{
            pointerStyle = {
                'pointer-events': 'auto'
            }
        }

        return (
            <div className="menu" style={pointerStyle}>
                <div className="select">
                    This will be the Menu component
                </div>
            </div>
        );
    }
}

export default Menu;