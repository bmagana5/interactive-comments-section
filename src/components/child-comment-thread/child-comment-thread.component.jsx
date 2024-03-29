import { useContext } from "react";
import { DataContext } from "../../contexts/data.context";

import { Comment } from "../comment/comment.component";
import { OwnComment } from "../own-comment/own-comment.component";

import "./child-comment-thread.styles.scss";

const ChildCommentThread = ({ comments }) => {
    const { user } = useContext(DataContext);

    return (
        <div className="child-comment-thread-container">
            <div className="left-aside-container">
                <div className="vertical-bar"></div>
            </div>
            <div className="child-comments-container">
                {
                    comments.map((comment) => 
                        comment.username === user.username ? 
                            <OwnComment key={comment.id} comment={comment}/>
                            : <Comment key={comment.id} comment={comment}/>
                    )
                }
            </div>
        </div>
    );
};

export { ChildCommentThread };