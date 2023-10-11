import { useEffect, useState } from "react";
import { createContext } from "react";

const getTime = (msecs, denom) => {
    return Math.floor(msecs / denom);
};

export const DataContext = createContext({
    user: null,
    mainComments: [],
    currentDate: '',
    calculateTimePassed: () => {},
});

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [mainComments, setMainComments] = useState([]);
    
    const calculateTimePassed = (createdAt) => {
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

    /* on component mount, gets all data from JSON files */
    useEffect(() => {
        let tmpUsers = require('../assets/json/users.json');
        let mainUser = tmpUsers.find(u => u.username === 'juliusomo');
        setUsers(tmpUsers);
        setUser(mainUser);
        setComments(require('../assets/json/comments.json'));
        setReplies(require('../assets/json/replies.json'));
        setCurrentDate('Thu Oct 05 2023 21:42:43 GMT-0700 (Pacific Daylight Time)');
    }, []);

    /* 
        Generates mainComments list state to be used with application.
        When new comments and replies are created, this mainComments list will be
        regenerated to reflect new changes. This will NOT update the JSON files, so 
        all new data that doesn't already exist in those scripts will not be retained 
        after browser is reloaded.
    */
    useEffect(() => {
        // console.time('generate comments list');
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
        // console.timeEnd('generate comments list');
        setMainComments(newComments);
    }, [users, comments, replies]);

    const addComment = () => {
        /* 
            determine if the comment is a reply to another comment or if it 
            is a standalone comment. If it is a reply, create an entry into 
            the replies state with that comment's id and the parent comment's 
            id. To determine what the parent comment is, check if the comment 
            being replied to is a parent in any of the entries already in replies.
            if so, then that comment is the parent, so use its id. If not, check 
            entries where that comment's id is paired to another parent comment.
            Once found, take that other comment's id and use it as the parent id 
            for the new comment. if it's standalone, simply add it to comments 
            state list.
        */
    };

    const deleteComment = () => {
        /* 
            when deleting a comment, check in replies if it's a parent.
            if so, get every child comment and remove from comments state 
            before removing parent.
        */

    };

    const updateReplies = () => {

    }

    const value = {
        user, mainComments, currentDate, 
        calculateTimePassed
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}