import { useContext, useState } from "react";
import { DataContext } from "../../contexts/data.context";

import { Textarea } from "../textarea/textarea.component";

import "./comment-update-bar.styles.scss";

const CommentUpdateBar = ({ type, target, commentBody, setCommentBody, toggleEditing }) => {
    const [tempComment, setTempComment] = useState(commentBody);
    const { updateComment } = useContext(DataContext);

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