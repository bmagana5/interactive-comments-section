import { useContext, useState } from "react";
import { DataContext } from "../../contexts/data.context";
import { ReactComponent as IconMinus } from "../../assets/images/icon-minus.svg";
import { ReactComponent as IconPlus } from "../../assets/images/icon-plus.svg";
import { ReactComponent as IconReply } from "../../assets/images/icon-reply.svg";

import ChildCommentThread from "../child-comment-thread/child-comment-thread.component";
import InputBar from "../input-bar/input-bar.component";

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

    // console.log(replies);

    /* 
        TODO: use state and track if plus/minus has been pressed and set to active
            - update score for that particular comment and updated comments context
        TODO: use state to track if comment is being replied to.
            - enable appropriate component with its own textarea and submit button
            - write handler for submit that creates new comment object, adds it to 
            target comment's list of replies, and update comments context, as well 
            as replies context.
        TODO: use state that checks if comment is being edited.
            - update Comment component container to have an editable textarea along 
            with an update button. Update the appropriate comment object, update the 
            comments context.
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
                && <InputBar image={user.image}
                    type={'reply'}
                    target={{ id, username }}
                    toggleReply={() => toggleReply()} />
            }
            {
                replies && <ChildCommentThread comments={replies} />
            }
        </div>
    );
};

export default Comment;