import { useContext, useState } from "react";
import { Textarea } from "../textarea/textarea.component";

import "./comment-update-bar.styles.scss";
import { DataContext } from "../../contexts/data.context";

const CommentUpdateBar = ({ type, target, commentBody, setCommentBody, toggleEditing }) => {
    const [tempComment, setTempComment] = useState(commentBody);
    const { updateComment } = useContext(DataContext);

    /*
        we need to track current comment and temporary comment.
        temporary comment will be the one that is updated when 
        we type into the textarea. When we hit the 'update' button
        we will pass the temporary comment to the setCommentBody 
        prop function to update the commentBody state prop. 
    */
    const handleSubmit = () => {
        /* send temp comment up to Data Context to update main 
        comments array state */
        updateComment(target, tempComment);
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

export { CommentUpdateBar };