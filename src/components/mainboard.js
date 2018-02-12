import React, { Component } from 'react';
import Player from "./player";
import Boss from "./boss";
import Card from './card';
import Message from './messages';
import Menu from './menu';
import AlertText from './alertText';

import alertTracker from './alerts';

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
            counter: 0,
            playerStats: {
                health: 100,
                accuracy: 0
            },
            alerts: [{}]
        };

        this.dealcards = this.dealcards.bind(this);
        this.shufflecards = this.shufflecards.bind(this);
        this.reset = this.reset.bind(this);
        this.handleMatch = this.handleMatch.bind(this);
        this.handleAlly = this.handleAlly.bind(this);
        this.handleDamage = this.handleDamage.bind(this);
        this.handleItem = this.handleItem.bind(this);
        this.handleNewAlert = this.handleNewAlert.bind(this);
        this.handleAlertUpdate = this.handleAlertUpdate.bind(this);
        this.handleAlertTrigger = this.handleAlertTrigger.bind(this);
    }

    shufflecards(){
        const deck = [
            {num:1, flipped:false, fade: false, type:'enemy'},
            {num:2, flipped:false, fade: false, type:'enemy'},
            {num:3, flipped:false, fade: false, type:'enemy'},
            {num:4, flipped:false, fade: false, type: 'ally'},
            {num:5, flipped:false, fade: false, type: 'ally'},
            {num:6, flipped:false, fade: false, type: 'ally'},
            {num:7, flipped:false, fade: false, type: 'ally'},
            {num:8, flipped:false, fade: false, type: 'enemy'},
            {num:9, flipped:false, fade: false, type: 'ally'},
            {num:1, flipped:false, fade: false, type:'enemy'},
            {num:2, flipped:false, fade: false, type:'enemy'},
            {num:3, flipped:false, fade: false, type:'enemy'},
            {num:4, flipped:false, fade: false, type: 'ally'},
            {num:5, flipped:false, fade: false, type: 'ally'},
            {num:6, flipped:false, fade: false, type: 'ally'},
            {num:7, flipped:false, fade: false, type: 'ally'},
            {num:8, flipped:false, fade: false, type: 'enemy'},
            {num:9, flipped:false, fade: false, type: 'ally'}
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
            return (
                <div key={'cardContainer'+index} className={`container`}>
                    {/*<div className={'alertText'}>Test</div>*/}
                        <AlertText key={'alert'+index} cardID={index} alerts={this.state.alerts} />
                        <Card key={'card'+index} id={index} handleMatch={this.handleMatch} num={this.state.cards[index].num} flipped={this.state.cards[index].flipped} fade={this.state.cards[index].fade}/>
                </div>);
        });
    }

    handleAlert(){

    }

    handleDamage(cardID){
        const tempPlayer = {...this.state.playerStats};
        if(tempPlayer.health > 0) {
            tempPlayer.health -= 20;

            let alertIndex = this.state.alerts.findIndex((alerts) => {
                return alerts.cardID === cardID;
            });

            console.log('alertIndex is: ', alertIndex);

            let newAlertState = this.state.alerts;
            newAlertState.splice(alertIndex, 1);

            delete newAlertState[0][cardID];

            console.log('new alert state is: ', newAlertState);

            this.setState({
                playerStats: tempPlayer,
                alerts: newAlertState
            });
        }
    }

    handleAlertUpdate(remainingTime, cardID){
        let alertIndex = this.state.alerts.findIndex((alerts)=>{
            return alerts.cardID === cardID;
        });

        let tempAlert = this.state.alerts;
        tempAlert[alertIndex].remainingTime = remainingTime;

        this.setState({
            alerts: tempAlert
        });
    }

    handleAlly(){
        const tempPlayer = {...this.state.playerStats};

        if(tempPlayer.health < 100){
            tempPlayer.health+=20;
            this.setState({playerStats: tempPlayer});
        }
    }

    handleItem(){

    }

    handleNewAlert(cardID, num){
        console.log(`adding new alert for ${cardID} and num ${num}`);

        let tempAlerts = this.state.alerts;

        tempAlerts[0][cardID] = true;

        tempAlerts.push({
            cardID: cardID,
            num: num,
            maxTime: 500,
            remainingTime: 500,
            drainRate: 100
        });

        this.setState({
            alerts: tempAlerts
        });

        console.log(`state alerts is: `, this.state.alerts);
    }

    handleAlertTrigger(cardID, num){
        console.log(`triggering alert on cardID: ${cardID} and number: ${num}!`);
        alertTracker.remove(cardID);
        this.handleDamage(cardID);
    }

    handleMatch(cardID, num){
        const tempState = {...this.state};

        if(this.state.clickable === false || this.state.cards[cardID].flipped){
            return;
        }

        if(tempState.firstCard === null){
            console.log(`storing first card click from card ID: ${cardID}, card num: ${num}`);
            tempState.firstCard = {num: num, flipped: true, id: cardID};
            tempState.cards[cardID] = {num: num, flipped: true, fade: false, type: tempState.cards[cardID].type};

            if(tempState.cards[cardID].type === 'enemy' && !alertTracker.searchForSameID(cardID)){
                this.handleNewAlert(cardID, num);
                alertTracker.add(cardID, num, this.handleAlertTrigger, this.handleAlertUpdate);
            }
        }
        else if(tempState.secondCard === null){

            if(tempState.firstCard.id === cardID){
                console.log(`cannot match own card! returning!`);
                return;
            }

            console.log(`storing second card click from card ID: ${cardID}, card num: ${num}`);
            tempState.secondCard = {num: num, flipped: true, id: cardID};
            tempState.cards[cardID] = {num: num, flipped: true, fade: false, type: tempState.cards[cardID].type};
        }

        if(tempState.secondCard !== null){

            if(tempState.firstCard.num === tempState.secondCard.num){
                console.log(`A match has been made!`);
                tempState.counter++;

                if(tempState.cards[cardID].type === 'enemy'){
                    alertTracker.stop();
                    this.setState({
                        alerts: [{}]
                    });
                }
                else if(tempState.cards[cardID].type === 'ally'){
                    this.handleAlly();
                }
                else if(tempState.cards[cardID].type === 'item'){
                    this.handleItem();
                }

                if(tempState.counter < 9){
                    tempState.message = 'Made a match!';
                }
                else{
                    tempState.message = 'You won!';
                }

                tempState.cards[tempState.firstCard.id] = {num: tempState.firstCard.num, flipped: true, fade: true, type: tempState.cards[tempState.firstCard.id].type};
                tempState.cards[tempState.secondCard.id] = {num: tempState.secondCard.num, flipped: true, fade: true, type: tempState.cards[tempState.secondCard.id].type};

                tempState.firstCard = null;
                tempState.secondCard = null;

            }
            else{
                console.log(`Not a match, resetting cards!`);

                tempState.clickable = false;
                tempState.message = 'Not a match!';

                if(tempState.cards[cardID].type === 'enemy' && !alertTracker.searchForSameID(cardID)){
                    // alertTracker.add(cardID, num, ()=>{
                    //     console.log(`triggering alert on cardID: ${cardID} and number: ${num}!`);
                    //     alertTracker.remove(cardID);
                    //     this.handleDamage();
                    // });
                    this.handleNewAlert(cardID, num);
                    alertTracker.add(cardID, num, this.handleAlertTrigger, this.handleAlertUpdate);
                }

                setTimeout(function(){
                    // console.log('timeout executed');
                    tempState.cards[tempState.firstCard.id] = {num: tempState.firstCard.num, flipped: false, fade: false, type: tempState.cards[tempState.firstCard.id].type};
                    tempState.cards[tempState.secondCard.id] = {num: tempState.secondCard.num, flipped: false, fade: false, type: tempState.cards[tempState.secondCard.id].type};

                    tempState.firstCard = null;
                    tempState.secondCard = null;

                    tempState.clickable = true;

                    tempState.message = "";

                    // this.setState({...tempState});

                    this.setState({
                        cards: tempState.cards,
                        firstCard: tempState.firstCard,
                        secondCard: tempState.secondCard,
                        message: tempState.message,
                        clickable: tempState.clickable,
                        counter: tempState.counter,
                    });
                }.bind(this),2500);
            }
        }

        this.setState({
            cards: tempState.cards,
            firstCard: tempState.firstCard,
            secondCard: tempState.secondCard,
            message: tempState.message,
            clickable: tempState.clickable,
            counter: tempState.counter,
        });

        // this.setState({...tempState});

        console.log(tempState);
    }

    reset(){
        console.log('resetting');
        const deck = this.shufflecards();

        alertTracker.stop();

        this.setState({
            cards: deck,
            firstCard: null,
            secondCard: null,
            message: "",
            clickable: true,
            counter: 0,
            playerStats: {
                health: 100,
                accuracy: 0
            },
            alerts: [{}]
        });
    }

    render(){
        const {message, playerStats, alerts} = this.state;

        return(
            <div className="mainBoard">
                {/*<div className="message">{message}</div>*/}
                <Message message={message}/>

                <div className="console">
                    <div className="left_front"></div>
                    <div className="left"></div>
                    <Player stats={playerStats} reset={this.reset} />
                    <div className="front"></div>
                    <Menu />
                    <div className="cardDisplay">
                        {this.dealcards()}
                    </div>
                    <div className="right_front"></div>
                    <div className="right"></div>
                    <Boss />
                </div>
                {/*<button onClick={this.reset}>Reset</button>*/}
            </div>
        );
    }
}

export default Main;