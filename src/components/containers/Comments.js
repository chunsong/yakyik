import React, { Component } from 'react';
import { CreateComment, Comment } from '../presentation';
import styles from './styles';
import { APIManager } from '../../utils';
import actions from '../../actions/actions';
import { connect } from 'react-redux';

class Comments extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    submitComment(comment){
        let updatedComment = Object.assign({}, comment);
        let zone = this.props.zones[this.props.index];
        updatedComment['zone'] = zone._id;

        APIManager.post('/api/comment', updatedComment, (err, response) => {
            if(err){
                alert(err);
                return;
            }

            console.log(JSON.stringify(response));
            const comment = response.result;
            this.props.commentCreated(comment);
        });
    }

    componentDidUpdate(){
        let zone = this.props.zones[this.props.index];
        if(zone == null){
            console.log('NO SELECTED ZONE!!');
            return;
        }

        let commentsArray = this.props.commentsMap[zone._id];
        // if comments have been already loaded
        if(commentsArray != null){
            return
        }

        APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
            if(err){
                alert('ERROR' + err.message);
                return;
            }

            let comments = response.results;
            this.props.commentsReceived(comments, zone);
        });
    }

    render() {
        const selectedZone = this.props.zones[this.props.index];
        let zoneName = null;
        let commentList = null;

        if(selectedZone != null){
            zoneName = selectedZone.name;
            let zoneComments = this.props.commentsMap[selectedZone._id];
            if(zoneComments != null){
                commentList = zoneComments.map((comment, i) => {
                    return (
                        <li key={i}><Comment currentComment={comment} /></li>
                    );
                });   
            }
        }
        
        return (
            <div>
                <h2>{zoneName}</h2>
                <div style={styles.comment.commentsBox}>
                    <ul style={styles.comment.commentList}>
                        {commentList}
                    </ul>

                    <CreateComment onCreate={this.submitComment.bind(this)} />
                </div>
            </div>
        );
    }
}

// register props from the global store/state in store.js
const stateToProps = (state) => {
    return {
        commentsMap: state.comment.map,
        //comments: state.comment.list,
        commentsLoaded: state.comment.commentsLoaded,
        index: state.zone.selectedZone,
        zones: state.zone.list
    }
}

const dispatchToProps = (dispatch) => {
    return {
        commentsReceived: (comments, zone) => dispatch(actions.commentsReceived(comments, zone)),
        commentCreated: (comment) => dispatch(actions.commentCreated(comment))
    }

}

export default connect(stateToProps, dispatchToProps)(Comments);