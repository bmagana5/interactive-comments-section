import { useContext } from "react";
import { DataContext } from "../../contexts/data.context";
import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/images/icon-edit.svg";
import { ReactComponent as IconMinus } from "../../assets/images/icon-minus.svg";
import { ReactComponent as IconPlus } from "../../assets/images/icon-plus.svg";
import { ReactComponent as IconReply } from "../../assets/images/icon-reply.svg";

import "./comment.styles.scss";

const Comment = ({ comment }) => {
    const { currentDate, user } = useContext(DataContext);
    const { content, createdAt, image, 
        replies, score, username } = comment;

    const avatar = require(`../../assets${image.webp.slice(1)}`);

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
            <div className="score-container">
                <button className="plus-button"><IconPlus/></button>
                <span className="score-span">{score}</span>
                <button className="minus-button"><IconMinus/></button>
            </div>
            <div className="data-container">
                <div className="comment-header">
                    <img src={avatar} alt={username} />
                    <span className="username">{username}</span>
                    {
                        user.username === username && <span className="you-span">you</span>
                    }
                    <span className="time-ago">{calculateTimePassed()}</span>
                    {
                        user.username === username && <button className="delete-button"><IconDelete/>Delete</button>
                    }
                    {
                        user.username === username ?
                            <button className="edit-button"><IconEdit/>Edit</button>
                            : <button className="reply-button"><IconReply/>Reply</button>

                    }
                </div>
                <div className="comment-body">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Comment;