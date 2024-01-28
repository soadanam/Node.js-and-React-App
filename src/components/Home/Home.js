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
                    <img src="https://www.shutterstock.com/image-vector/protected-stamp-red-round-grunge-260nw-515971792.jpg" alt="random img" />
                </div>
                :
                <a href="/login" className='toLoginNavigateLink'> Please Login to get the full access! </a>
            }


        </div>
    );
};

export default Home;