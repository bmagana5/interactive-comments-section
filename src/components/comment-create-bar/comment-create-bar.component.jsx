import { useContext, useState } from 'react';
import { WindowContext } from '../../contexts/window.context';

import './comment-create-bar.styles.scss';
import Textarea from '../textarea/textarea.component';

const CommentCreateBar = ({ image, type, target, toggleReply }) => {
    const { windowDimensions } = useContext(WindowContext);
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
            console.log('comment submitted!');
            setNewCommentText('');
            toggleReply();
        } else {
            console.log('empty message');
        }
    }

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

export default CommentCreateBar;