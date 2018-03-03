import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import faSoundOn from '@fortawesome/fontawesome-free-solid/faVolumeUp';
import faQuestionCircle from '@fortawesome/fontawesome-free-regular/faQuestionCircle';

import Player from "./player";
import Boss from "./boss";
import Card from './card';
import Menu from './menu';
import AlertText from './alertText';
import Warning from './warning';

import alertTracker from './alerts';
import soundHandler from './soundboard';

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
            bossState: null,
            showInfo: false
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
        this.handleInfoClicked = this.handleInfoClicked.bind(this);
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
        soundHandler.play('sneak');

        if(this.state.bossState === null){
            this.setState({
                showCards: true,
                message: 'Loading Next Stage',
                bossState: 1
            });
        }
        else {
            this.reset({health: 5, accuracy: 0, maxHealth: 5}, ()=>{

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

        return deck;
    };

    dealcards() {
        return this.state.cards.map((cards, index) => {
            return (
                <div key={'cardContainer'+index} className={`container`}>
                    {/*<div className={'alertText'}>Test</div>*/}
                        <AlertText key={'alert'+index} cardID={index} alerts={this.state.alerts} cardState={this.state.showCards} />
                        <Card key={'card'+index} id={index} reset={this.state.resetFlag} handleMatch={this.handleMatch} num={this.state.cards[index].num} flipped={this.state.cards[index].flipped} fade={this.state.cards[index].fade}/>
                </div>);
        });
    }

    handleInfoClicked(){

        soundHandler.play('select');

        let currentInfoState = this.state.showInfo;
        let currentCardState = this.state.showCards;

        this.setState({
            showInfo: !currentInfoState,
            showCards: !currentCardState
        });

    }

    handleDamage(cardID){
        const tempPlayer = {...this.state.playerStats};
        if(tempPlayer.health > 0) {
            tempPlayer.health -= 1;
        }

        if(tempPlayer.health === 0){

            alertTracker.stop();

            clearTimeout(this.state.timeoutTracker);

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

        let newAlertState = this.state.alerts;
        newAlertState.splice(alertIndex, 1);

        delete newAlertState[0][cardID];

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
        soundHandler.play('select');

        soundHandler.soundSwitch();

        if(soundHandler.getSoundState()){
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
    }

    handleAlertTrigger(cardID, num){
        alertTracker.remove(cardID);
        this.handleDamage(cardID);
    }

    handleBossAttack(){

        let tempPlayer = this.state.playerStats;

        soundHandler.play('boss');

        if(tempPlayer.maxHealth === 1){

            tempPlayer.health = 0;

            alertTracker.stop();

            clearTimeout(this.state.timeoutTracker);

            this.setState({
                playerStats: {health: tempPlayer.health, maxHealth: tempPlayer.maxHealth, accuracy: 0},
                message: "GAME OVER",
                clickable: false,
                showCards: false,
                failedAttempts: 0,
                bossState: 0,
                alerts: [{}]
            });

        }
        else if(tempPlayer.maxHealth > 1){
            tempPlayer.maxHealth -= 1;

            if(tempPlayer.health > tempPlayer.maxHealth){
                tempPlayer.health = tempPlayer.maxHealth;
            }
            // soundHandler.play('shot');
            this.reset(tempPlayer);
        }

    }

    handleBoardClear(){

        if(this.state.bossState !== 3){
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
                        // console.log('finished reset of state: ', this.state);
                    });
                });

            }, 1000);
        }
        else{

            clearTimeout(this.state.timeoutTracker);

            this.setState({
                showCards: false,
                message: "Mission Accomplished!"
            }, ()=>{
                // console.log('final message: ', this.state.message);
            });
        }
    }

    handleMatch(cardID, num){
        const tempState = {...this.state};

        if(this.state.clickable === false || this.state.cards[cardID].flipped){
            return;
        }

        if(tempState.firstCard === null){
            tempState.firstCard = {num: num, flipped: true, id: cardID};
            tempState.cards[cardID] = {num: num, flipped: true, fade: false, type: tempState.cards[cardID].type};

            if(tempState.cards[cardID].type === 'enemy' && !alertTracker.searchForSameID(cardID)){
                this.handleNewAlert(cardID, num);
                alertTracker.add(cardID, num, this.handleAlertTrigger, this.handleAlertUpdate);
            }
        }
        else if(tempState.secondCard === null){

            if(tempState.firstCard.id === cardID){
                return;
            }

            tempState.secondCard = {num: num, flipped: true, id: cardID};
            tempState.cards[cardID] = {num: num, flipped: true, fade: false, type: tempState.cards[cardID].type};
        }

        if(tempState.secondCard !== null){

            if(tempState.firstCard.num === tempState.secondCard.num){
                tempState.counter++;

                if(tempState.cards[cardID].type === 'enemy'){
                    alertTracker.stop();
                    soundHandler.play('safe');
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

                    if(this.state.bossState === 3){
                        this.setState({
                            message: ""
                        });
                    }
                    // tempState.message = 'You won!';

                    this.handleBoardClear();
                }

                tempState.cards[tempState.firstCard.id] = {num: tempState.firstCard.num, flipped: true, fade: true, type: tempState.cards[tempState.firstCard.id].type};
                tempState.cards[tempState.secondCard.id] = {num: tempState.secondCard.num, flipped: true, fade: true, type: tempState.cards[tempState.secondCard.id].type};

                tempState.firstCard = null;
                tempState.secondCard = null;

            }
            else{
                soundHandler.play('fail');

                tempState.failedAttempts++;
                tempState.clickable = false;
                // tempState.message = 'Not a match!';

                if(tempState.cards[cardID].type === 'enemy' && !alertTracker.searchForSameID(cardID)){
                    this.handleNewAlert(cardID, num);
                    alertTracker.add(cardID, num, this.handleAlertTrigger, this.handleAlertUpdate);
                }

                tempState.timeoutTracker = setTimeout(function(){
                    tempState.cards[tempState.firstCard.id] = {num: tempState.firstCard.num, flipped: false, fade: false, type: tempState.cards[tempState.firstCard.id].type};
                    tempState.cards[tempState.secondCard.id] = {num: tempState.secondCard.num, flipped: false, fade: false, type: tempState.cards[tempState.secondCard.id].type};

                    tempState.firstCard = null;
                    tempState.secondCard = null;

                    tempState.clickable = true;

                    // tempState.message = "";

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
            clickable: tempState.clickable,
            counter: tempState.counter,
            timeoutTracker: tempState.timeoutTracker,
            failedAttempts: tempState.failedAttempts
        });

    }

    reset(tempPlayer, callback){

        if(!this.state.resetFlag){

            alertTracker.stop();

            clearTimeout(this.state.timeoutTracker);

            const deck = this.shufflecards();

            // soundHandler.stop('all');

            // if(tempPlayer!== undefined && tempPlayer.hasOwnProperty('health')){
            //     soundHandler.play('boss');
            // }

            soundHandler.play('sneak');

            this.setState({
                cards: deck,
                firstCard: null,
                secondCard: null,
                message: "Loading Next Stage",
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
            });

        }
    }

    render(){
        const {message, playerStats, failedAttempts, showCards, bossState, showInfo} = this.state;

        let cardStyle = null;
        let uiStyle = {};
        let width = window.innerWidth;

        if(showCards){
            cardStyle = {
                transform: ''
            };

            uiStyle.transform = 'translateZ(10px)';
        }
        else{
            cardStyle = {
                transform: 'translateZ(-115px)'
            };

            uiStyle.transform = '';
        }

        return(
            <div className="mainBoard">
                <div className="console">
                    <div className="left_front"></div>
                    <div className="left"></div>
                    <Player stats={playerStats} start={this.handleStartClicked} reset={this.reset} soundToggle={this.handleSoundToggle} info={this.handleInfoClicked} cardState={showCards} />
                    <div className="front"></div>
                    <Menu message={message} showCards={showCards} showInfo={showInfo} start={this.handleStartClicked} mouseover={this.handlemouseover} info={this.handleInfoClicked} />
                    <div draggable="false" className="cardDisplay" style={{...cardStyle}}>
                        {this.dealcards()}
                        <div style={uiStyle} className="uiBar">
                            <div onClick={this.handleInfoClicked} className="icon">
                                <FontAwesomeIcon icon={faQuestionCircle} size={width < 800 ? '1x' : '2x'}/>
                            </div>
                            <div onClick={this.handleSoundToggle} className="icon">
                                <FontAwesomeIcon icon={faSoundOn} size={width < 800 ? '1x' : '2x'}/>
                            </div>
                        </div>
                        <Warning bossState={bossState} attempts={failedAttempts} />
                    </div>
                    <div className="right_front"></div>
                    <div className="right"></div>
                    <Boss attempts={failedAttempts} attack={this.handleBossAttack} cardState={showCards} bossState={bossState} />
                </div>
            </div>
        );
    }
}

export default Main;