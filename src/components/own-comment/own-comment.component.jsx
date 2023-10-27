import { useContext, useState } from "react";
import { DataContext } from "../../contexts/data.context";
import { WindowContext } from "../../contexts/window.context";

import { ChildCommentThread } from "../../components/child-comment-thread/child-comment-thread.component";
import { CommentUpdateBar } from "../comment-update-bar/comment-update-bar.component";
import { ScoreButtonGroup } from "../score-button-group/score-button-group.component";
import { ActionButton } from "../action-button/action-button.component";

import "./own-comment.styles.scss";

const OwnComment = ({ comment }) => {
    const { userCommentVotes, calculateTimePassed, showDeleteModal, castVote } = useContext(DataContext);
    const { windowDimensions } = useContext(WindowContext);

    const [isEditing, setIsEditing] = useState(false);
    const { content, createdAt, id, image, 
        replies, replyingTo, score, username } = comment;
    const [commentBody, setCommentBody] = useState(content);

    const avatar = require(`../../assets${image.webp.slice(1)}`);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const deleteCommentHandler = () => {
        showDeleteModal(id);
    };

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
        <div className="owned-parent-container">
            <div className="comment-container">
                {
                    windowDimensions.width > 719 
                    && <ScoreButtonGroup score={score} 
                            scoreStatus={scoreHighlight}
                            upvoteHandler={upvoteComment} 
                            downvoteHandler={downvoteComment}/>
                }
                <div className="data-container">
                    <div className="comment-header">
                        <div className="header-info">
                            <img src={avatar} alt={username} />
                            <span className="username">{username}</span>
                            <span className="you-span">you</span>
                            <span className="time-ago">{calculateTimePassed(createdAt)}</span>
                        </div>
                        {
                            windowDimensions.width > 719 
                            && <div className="header-buttons">
                                <ActionButton type="delete" action={deleteCommentHandler}/>
                                {
                                    isEditing ? 
                                        <ActionButton type="cancel" action={toggleEditing}/>
                                        : <ActionButton type="edit" action={toggleEditing}/>
                                }
                            </div>
                        }
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
                {
                    windowDimensions.width < 720 
                    && <div className="footer-container">
                        <ScoreButtonGroup score={score} 
                            scoreStatus={scoreHighlight}
                            upvoteHandler={upvoteComment} 
                            downvoteHandler={downvoteComment}/>
                        <div className="footer-buttons">
                            <ActionButton type="delete" action={deleteCommentHandler}/>
                            {
                                isEditing ? 
                                    <ActionButton type="cancel" action={toggleEditing}/>
                                    : <ActionButton type="edit" action={toggleEditing}/>
                            }
                        </div>
                    </div>
                }
            </div>
            {
                replies && <ChildCommentThread comments={replies}/>
            }
        </div>
    );
};

export { OwnComment };