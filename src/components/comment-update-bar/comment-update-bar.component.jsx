import { useState } from "react";
import Textarea from "../textarea/textarea.component";

import "./comment-update-bar.styles.scss";

const CommentUpdateBar = ({ type, target, commentBody, setCommentBody, toggleEditing }) => {
    const [tempComment, setTempComment] = useState(commentBody);

    /*
        we need to track current comment and temporary comment.
        temporary comment will be the one that is updated when 
        we type into the textarea. When we hit the 'update' button
        we will pass the temporary comment to the setCommentBody 
        prop function to update the commentBody state prop. 
    */
    const handleSubmit = () => {
        setCommentBody(tempComment);
        toggleEditing();
    };

    return (
        <div className="comment-update-bar">
            <Textarea 
                type={type} 
                target={target} 
                commentText={tempComment} 
                updateCommentText={setTempComment}/>
            <div className="comment-update-button-container">
                <button onClick={handleSubmit}>UPDATE</button>
            </div>
        </div>
    );
};

export default CommentUpdateBar;