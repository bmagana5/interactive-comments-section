import { useContext, useRef, useState } from 'react';
import { WindowDimensionsContext } from '../../contexts/window-dimensions.context';

import './input-bar.styles.scss';

const InputBar = ({ image, type, target, toggleReply }) => {
    const { windowDimensions } = useContext(WindowDimensionsContext);
    const [newCommentText, setNewCommentText] = useState(type === 'reply' ? `@${target.username} ` : '');
    const textDivRef = useRef(null);    // use a ref hook to get a reference to the textarea parent's html node

    const { /*png,*/ webp } = image;

    let img = require(`../../assets${webp.slice(1)}`);

    /*  the textarea's containing div will have a data-replicated-value attribute
        that will get a copy of the textarea value as well. In CSS, an ::after element 
        on the containing div will be a clone of the textarea to a tee; it will have 
        equal dimensions, padding, font, line height, etc. This ::after element will 
        also be set to invisible, have white-space functionality similar to textarea, 
        and have the value of data-replicated-value as its content. So long as ::after 
        grows with its content, so too will the textarea.
    */
    const handleCommentChange = (event) => {
        textDivRef.current.dataset.replicatedValue = event.target.value;
        setNewCommentText(event.target.value);
    };

    const focusHandler = () => {

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
            <footer className='input-bar-container'>
                <img src={img} alt="" />
                <div className={`textarea-wrapper ${type === 'reply' ? 'grow' : ''}`}
                    ref={textDivRef}
                    data-replicated-value>
                    <textarea className="textarea"
                        name="comment-input"
                        placeholder="Add a comment..."
                        value={newCommentText}
                        onChange={handleCommentChange}
                        onFocus={focusHandler}
                        autoFocus />
                </div>
                <button onClick={handleSubmit}>SEND</button>
            </footer>
            : <footer>
                <div className={`textarea-wrapper ${type === 'reply' ? 'grow' : ''}`}
                    ref={textDivRef}
                    data-replicated-value>
                    <textarea className="textarea"
                        name="comment-input"
                        placeholder="Add a comment..."
                        value={newCommentText}
                        onChange={handleCommentChange}
                        onFocus={focusHandler}
                        autoFocus />
                </div>
                <div>
                    <img src={img} alt="" />
                    <button onClick={handleSubmit}>SEND</button>
                </div>
            </footer>
    );
};

export default InputBar;