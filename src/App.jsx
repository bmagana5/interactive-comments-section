import { useContext } from 'react';
import { DataContext } from './contexts/data.context';

import InputBar from './components/input-bar/input-bar.component';
import './App.scss';
import CommentFeed from './components/comment-feed/comment-feed.component';

const App = () => {
    const { user } = useContext(DataContext);

    // console.log(user);

    return(
        <div className='app-container'>
            <div className='main-container'>
                <CommentFeed />
                {
                    user && <InputBar image={user.image}/>
                }
            </div>
        </div>
    );
};

export default App;