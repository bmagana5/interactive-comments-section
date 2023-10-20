import { useContext, useState } from 'react';
import { WindowContext } from '../../contexts/window.context';

import { Textarea } from '../textarea/textarea.component';

import './comment-create-bar.styles.scss';
import { DataContext } from '../../contexts/data.context';

const CommentCreateBar = ({ image, type, target, toggleReply }) => {
    const { windowDimensions } = useContext(WindowContext);
    const { addComment } = useContext(DataContext);
    const [newCommentText, setNewCommentText] = useState('');

    const { /*png,*/ webp } = image;

    let img = require(`../../assets${webp.slice(1)}`);

    const updateCommentText = (value) => {
        setNewCommentText(value);
    };

    /* 
        create a new comment using:
            "id" (generate new id)
            "content" (message itself)
            "createdAt" (Date)
            "score" (init 0)
            "replyingTo" (@username if replying)
            "user" (you)
    */
    const handleSubmit = () => {
        if (newCommentText.length > 0) {
            switch (type) {
                case 'reply':
                    console.log('comment submitted!');
                    // console.log('target: ', target);
                    // console.log('comment id: ', target.commentId);
                    // console.log('username: ', target.username);
                    addComment({
                        content: newCommentText,
                        replyingTo: target.username,
                        targetCommentId: target.commentId,
                        type
                    });
                    toggleReply();
                    break;
                default: // case for 'comment' type
                    addComment({
                        content: newCommentText,
                        type
                    });
            }
            setNewCommentText('');
        } else {
            console.log('empty message');
        }
    };

    return (
        windowDimensions.width > 480 ?
            <div className='comment-create-bar-container'>
                <img src={img} alt="" />
                <Textarea type={type} 
                    target={target ? target : null}
                    commentText={newCommentText} 
                    updateCommentText={updateCommentText} />
                <button onClick={handleSubmit}>SEND</button>
            </div>
            : <div>
                <Textarea type={type}
                    target={target ? target : null}
                    commentText={newCommentText}
                    updateCommentText={updateCommentText}/>
                <div>
                    <img src={img} alt="" />
                    <button onClick={handleSubmit}>SEND</button>
                </div>
            </div>
    );
};

export { CommentCreateBar };