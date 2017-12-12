import React, { Component } from 'react';
import backImg from '../assets/images/mgscard.svg';
import './app.css';

class Card extends Component{
    constructor(props) {
        super(props);

        this.state = {
            num: this.props.num,
            frontStyle: {
                'backgroundColor': 'blue',
                display: 'none'
            },
            backStyle: {
                'backgroundColor': 'red',
                display: 'block'
            }
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log('got message');
        if(nextProps.display){
            this.setState({
                frontStyle: {
                    'backgroundColor': 'blue',
                    display: 'none'
                },
                backStyle: {
                    'backgroundColor': 'red',
                    display: 'block'
                }
            });
        }
        // console.log(this.state);
    }

    handleClick(){
        console.log(`you got ${this.state.num}!`);

        if(this.state.frontStyle.display === 'none'){
            this.setState({
                frontStyle:{
                    'backgroundColor': 'blue',
                    display: 'block'
                },
                backStyle: {
                    'backgroundColor': 'red',
                    display: 'none'
                }
            });
        }
        else{
            this.setState({
                frontStyle:{
                    'backgroundColor': 'blue',
                    display: 'none'
                },
                backStyle: {
                    'backgroundColor': 'red',
                    display: 'block'
                }
            });
        }
    }

    render(){
        const {frontStyle, backStyle} = this.state;

        return(
            <div>
                <div className={"card"} style={frontStyle} onClick={this.handleClick}>
                    <img src={backImg}/>
                </div>
                <div className={"card"} style={backStyle} onClick={this.handleClick}>
                    <img src={backImg}/>
                </div>
                {this.props.num}
            </div>
        );
    }
}

export default Card;