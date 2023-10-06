import { useEffect, useState } from "react";
import { createContext } from "react";

export const DataContext = createContext({
    user: null,
    users: [],
    comments: [],
    replies: [],
    currentDate: ''
});

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    
    useEffect(() => {
        let tmpUsers = require('../assets/json/users.json');
        let mainUser = tmpUsers.find(u => u.username === 'juliusomo');
        setUsers(tmpUsers);
        setUser(mainUser);
        setComments(require('../assets/json/comments.json'));
        setReplies(require('../assets/json/replies.json'));
        setCurrentDate('Thu Oct 05 2023 21:42:43 GMT-0700 (Pacific Daylight Time)');
    }, []);

    const value = {
        user, users, comments, replies, currentDate
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}