import React, { Component } from  'react';
import { CreateZone, Zone } from '../presentation';
import { APIManager } from '../../utils';
//import store from '../../stores/store';
import actions from '../../actions/actions';
import { connect } from 'react-redux';

class Zones extends Component{

    constructor(){
        super();
        this.state = {
 
        }
    }

    componentDidMount(){
        APIManager.get('/api/zone', null, (err, response) => {
            if(err){
                alert('ERROR' + err.message);
                return;
            }  
            
            // dispatch action to reducer
            const zones = response.results;
            this.props.zonesReceived(zones);
            //store.currentStore().dispatch(actions.zonesReceived(zones));
            // this.setState({
            //   list: response.results
            // });
        });
    }

    addZone(zone){
        
        let updatedZone = Object.assign({}, zone);

        APIManager.post('/api/zone', updatedZone, (err, response) => {
            if(err){
                alert('ERROR' + err.message);
                return;
            }
            
            this.props.zoneCreated(response.result);
        });
    }

    selectZone(index){
        console.log('selectZone: ' + index);
        this.props.selectZone(index);
        // this.setState({
        //   selected: index
        //});
    }

    render(){
        const listItems = this.props.list.map((zone, i) => {
            let selected = (i == this.props.selected);
            return (
                <li key={i}><Zone index={i} select={this.selectZone.bind(this)} isSelected={selected} currentZone={zone} /></li>
            );
        });

        return(
            <div>
                <ol>
                    {listItems}
                </ol>

               <CreateZone onCreate={this.addZone.bind(this)} />
            </div>
        );
    }
}

// take values from global state/store and assign them to props line 62
const stateToProps = (state) => {
    return {
        // state is the store from store.js, 
        // state.zone is line 11 zone from store.js 
        // state.zone.list is initialState.list from zoneReducer.js
        list: state.zone.list,
        selected: state.zone.selectedZone
    }
}

const dispatchToProps = (dispatch) => {
    return {
        zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
        zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
        selectZone: (index) => dispatch(actions.selectZone(index))
    }
}

// connect Zones component to the store
export default connect(stateToProps, dispatchToProps)(Zones);