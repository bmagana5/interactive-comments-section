import { useContext, useState } from "react";
import { DataContext } from "../../contexts/data.context";
import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/images/icon-edit.svg";
import { ReactComponent as IconMinus } from "../../assets/images/icon-minus.svg";
import { ReactComponent as IconPlus } from "../../assets/images/icon-plus.svg";
import { ChildCommentThread } from "../../components/child-comment-thread/child-comment-thread.component";

import "./own-comment.styles.scss";
import { CommentUpdateBar } from "../comment-update-bar/comment-update-bar.component";

const OwnComment = ({ comment }) => {
    const { calculateTimePassed, deleteComment } = useContext(DataContext);
    const [isEditing, setIsEditing] = useState(false);
    const { content, createdAt, id, image, 
        replies, replyingTo, score, username } = comment;
    const [commentBody, setCommentBody] = useState(content);

    const avatar = require(`../../assets${image.webp.slice(1)}`);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const deleteCommentHandler = () => {
        // console.log('delete own comment', comment);
        deleteComment(id);
    };


    return (
        <div className="owned-parent-container">
            <div className="comment-container">
                <div className="score-container">
                    <button className="plus-button"><IconPlus/></button>
                    <span className="score-span">{score}</span>
                    <button className="minus-button"><IconMinus/></button>
                </div>
                <div className="data-container">
                    <div className="comment-header">
                        <div className="header-info">
                            <img src={avatar} alt={username} />
                            <span className="username">{username}</span>
                            <span className="you-span">you</span>
                            <span className="time-ago">{calculateTimePassed(createdAt)}</span>
                        </div>
                        <div className="header-buttons">
                            <button className="delete-button" onClick={deleteCommentHandler}><IconDelete/>Delete</button>
                            {
                                isEditing ? 
                                    <button className="cancel-button" onClick={toggleEditing}><IconEdit/>Cancel</button>
                                    :<button className="edit-button" onClick={toggleEditing}><IconEdit/>Edit</button>
                            }
                        </div>
                    </div>
                    {
                        isEditing ?
                            <CommentUpdateBar 
                                type="edit"
                                target={{ username: replyingTo, commentId: id }}
                                commentBody={commentBody}
                                setCommentBody={setCommentBody} 
                                toggleEditing={toggleEditing} />
                            : <div className="comment-body">
                                {replyingTo && <span className="replying-to-user">@{replyingTo}</span>}{commentBody}
                            </div>
                    }
                </div>
            </div>
            {
                replies && <ChildCommentThread comments={replies}/>
            }
        </div>
    );
};

export { OwnComment };