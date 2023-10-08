
import Comment from "../comment/comment.component";
import "./child-comment-thread.styles.scss";

const ChildCommentThread = ({ comments }) => {
    return (
        <div className="child-comment-thread-container">
            <div className="left-aside-container">
                <div className="vertical-bar"></div>
            </div>
            <div className="child-comments-container">
                {
                    comments.map((comment) => 
                        <Comment key={comment.id} comment={comment}/>
                    )
                }
            </div>
        </div>
    );
};

export default ChildCommentThread;