import soundHandler from "./soundboard";

function AlertObj(cardID, num, callback, stateUpdater){
    this.cardID = cardID;
    this.num = num;
    this.maxTime = 1500;
    this.remainingTime = this.maxTime;
    this.drainRate = 10;

    this.alert = setInterval(function(){
        console.log(`Remaining time for alert on cardID ${this.cardID}: ${this.remainingTime}`);
        stateUpdater(this.remainingTime, this.cardID);
        this.remainingTime -= this.drainRate;
        if(this.remainingTime < 0){
            callback(this.cardID, this.num);
        }
    }.bind(this), 100);

    this.getID = function(){
        return this.cardID;
    }.bind(this);

    this.getNum = function(){
        return this.num;
    }.bind(this);

    this.stop = function(){
        clearInterval(this.alert);
    }.bind(this);
}

function AlertHandler(){

    this.alerts = [];

    this.soundHandler = function(soundHandler){
        this.soundHandler = soundHandler;
    };

    this.add = function(cardID, num, callback, stateUpdater){
        this.alerts.push(new AlertObj(cardID, num, callback, stateUpdater));
    };

    this.searchForSameID = function(cardID){
        let foundIndex = this.alerts.findIndex((alert)=>{
            return (alert.getID() === cardID);
        });

        if(foundIndex<0){
            return false;
        }
        else{
            return true;
        }
    };

    this.searchForSameNum = function(num){
        let foundIndex = this.alerts.findIndex((alert)=>{
            return (alert.getNum() === num);
        });

        if(foundIndex<0){
            return false;
        }
        else{
            return true;
        }
    };

    // Called when time runs out to remove individual alert object
    this.remove = function(cardID){
        // let alertToDelete = this.alerts.find((cardID)=>{
        //     return this.alerts.getID() === cardID;
        // });

        // console.log(`Removing alert on ${cardID}`);

        let alertIndex = this.alerts.findIndex((alert)=>{
            return alert.getID() === cardID;
        });

        this.alerts[alertIndex].stop();

        this.alerts.splice(alertIndex, 1);

        soundHandler.play('shot');

        if(this.alerts.length === 0){
            soundHandler.stop('alert');
            soundHandler.play('sneak');
        }
    };

    // Called when match is made to cancel all alerts
    this.stop = function(){
        for(let count = 0; count < this.alerts.length; count++){
            this.alerts[count].stop();
        }
        // soundHandler.play('safe');
        soundHandler.play('sneak');
        soundHandler.stop('alert');
        this.alerts = [];
    };

    this.length = function(){
        return this.alerts.length;
    }
}

const alertTracker = new AlertHandler();

export default alertTracker;