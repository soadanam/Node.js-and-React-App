import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from './../../Hooks/useAuth';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from 'react-hook-form';
import axios from 'axios';



const Login = () => {
    const { googleSignIn } = useAuth();
    const [errorMessage, setErrorMessage] = useState();

    const navigate = useNavigate();
    const location = useLocation();    //To read if the login-page is redirected from any specific page or not.
    const redirect_uri = location?.state?.from?.pathname || '/home';

    ////(firebase auth) sign-in with Google
    const handleGoogleSignInAndRedirect = () => {
        googleSignIn()
            .then(() => {
                navigate(redirect_uri);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    };


    //react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

        const email = data.email;
        const password = data.password;
        const userName = data.name;
        const user = { email, password, userName }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                updateProfile(auth.currentUser, {
                    displayName: userName,
                })
                navigate(redirect_uri);
                // window.location.reload();
            })
            .catch((error) => {
                const errorMessage = error.message;
            });

        //// POST Requests by AXIOS 
        axios({
            method: 'post',
            url: 'http://localhost:4000/userUpload',
            data: user,
        });
    };


    // Tab Unique Name
    document.title = "Login";


    return (
        <div>
            <h4>Login with Google / email & password</h4>

            <button onClick={handleGoogleSignInAndRedirect} >GOOGLE</button>
            <h4>Or</h4>

            {/* react hook form  */}
            <h4>Email & password</h4>
            {/* onSubmit={handleSubmit(onSubmit)} */}
            <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
                <input {...register("name", { required: true })} placeholder='Enter Your Name' className='registration-input' />
                {errors.name && <span className="register-required">*Name is required!</span>}
                <input {...register("email", { required: true })} placeholder='Enter Your Email' className='registration-input' />
                {errors.email && <span className="register-required">*Email is required!</span>}

                <input {...register("password", { required: true })} placeholder='Your Password' className='registration-input' />
                {errors.password && <span className="register-required">*Password is required!</span>}
                <button className="btn btn-primary registration-submit">Submit</button>
            </form>

        </div>
    );
};

export default Login;