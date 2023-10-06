import { useContext } from "react";
import { DataContext } from "../../contexts/data.context";

import "./comment.styles.scss";

const Comment = ({ comment }) => {
    const { currentDate } = useContext(DataContext);
    const { content, createdAt, image, 
        replies, score, username } = comment;

    const calculateTimePassed = () => {
        const msecs = Date.parse(currentDate) - Date.parse(createdAt);
        
        const millisPerMinute = 1000 * 60;
        const millisPerHour = millisPerMinute * 60;
        const millisPerDay = millisPerHour * 24;
        const millisPerWeek = millisPerDay * 7;
        const millisPerMonth = millisPerWeek * 4;

        let timeUnit = '';
        let timeAmount = 0;

        if (msecs >= millisPerMonth) {
            timeAmount = getTime(msecs, millisPerMonth);
            timeUnit = timeAmount > 1 ? 'months' : 'month';
        } else if (msecs >= millisPerWeek) {
            timeAmount = getTime(msecs, millisPerWeek);
            timeUnit = timeAmount > 1 ? 'weeks' : 'week';
        } else if (msecs >= millisPerDay) {
            timeAmount = getTime(msecs, millisPerDay);
            timeUnit = timeAmount > 1 ? 'days' : 'day';
        } else if (msecs >= millisPerHour) {
            timeAmount = getTime(msecs, millisPerHour);
            timeUnit = timeAmount > 1 ? 'hours' : 'hour';
        } else {
            timeAmount = getTime(msecs, millisPerMinute);
            timeUnit = timeAmount > 1 ? 'minutes' : 'minute';
        }

        return `${timeAmount} ${timeUnit} ago`;
    };

    const getTime = (msecs, denom) => {
        return Math.floor(msecs / denom);
    }

    return (
        <div className="comment-container">
            <div>
                <button></button>
                <span></span>
                <button></button>
            </div>
            <div>
                <div className="comment-header">
                    <img src="" alt="" />
                    <span className="username">{username}</span>
                    <span className="time-ago">{calculateTimePassed()}</span>
                    <button className="reply-button">Reply</button>
                </div>
                <div className="comment-body">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Comment;