import { useContext, useState } from "react";
import { DataContext } from "../../contexts/data.context";
import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/images/icon-edit.svg";
import { ReactComponent as IconMinus } from "../../assets/images/icon-minus.svg";
import { ReactComponent as IconPlus } from "../../assets/images/icon-plus.svg";
import ChildCommentThread from "../../components/child-comment-thread/child-comment-thread.component";

import "./own-comment.styles.scss";

const OwnComment = ({ comment }) => {
    const { calculateTimePassed } = useContext(DataContext);
    const [isEditing, setIsEditing] = useState(false);
    const { content, createdAt, image, 
        replies, replyingTo, score, username } = comment;
    const [commentBody, setCommentBody] = useState(content);

    const avatar = require(`../../assets${image.webp.slice(1)}`);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const updateComment = (event) => {
        setCommentBody(event.target.value);
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
                            <button className="delete-button"><IconDelete/>Delete</button>
                            {
                                isEditing ? 
                                    <button className="cancel-edit-button" onClick={toggleEditing}><IconEdit/>Cancel</button>
                                    :<button className="edit-button" onClick={toggleEditing}><IconEdit/>Edit</button>
                            }
                        </div>
                    </div>
                    {
                        isEditing ?
                            <textarea className="comment-textarea" value={commentBody} onChange={updateComment}>

                            </textarea>
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

export default OwnComment;