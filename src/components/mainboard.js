import React, { Component } from 'react';
import Player from "./player";
import Boss from "./boss";
import Card from './card';
import Message from './messages';
import Menu from './menu';
import AlertText from './alertText';

import alertTracker from './alerts';
import soundHandler from './soundboard';

import backImg from '../assets/images/mgscard.svg';

class Main extends Component{
    constructor(props){
        super(props);

        soundHandler.initialize();
        alertTracker.soundHandler(soundHandler);

        this.state = {
            cards: this.shufflecards(),
            firstCard: null,
            secondCard: null,
            message: "",
            clickable: true,
            counter: 0,
            failedAttempts: 0,
            playerStats: {
                health: 5,
                accuracy: 0,
                maxHealth: 5
            },
            alerts: [{}],
            timeoutTracker: null,
            resetFlag: false,
            showCards: false,
            bossState: null
        };

        this.dealcards = this.dealcards.bind(this);
        this.shufflecards = this.shufflecards.bind(this);
        this.reset = this.reset.bind(this);
        this.handleMatch = this.handleMatch.bind(this);
        this.handleAlly = this.handleAlly.bind(this);
        this.handleDamage = this.handleDamage.bind(this);
        this.handleNewAlert = this.handleNewAlert.bind(this);
        this.handleAlertUpdate = this.handleAlertUpdate.bind(this);
        this.handleAlertTrigger = this.handleAlertTrigger.bind(this);
        this.handleSoundToggle = this.handleSoundToggle.bind(this);
        this.handleStartClicked = this.handleStartClicked.bind(this);
        this.handleBossAttack = this.handleBossAttack.bind(this);
        this.handlemouseover = this.handlemouseover.bind(this);
        this.handleBoardClear = this.handleBoardClear.bind(this);
    }

    componentDidMount(){
        soundHandler.play('sneak');

        // setTimeout(()=>{
        //     this.setState({
        //         showCards: true
        //     });
        // }, 1000);
    }

    handleStartClicked(){
        soundHandler.play('start');

        if(this.state.bossState === null){
            this.setState({
                showCards: true,
                bossState: 1
            });
        }
        else {
            this.reset({health: 5, accuracy: 0, maxHealth: 5}, ()=>{

                console.log('state at reset before showCards: ', this.state);

                this.setState({
                    showCards: true,
                    bossState: 1,
                    clickable: true
                });
            });
        }
    }

    shufflecards(){
        const deck = [
            {num:1, flipped:false, fade: false, type:'enemy'},
            {num:2, flipped:false, fade: false, type:'enemy'},
            {num:3, flipped:false, fade: false, type:'enemy'},
            {num:4, flipped:false, fade: false, type: 'enemy'},
            {num:5, flipped:false, fade: false, type: 'ally'},
            {num:6, flipped:false, fade: false, type: 'ally'},
            {num:7, flipped:false, fade: false, type: 'ally'},
            {num:8, flipped:false, fade: false, type: 'ally'},
            {num:9, flipped:false, fade: false, type: 'ally'},
            {num:1, flipped:false, fade: false, type:'enemy'},
            {num:2, flipped:false, fade: false, type:'enemy'},
            {num:3, flipped:false, fade: false, type:'enemy'},
            {num:4, flipped:false, fade: false, type: 'enemy'},
            {num:5, flipped:false, fade: false, type: 'ally'},
            {num:6, flipped:false, fade: false, type: 'ally'},
            {num:7, flipped:false, fade: false, type: 'ally'},
            {num:8, flipped:false, fade: false, type: 'ally'},
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
                        <Card key={'card'+index} id={index} reset={this.state.resetFlag} handleMatch={this.handleMatch} num={this.state.cards[index].num} flipped={this.state.cards[index].flipped} fade={this.state.cards[index].fade}/>
                </div>);
        });
    }

    handleAlert(){

    }

    handleDamage(cardID){
        const tempPlayer = {...this.state.playerStats};
        if(tempPlayer.health > 0) {
            tempPlayer.health -= 1;
        }

        if(tempPlayer.health === 0){

            alertTracker.stop();

            this.setState({
                playerStats: tempPlayer,
                message: "GAME OVER",
                clickable: false,
                showCards: false,
                bossState: 0,
                alerts: [{}]
            });
            return;
        }

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

        soundHandler.play('ally');

        if(tempPlayer.health < tempPlayer.maxHealth){
            tempPlayer.health+=1;
            this.setState({playerStats: tempPlayer});
        }
    }

    handlemouseover() {
        soundHandler.play('option');
    }

    handleSoundToggle(){
        soundHandler.soundSwitch();

        if(soundHandler.getSoundState()){
            console.log('in sound switch state: ', this.state);
            if(this.state.alerts.length > 1){
                soundHandler.play('alert');
            }
            else{
                soundHandler.play('sneak');
            }
        }
        else{
            soundHandler.stop('all');
        }
    }

    handleNewAlert(cardID, num){
        console.log(`adding new alert for ${cardID} and num ${num}`);

        soundHandler.play('found');
        soundHandler.play('alert');

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

    handleBossAttack(){

        let tempPlayer = this.state.playerStats;

        if(tempPlayer.health === 1){

            tempPlayer.health = 0;

            alertTracker.stop();

            this.setState({
                playerStats: {health: tempPlayer.health, maxHealth: tempPlayer.maxHealth, accuracy: 0},
                message: "GAME OVER",
                clickable: false,
                showCards: false,
                bossState: 0,
                alerts: [{}]
            });

        }
        else if(tempPlayer.health > 1){
            tempPlayer.maxHealth -= 1;
            tempPlayer.health = 1;
            // soundHandler.play('shot');
            this.reset(tempPlayer);
        }

        console.log(`new player stats: `, tempPlayer);

        // this.setState({
        //     playerStats: tempPlayer
        // });

        // soundHandler.play('shot');
        // this.reset(tempPlayer);
    }

    handleBoardClear(){
        console.log('Board successfully cleared on boss stage: ', this.state.bossState);

        this.setState({
            showCards: false,
            message: "Loading Next Stage"
        });

        setTimeout(()=>{

            let currentBossState = this.state.bossState;

            this.setState({
                bossState: currentBossState+1
            },()=>{
                this.reset();
                this.setState({
                    showCards: true
                },()=>{
                    console.log('finished reset of state: ', this.state);
                });
            });

        }, 1000);
    }

    handleMatch(cardID, num){
        console.log('game state before matching: ', this.state);
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

                if(tempState.counter < 9){
                    // tempState.message = 'Made a match!';
                }
                else{
                    // tempState.message = 'You won!';
                    this.handleBoardClear();
                }

                tempState.cards[tempState.firstCard.id] = {num: tempState.firstCard.num, flipped: true, fade: true, type: tempState.cards[tempState.firstCard.id].type};
                tempState.cards[tempState.secondCard.id] = {num: tempState.secondCard.num, flipped: true, fade: true, type: tempState.cards[tempState.secondCard.id].type};

                tempState.firstCard = null;
                tempState.secondCard = null;

            }
            else{
                console.log(`Not a match, resetting cards!`);

                soundHandler.play('fail');

                tempState.failedAttempts++;
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

                tempState.timeoutTracker = setTimeout(function(){
                    console.log('timeout executed');
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
                }.bind(this),1500);
            }
        }

        this.setState({
            cards: tempState.cards,
            firstCard: tempState.firstCard,
            secondCard: tempState.secondCard,
            message: tempState.message,
            clickable: tempState.clickable,
            counter: tempState.counter,
            timeoutTracker: tempState.timeoutTracker,
            failedAttempts: tempState.failedAttempts
        });

        // this.setState({...tempState});

        console.log(tempState);
    }

    reset(tempPlayer, callback){

        console.log('reset tempPlayer: ', tempPlayer);
        console.log('reset callback: ', callback);

        if(!this.state.resetFlag){
            console.log('resetting');

            alertTracker.stop();

            clearTimeout(this.state.timeoutTracker);

            const deck = this.shufflecards();

            soundHandler.stop('all');

            if(tempPlayer!== undefined && tempPlayer.hasOwnProperty('health')){
                soundHandler.play('boss');
            }

            soundHandler.play('sneak');

            this.setState({
                cards: deck,
                firstCard: null,
                secondCard: null,
                message: "Now Loading",
                clickable: true,
                counter: 0,
                failedAttempts: 0,
                playerStats: tempPlayer!== undefined && tempPlayer.hasOwnProperty('health') ? tempPlayer : {health: 5, accuracy: 0, maxHealth: 5} ,
                alerts: [{}],
                timeoutTracker: null,
                resetFlag: true
            },()=>{

                setTimeout(()=>{

                    if(callback !== undefined){
                        callback();
                    }

                    this.setState({
                        resetFlag: false
                    });
                }, 1500);
                // console.log("deck after reset set state: ", this.state.cards);
            });

        }
    }

    render(){
        const {message, playerStats, failedAttempts, showCards, bossState} = this.state;

        let cardStyle = null;

        if(showCards){
            cardStyle = {
                transform: ''
            };
        }
        else{
            cardStyle = {
                transform: 'translateZ(-55px)'
            }
        }

        return(
            <div className="mainBoard">
                {/*<Message message={message}/>*/}

                <div className="console">
                    <div className="left_front"></div>
                    <div className="left"></div>
                    <Player stats={playerStats} start={this.handleStartClicked} reset={this.reset} soundToggle={this.handleSoundToggle} cardState={showCards} />
                    <div className="front"></div>
                    <Menu message={message} showCards={showCards} start={this.handleStartClicked} mouseover={this.handlemouseover} />
                    <div draggable="false" className="cardDisplay" style={{...cardStyle}}>
                        {this.dealcards()}
                    </div>
                    <div className="right_front"></div>
                    <div className="right"></div>
                    <Boss attempts={failedAttempts} attack={this.handleBossAttack} bossState={bossState} />
                </div>
                {/*<button onClick={this.reset}>Reset</button>*/}
            </div>
        );
    }
}

export default Main;