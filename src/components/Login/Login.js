import React, { useContext } from 'react';
import { userContext } from '../../App';
import Header from '../Header/Header';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';


if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }
const Login = () => {

    const [loggedInUser,setLoggedInUser]  = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleLogin = () =>{
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {

    const credential = result.credential;
    const token = credential.accessToken;
    const {email, displayName} = result.user;
 
    const newUser = {name:displayName, email:email};
    setLoggedInUser(newUser);
    history.replace(from);

  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
  console.log(errorCode,errorMessage);

  });
    }
    const handleFaceBookLogin = () => {
        const faceBookProvider = new firebase.auth.FacebookAuthProvider();
        firebase
  .auth()
  .signInWithPopup(faceBookProvider)
  .then((result) => {

    const credential = result.credential;
    const {email, displayName} = result.user;
 
    const newUser = {name:displayName, email:email};
    setLoggedInUser(newUser);
    history.replace(from);
  })
  .catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);

  });
    }

    return (
        <div>
        <Header/>
            <h1 className='text'>Please Login</h1>
            <div  className='login'  onClick={handleGoogleLogin}> <FontAwesomeIcon icon={faGoogle}/> Continue with Google </div>
            <div className='login' onClick={handleFaceBookLogin}> <FontAwesomeIcon icon={faFacebook}/> Continue with FaceBook </div>

        </div>
    );
};

export default Login;