import { useContext, useState } from 'react';
import { WindowDimensionsContext } from '../../contexts/window-dimensions.context';

import './input-bar.styles.scss';

const InputBar = ({ image }) => {
    const { windowDimensions } = useContext(WindowDimensionsContext);
    const [newCommentText, setNewCommentText] = useState('');
    const { /*png,*/ webp } = image;

    let img = require(`../../assets${webp.slice(1)}`);

    const commentChangeHandler = (event) => {
        setNewCommentText(event.target.value);
    };

    const sendButtonHandler = () => {
        /* 
            create a new comment using:
                "id" (generate new id)
                "content" (message itself)
                "createdAt" (Date)
                "score" (init 0)
                "replyingTo" (@username if replying)
                "user" (you)
        */
        if (newCommentText.length > 0) {
            console.log('comment submitted!');
            setNewCommentText('');
        } else {
            console.log('empty message');
        }
    }

    return (
        windowDimensions.width > 480 ?
            <footer className='input-bar-container'>
                <img src={img} alt="" />
                <textarea name="comment-input" 
                    cols="30" 
                    rows="4" 
                    placeholder="Add a comment..."
                    value={newCommentText}
                    onChange={commentChangeHandler}/>
                <button onClick={sendButtonHandler}>SEND</button>
            </footer>
            : <footer>
                <textarea name="comment-input" 
                    cols="30" 
                    rows="4" 
                    placeholder="Add a comment..."
                    value={newCommentText}
                    onChange={commentChangeHandler}/>
                <div>
                    <img src={img} alt="" />
                    <button onClick={sendButtonHandler}>SEND</button>
                </div>
            </footer> 
    );
};

export default InputBar;