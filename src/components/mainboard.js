import React, { Component } from 'react';
import Player from "./player";
import Boss from "./boss";
import Card from './card';

import backImg from '../assets/images/mgscard.svg';

class Main extends Component{
    constructor(props){
        super(props);

        const deck = this.shufflecards();

        this.state = {
            cards: deck,
            firstCard: null,
            secondCard: null,
            message: "",
            clickable: true,
            counter: 0
        };

        this.dealcards = this.dealcards.bind(this);
        this.shufflecards = this.shufflecards.bind(this);
        this.reset = this.reset.bind(this);
        this.handleMatch = this.handleMatch.bind(this);
    }

    shufflecards(){
        const deck = [
            {num:1, flipped:false},
            {num:2, flipped:false},
            {num:3, flipped:false},
            {num:4, flipped:false},
            {num:5, flipped:false},
            {num:6, flipped:false},
            {num:7, flipped:false},
            {num:8, flipped:false},
            {num:9, flipped:false},
            {num:1, flipped:false},
            {num:2, flipped:false},
            {num:3, flipped:false},
            {num:4, flipped:false},
            {num:5, flipped:false},
            {num:6, flipped:false},
            {num:7, flipped:false},
            {num:8, flipped:false},
            {num:9, flipped:false}
        ];

        for(let count  = 0; count < deck.length; count++){
            let random = Math.floor(Math.random()*deck.length);
            let temp = deck[count];
            deck[count] = deck[random];
            deck[random] = temp;
        }

        console.log(`deck: `,deck);

        return deck;
    };

    dealcards() {
        return this.state.cards.map((cards, index) => {
            return (<Card key={index} id={index} handleMatch={this.handleMatch} num={this.state.cards[index].num} flipped={this.state.cards[index].flipped}/>);
        });
    }

    handleMatch(cardID, num){
        const tempState = {...this.state};

        if(this.state.clickable === false || this.state.cards[cardID].flipped){
            return;
        }

        if(tempState.firstCard === null){
            console.log(`storing first card click from card ID: ${cardID}, card num: ${num}`);
            tempState.firstCard = {num: num, flipped: true, id: cardID};
            tempState.cards[cardID] = {num: num, flipped: true};
        }
        else if(tempState.secondCard === null){

            if(tempState.firstCard.id === cardID){
                console.log(`cannot match own card! returning!`);
                return;
            }

            console.log(`storing second card click from card ID: ${cardID}, card num: ${num}`);
            tempState.secondCard = {num: num, flipped: true, id: cardID};
            tempState.cards[cardID] = {num: num, flipped: true};
        }

        if(tempState.secondCard !== null){

            if(tempState.firstCard.num === tempState.secondCard.num){
                console.log(`A match has been made!`);
                tempState.counter++;

                if(tempState.counter < 9){
                    tempState.message = 'Made a match!';
                }
                else{
                    tempState.message = 'You won!';
                }

                tempState.cards[tempState.firstCard.id] = {num: tempState.firstCard.num, flipped: true};
                tempState.cards[tempState.secondCard.id] = {num: tempState.secondCard.num, flipped: true};

                tempState.firstCard = null;
                tempState.secondCard = null;
            }
            else{
                console.log(`Not a match, resetting cards!`);

                tempState.clickable = false;
                tempState.message = 'Not a match!';

                setTimeout(function(){
                    console.log('timeout executed');
                    tempState.cards[tempState.firstCard.id] = {num: tempState.firstCard.num, flipped: false};
                    tempState.cards[tempState.secondCard.id] = {num: tempState.secondCard.num, flipped: false};

                    tempState.firstCard = null;
                    tempState.secondCard = null;

                    tempState.clickable = true;

                    this.setState({...tempState});
                }.bind(this),2500);
                // tempState.cards[tempState.firstCard.id] = {num: tempState.firstCard.num, flipped: false};
                // tempState.cards[tempState.secondCard.id] = {num: tempState.secondCard.num, flipped: false};
                //
                // tempState.firstCard = null;
                // tempState.secondCard = null;
                //
                // tempState.message = 'Not a match!';
            }
        }

        this.setState({...tempState});

        console.log(tempState);
    }

    reset(){
        console.log('resetting');
        const deck = this.shufflecards();

        this.setState({
            cards: deck,
            firstCard: null,
            secondCard: null,
            message: "",
            clickable: true,
            counter: 0
        });
    }

    render(){
        const {message} = this.state;

        return(
            <div className="mainBoard">
                <div className="message">{message}</div>
                <Player reset={this.reset} />
                <div className="cardDisplay">
                    {this.dealcards()}
                </div>
                <Boss />
                {/*<button onClick={this.reset}>Reset</button>*/}
            </div>
        );
    }
}

export default Main;