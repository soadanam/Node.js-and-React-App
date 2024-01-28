import React from 'react';
import './Home.css';
import useAuth from '../../Hooks/useAuth';

const Home = () => {

    // Tab Name
    document.title = "Home";

    const { user } = useAuth();

    return (
        <div className='home-body'>
            <h2 className='homeHeader'>This is homepage!</h2>

            {user.email ?
                <div>
                    <h4 className='protected-text'>Only for logged in user:</h4>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOKCOETDGlCCei9vpbYfpATOaQwsyUsi23tE1yIXKQ60YX68KvmcayGrEY6ZV7G3xYnFk&usqp=CAU" alt="random img" />
                </div>
                :
                <a href="/login" className='toLoginNavigateLink'> Please Login to get the full access! </a>
            }


        </div>
    );
};

export default Home;