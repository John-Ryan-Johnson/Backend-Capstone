/* eslint-disable import/no-anonymous-default-export */
import firebase from 'firebase';
import axios from 'axios';
import { baseUrl } from '../constants.json';

// interceptors work by changing the outbound request before the xhr is sent
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use(
  function (request) {
    const token = sessionStorage.getItem('token');

    if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
}, (err) => Promise.reject(err));

const registerUser = (user) => {
  //sub out whatever auth method firebase provides that you want to use.
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((cred) => {
      //get email and other user data from firebase
      const userInfo = {
        firebaseUid: firebase.auth().currentUser.uid,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      //get token from firebase
      return cred.user.getIdToken()
        //save the token to the session storage
        .then((token) => sessionStorage.setItem('token', token))

        //save the user to the the api
        .then(() => axios.post(`${baseUrl}/employees`, userInfo));
    });
};

//sub out whatever auth method firebase provides that you want to use.
const loginUser = (user) => firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((cred) => {
    // get token from firebase
    cred.user.getIdToken()
      // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token));
  });

  const logoutUser = () => {
    sessionStorage.removeItem('token');
    return firebase.auth().signOut();
  };

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

export default { getUid, loginUser, registerUser, logoutUser };
