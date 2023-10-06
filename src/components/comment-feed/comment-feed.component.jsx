import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/data.context";
import Comment from "../comment/comment.component";

import "./comment-feed.styles.scss";

const CommentFeed = () => {
    const { users, comments, replies } = useContext(DataContext);
    const [ mainComments, setMainComments ] = useState([]);

    useEffect(() => {
        let newComments = [];
        comments.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)).forEach(comment => {
            let commentOwner = users.find(u => u.id === comment.user)
            let newObj = {
                ...comment,
                username: commentOwner.username,
                image: commentOwner.image,
            };
            delete newObj.user;

            // if comment is a reply to another comment, then it is a child to a main comment
            // add it to the appropriate comment's list of replies 
            if (newObj.replyingTo) {
                replies.forEach(reply => {
                    if (reply.comment_id === newObj.id) {
                        newComments = newComments.map(comment => {
                            if (comment.id === reply.parent_comment_id) {
                                return { ...comment, 
                                    replies: comment.replies ? [...comment.replies, newObj] : [newObj] 
                                };
                            }
                            return comment;
                        });
                    }
                });
            } else {
                newComments.push(newObj);
            }
        });
        setMainComments(newComments);
    }, [users, comments, replies]);

    return (
        <div className="comment-feed-container">
            {
                mainComments.map((comment) => 
                    <Comment key={comment.id} comment={comment}/>
                )
            }
        </div>
    );
};

export default CommentFeed;