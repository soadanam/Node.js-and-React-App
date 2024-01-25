import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import useAuth from '../../Hooks/useAuth';

const Header = () => {
    // const {signOutAll} = useFirebase();
    const { user, signOutAll } = useAuth();

    return (
        <div className='simple-navbar'>

            <NavLink className='navElement' to='/home'> Home </NavLink>
            {user.email ?
                <NavLink className='navElement' onClick={signOutAll} to='/login'> Logout </NavLink> :
                <NavLink className='navElement' to='/login'>Login</NavLink>
            }

        </div>
    );
};

export default Header;