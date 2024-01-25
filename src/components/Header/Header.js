import React from 'react';
import { NavLink } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import useAuth from '../../Hooks/useAuth';

const Header = () => {
    // const {signOutAll} = useFirebase();
    const { user, signOutAll } = useAuth();

    return (
        <div className='simple-navbar'>

            <NavLink to='/home'> Home </NavLink>
            {user.email ?
                <NavLink onClick={signOutAll} to='/login'  > Logout </NavLink> :
                <NavLink to='/login'>Login</NavLink>
            }

        </div>
    );
};

export default Header;