import { useContext } from 'react';
import { DataContext } from './contexts/data.context';

import { CommentCreateBar } from './components/comment-create-bar/comment-create-bar.component';
import { CommentFeed } from './components/comment-feed/comment-feed.component';
import './App.scss';

const App = () => {
    const { user } = useContext(DataContext);

    // console.log(user);

    return(
        <div className='app-container'>
            <div className='main-container'>
                <CommentFeed />
                {
                    user && <CommentCreateBar image={user.image} type={'comment'}/>
                }
            </div>
        </div>
    );
};

export default App;