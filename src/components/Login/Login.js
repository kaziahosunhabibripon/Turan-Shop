import React, { useContext, useState } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleGoogleSignIn, handleSignOut, initializeLoginFramework, handleFbSignIn, handleGithubSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';

function Login() {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({

        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }
    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }
    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }
    const githubSignIn = () => {
        handleGithubSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }
    const handleSubmit = (event) => {

        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })

        }
        event.preventDefault();
    }
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res); 
        if(redirect){
            history.replace(from);
        }
    }
    const handleBlur = (event) => {

        let isFieldValid = true;

        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passWordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = (isPasswordValid && passWordHasNumber);
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>

            {
                user.isSignedIn ? <button onClick={signOut} > Sign out </button> :
                    <button onClick={googleSignIn} > Sign in</button>
            }
            <br />
            <button onClick={fbSignIn}> Sign in Using Facebook </button>

            <br />
            <button onClick={githubSignIn}> Sign in Using Github </button>
            <br />

            {
                user.isSignedIn &&
                <div>
                    <p> Welcome, {user.name} </p>
                    <p> Your Email :  {user.email} </p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1>Our own authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id='' />
            <label htmlFor="newUser"> New User Sign Up</label>
            <form action="">
                {newUser && <input type="text" onBlur={handleBlur} name="name" required placeholder="your name" />}
                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="Enter your email address" required /> <br />
                <input type="password" onBlur={handleBlur} id='' name="password" placeholder="Enter your password" required /> <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} onClick={handleSubmit} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}> User {newUser ? 'Created' : 'Logged In'} Successfully {user.error}</p>
            }
            <p>{user.name}</p>
        </div>
    );
}

export default Login;
