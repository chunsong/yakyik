import constants from '../constants/constants';

var initialState = {
    map: {}
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state);
    let updatedMap = Object.assign({}, updated.map);

    switch (action.type) {

        case constants.COMMENTS_RECEIVED:
            let zoneComments = (updatedMap[action.zone._id]) ? Object.assign([], updatedMap[action.zone._id]) : [];
            action.comments.forEach((comment, i) => {
                zoneComments.push(comment);
            });

            updatedMap[action.zone._id] = zoneComments;
            updated['map'] = updatedMap;

            console.log('COMMENTS_RECEIVED: '+JSON.stringify(updated));
            return updated;

        case constants.SELECT_ZONE:
            return updated;

        case constants.COMMENTS_CREATED:
            console.log('COMMENT_CREATED: ' + JSON.stringify(action.comment));
    
            let commentList = (updatedMap[action.comment.zone]) ? Object.assign([], updatedMap[action.comment.zone]) : [];

            commentList.push(action.comment);

            updatedMap[action.comment.zone] = commentList;
            updated['map'] = updatedMap;
            return updated;

        default:
            return state;

    }

}