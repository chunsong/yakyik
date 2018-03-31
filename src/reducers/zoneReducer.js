import constants from '../constants/constants';

var initialState = {
    list: [],
    selectedZone: 0
}

// action is the function received from actions
export default (state = initialState, action) => {

    var updated = Object.assign({}, state);

    switch (action.type){

        case constants.ZONES_RECEIVED:
            console.log('ZONES_RECEIVED: '+JSON.stringify(action.zones));
            updated['list'] = action.zones;
            // this is the equivalent of this.setState(...)
            return updated;

        case constants.ZONE_CREATED:
            console.log('ZONE_CREATED: '+JSON.stringify(action.zone));
            let updatedList = Object.assign([], updated.list);
            updatedList.push(action.zone);
            updated['list'] = updatedList;          
            return updated; 

        case constants.SELECT_ZONE:
            updated['selectedZone'] = action.selectedZone;
            return updated;

        default:
            return state;
    }

}