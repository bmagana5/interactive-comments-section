import { useContext, useState } from "react";
import { DataContext } from "../../contexts/data.context";

import { ReactComponent as IconMinus } from "../../assets/images/icon-minus.svg";
import { ReactComponent as IconPlus } from "../../assets/images/icon-plus.svg";
import { ReactComponent as IconReply } from "../../assets/images/icon-reply.svg";

import { ChildCommentThread } from "../child-comment-thread/child-comment-thread.component";
import { CommentCreateBar } from "../comment-create-bar/comment-create-bar.component";

import "./comment.styles.scss";

const Comment = ({ comment }) => {
    const { calculateTimePassed, user } = useContext(DataContext);
    const [isReplyingTo, setIsReplyingTo] = useState(false);

    const { content, createdAt, id, image,
        replies, replyingTo, score, username } = comment;

    const avatar = require(`../../assets${image.webp.slice(1)}`);

    const toggleReply = () => {
        setIsReplyingTo(!isReplyingTo);
    };

    /* 
        TODO: use state and track if plus/minus has been pressed and set to active
            - update score for that particular comment and updated comments context
    */

    return (
        <div className="parent-container">
            <div className="comment-container">
                <div className="score-container">
                    <button className="plus-button"><IconPlus /></button>
                    <span className="score-span">{score}</span>
                    <button className="minus-button"><IconMinus /></button>
                </div>
                <div className="data-container">
                    <div className="comment-header">
                        <div className="header-info">
                            <img src={avatar} alt={username} />
                            <span className="username">{username}</span>
                            <span className="time-ago">{calculateTimePassed(createdAt)}</span>
                        </div>
                        <div className="header-buttons">
                            {
                                !isReplyingTo ?
                                    <button className="reply-button" onClick={toggleReply}><IconReply />Reply</button>
                                    : <button className="cancel-button" onClick={toggleReply}><IconReply />Cancel</button>

                            }
                        </div>
                    </div>
                    <div className="comment-body">
                        {replyingTo && <span className="replying-to-user">@{replyingTo}</span>}{content}
                    </div>
                </div>
            </div>
            {
                isReplyingTo
                && <CommentCreateBar image={user.image}
                    type={'reply'}
                    target={{ commentId: id, username }}
                    toggleReply={() => toggleReply()} />
            }
            {
                replies && <ChildCommentThread comments={replies} />
            }
        </div>
    );
};

export { Comment };