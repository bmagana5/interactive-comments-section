import { useContext } from "react";
import { DataContext } from "../../contexts/data.context";
import Comment from "../comment/comment.component";
import OwnComment from "../own-comment/own-comment.component";

import "./comment-feed.styles.scss";

const CommentFeed = () => {
    const { user, mainComments } = useContext(DataContext);

    const scrollHandler = () => {
        // console.log('scrolling');
    };

    return (
        <div className="comment-feed-container" onScroll={scrollHandler}>
            {
                mainComments.map((comment) => {
                    return comment.username === user.username ?
                        <OwnComment key={comment.id} comment={comment}/>
                        : <Comment key={comment.id} comment={comment}/>

                })
            }
        </div>
    );
};

export default CommentFeed;