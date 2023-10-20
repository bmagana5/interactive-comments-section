import { useRef } from "react";

import "./textarea.styles.scss";

const Textarea = ({ type, target, commentText, updateCommentText }) => {
    // use a ref hook to get a reference to the textarea parent's html node
    const textDivRef = useRef(null);

    const commentValue = target && target.username ? `@${target.username} ${commentText}` : commentText;

    /*  the textarea's containing div will have a data-replicated-value attribute
        that will get a copy of the textarea value as well. In CSS, an ::after element 
        on the containing div will be a clone of the textarea to a tee; it will have 
        equal dimensions, padding, font, line height, etc. This ::after element will 
        also be set to invisible, have white-space functionality similar to textarea, 
        and have the value of data-replicated-value as its content. So long as ::after 
        grows with its content, so too will the textarea.
    */
    const handleCommentChange = (event) => {
        /* 
            if a target exists, we want to filter out the '@username ' string and 
            only keep the comment text when saving the comment. 
        */
        if (target && target.username) {
            const substr = event.target.value.substring(`@${target.username} `.length, event.target.value.length);
            updateCommentText(substr);
        } else {
            updateCommentText(event.target.value);
        }
        textDivRef.current.dataset.replicatedValue = event.target.value;
    };

    const focusHandler = (event) => {
        /* sets the cursor to the end of the comment inside textarea */
        const textarea = event.target;
        let length = textarea.value.length;
        textarea.setSelectionRange(length, length);
    };

    return (
        <div className={`textarea-wrapper ${type !== 'comment' ? 'grow' : ''} ${type === 'edit' ? 'type-edit' : ''}`}
            ref={textDivRef}
            data-replicated-value={commentValue}>
            <textarea className="textarea"
                name="comment-input"
                placeholder="Add a comment..."
                /* if a target exists, then we want to include the username of the target with the comment */
                value={commentValue}
                onChange={handleCommentChange}
                onFocus={focusHandler}
                autoFocus />
        </div>
    );
};

export { Textarea };