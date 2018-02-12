import React, { Component } from 'react';
import Alertbox from './alertbox';

class Boss extends Component{
    constructor(props) {
        super(props);

        this.state = {
            alerts: []
        }
    }

    // componentWillReceiveProps(nextProps){
    //     // console.log(`boss received new props: `, nextProps);
    //     // console.log('boss alerts state: ', this.state.alerts);
    //
    //     if(nextProps.alerts.length !== this.state.alerts.length){
    //         this.setState({...nextProps});
    //     }
    // }

    render(){
        // console.log('boss alerts state: ', this.state.alerts);
        const alerts = this.state.alerts;

        return(
            <div className="boss">
                <p>Boss Profile</p>
                {/*<Alertbox alerts={alerts} />*/}
            </div>
        );
    }
}

export default Boss;