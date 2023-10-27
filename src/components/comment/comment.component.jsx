import { useContext, useState } from "react";
import { DataContext } from "../../contexts/data.context";

import { ChildCommentThread } from "../child-comment-thread/child-comment-thread.component";
import { CommentCreateBar } from "../comment-create-bar/comment-create-bar.component";
import { ScoreButtonGroup } from "../score-button-group/score-button-group.component";
import { ActionButton } from "../action-button/action-button.component";

import "./comment.styles.scss";
import { WindowContext } from "../../contexts/window.context";

const Comment = ({ comment }) => {
    const { windowDimensions } = useContext(WindowContext);
    const { user, userCommentVotes, calculateTimePassed, castVote } = useContext(DataContext);
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

    const upvoteComment = () => {
        castVote({ commentId: id, currentScore: score, type: 'upvote' });
    };

    const downvoteComment = () => {
        castVote({ commentId: id, currentScore: score, type: 'downvote' });
    };

    const getScoreHighlight = () => {
        const commentVote = userCommentVotes.find(commVote => commVote.id === id);
        if (commentVote) {
            return commentVote.type;
        }
        return '';
    }

    const scoreHighlight = getScoreHighlight();

    return (
        <div className="parent-container">
            {
                windowDimensions.width > 719 ?
                    <div className="comment-container">
                        <ScoreButtonGroup score={score} 
                            scoreStatus={scoreHighlight}
                            upvoteHandler={upvoteComment} 
                            downvoteHandler={downvoteComment}/>
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
                                            <ActionButton type="reply" action={toggleReply}/>
                                            :<ActionButton type="cancel" action={toggleReply}/>
                                    }
                                </div>
                            </div>
                            <div className="comment-body">
                                {replyingTo && <span className="replying-to-user">@{replyingTo}</span>}{content}
                            </div>
                        </div>
                    </div>
                    : <div className="comment-container">
                        <div className="data-container">    
                            <div className="comment-header">
                                <div className="header-info">
                                    <img src={avatar} alt={username} />
                                    <span className="username">{username}</span>
                                    <span className="time-ago">{calculateTimePassed(createdAt)}</span>
                                </div>
                            </div>
                            <div className="comment-body">
                                {replyingTo && <span className="replying-to-user">@{replyingTo}</span>}{content}
                            </div>
                        </div>
                        <div className="footer-container">
                            <ScoreButtonGroup score={score} 
                                scoreStatus={scoreHighlight}
                                upvoteHandler={upvoteComment} 
                                downvoteHandler={downvoteComment}/>
                            <div className="footer-buttons">
                                {
                                    !isReplyingTo ?
                                        <ActionButton type="reply" action={toggleReply}/>
                                        :<ActionButton type="cancel" action={toggleReply}/>
                                }
                            </div>
                        </div>
                    </div>
            }
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