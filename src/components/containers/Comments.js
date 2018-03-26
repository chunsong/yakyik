import React, { Component } from 'react';
import { CreateComment, Comment } from '../presentation';
import styles from './styles';
import { APIManager } from '../../utils';

class Comments extends Component {

    constructor() {
        super();
        this.state = {
            //comment: {
                //username: '',
                //body: ''
            //},
            list: []
        }
    }

    componentDidMount(){
        APIManager.get('/api/comment', null, (err, response) => {
            if(err){
                alert('ERROR' + err.message);
                return;
            }
            this.setState({
                list: response.results
            });
        });
    }

    submitComment(comment){
        console.log('submitComment: '+JSON.stringify(comment));
        
        let updatedComment = Object.assign({}, comment);

        APIManager.post('/api/comment', updatedComment, (err, response) => {
            if(err){
                alert(err);
                return;
            }
            console.log(response);
            let updatedList = Object.assign([], this.state.list);
            updatedList.push(response.result);
            // reload the component state
            this.setState({
              list: updatedList
            });
        });
        
    }

    render() {
        const commentList = this.state.list.map((comment, i) => {
            return (
                <li key={i}><Comment currentComment={comment} /></li>
            );
        });
        return (
            <div>
                <h2>comments: Zone 1</h2>
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

export default Comments;