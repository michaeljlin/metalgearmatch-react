function AlertObj(cardID, num, callback){
    this.cardID = cardID;
    this.num = num;
    this.maxTime = 500;
    this.remainingTime = this.maxTime;
    this.drainRate = 100;

    this.alert = setInterval(function(){
        console.log(`Remaining time for alert on cardID ${this.cardID}: ${this.remainingTime}`);

        this.remainingTime -= this.drainRate;
        if(this.remainingTime === 0){
            callback();
        }
    }.bind(this), 1000);

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

    this.add = function(cardID, num, callback){
        this.alerts.push(new AlertObj(cardID, num, callback));
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

        console.log(`Removing alert on ${cardID}`);

        let alertIndex = this.alerts.findIndex((alert)=>{
            return alert.getID() === cardID;
        });

        this.alerts[alertIndex].stop();

        this.alerts.splice(alertIndex, 1);
    };

    // Called when match is made to cancel all alerts
    this.stop = function(){
        for(let count = 0; count < this.alerts.length; count++){
            this.alerts[count].stop();
        }

        this.alerts = [];
    };

    this.length = function(){
        return this.alerts.length;
    }
}

const alertTracker = new AlertHandler();

export default alertTracker;