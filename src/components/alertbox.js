import React, { Component } from 'react';

class Alertbox extends Component{
    constructor(props){
        super(props);

        this.state = {
            alertObjects: []
        };

        this.alertGenerator = this.alertGenerator.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({alertObjects: nextProps.alerts});
    }

    alertGenerator(){
        const alertObjects = this.state.alertObjects;
        console.log('objects in alertbox are: ', alertObjects);

        let result = alertObjects.map((alerts, index)=>{
            if(index > 0){
                return (<div key={"alerttext"+index}>{`Alert #${index-1} for position ${alerts.cardID}: ${alerts.remainingTime}`}</div>);
            }
        });

        console.log('map results: ', result);

        return result;
    }

    render(){
        return (
            <div>
                <p>ALERT</p>
                {this.alertGenerator()}
            </div>
        );
    }
}

export default Alertbox;