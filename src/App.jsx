import { useContext } from 'react';
import { DataContext } from './contexts/data.context';

import { CommentCreateBar } from './components/comment-create-bar/comment-create-bar.component';
import { CommentFeed } from './components/comment-feed/comment-feed.component';
import './App.scss';
import { Modal } from './components/modal/modal.component';

const App = () => {
    const { user, deletingComment } = useContext(DataContext);

    // console.log(user);

    return(
        <div className='app-container'>
            {deletingComment && <Modal/>}
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