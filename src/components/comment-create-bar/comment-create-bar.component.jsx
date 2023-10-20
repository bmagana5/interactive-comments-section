import { useContext, useState } from 'react';
import { DataContext } from '../../contexts/data.context';
import { WindowContext } from '../../contexts/window.context';

import { Textarea } from '../textarea/textarea.component';

import './comment-create-bar.styles.scss';

const CommentCreateBar = ({ image, type, target, toggleReply }) => {
    const { windowDimensions } = useContext(WindowContext);
    const { addComment } = useContext(DataContext);
    const [newCommentText, setNewCommentText] = useState('');

    const { /*png,*/ webp } = image;

    let img = require(`../../assets${webp.slice(1)}`);

    const updateCommentText = (value) => {
        setNewCommentText(value);
    };

    const handleSubmit = () => {
        if (newCommentText.length > 0) {
            switch (type) {
                case 'reply':
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