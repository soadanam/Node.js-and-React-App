import React from 'react';
import useAuth from '../../Hooks/useAuth';

const Home = () => {

    // Tab Name
    document.title = "Home";

    const { user } = useAuth();

    return (
        <div>
            <h1>This is homepage!</h1>

            {user.email ?
                <img src="https://www.shutterstock.com/image-vector/protected-stamp-red-round-grunge-260nw-515971792.jpg" alt="random img" /> :
                <a href="/login"> Please Login to get the full access! </a>
            }


        </div>
    );
};

export default Home;