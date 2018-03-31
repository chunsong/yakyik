import constants from '../constants/constants';

export default {

    commentsReceived: (comments, zone) => {
        return {
            type: constants.COMMENTS_RECEIVED,
            comments: comments,
            zone: zone
        }
    },

    commentCreated: (comment) => {
        return {
            type: constants.COMMENTS_CREATED,
            comment: comment
        }
    },

    zonesReceived: (zones) => {
        return {
            // mandatory field required from redux
            type: constants.ZONES_RECEIVED,

            // actual payload received from api
            zones: zones
        }
    },

    zoneCreated: (zone) => {
        return {
            type: constants.ZONE_CREATED,
            zone: zone
        }
    },

    selectZone: (index) => {
        return {
            type: constants.SELECT_ZONE,
            selectedZone: index
        }
    }


}