import { useCallback, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { appActions } from '../store/appSlice';
import { useHistory } from 'react-router-dom';

const ActionsAuth = () => {
     const isLogin = useSelector(state => state.appReducer.isLogin);
     const { setErrorMessage, setAuthenticated } = appActions;
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          const storeUserLoggedIn = localStorage.getItem('isLoggedIn');
          if (storeUserLoggedIn === '1') {
               dispatch(setAuthenticated(true));
          }
     }, [dispatch, setAuthenticated]);

     const loginToFirebase = useCallback(
          async (emailEntered, passwordEntered) => {
               let url;
               try {
                    !isLogin ? (url = process.env.FIREBASE_URL_SIGNUP) : (url = process.env.FIREBASE_URL_SIGNIN);
                    const response = await fetch(url, {
                         method: 'POST',
                         body: JSON.stringify({
                              email: emailEntered,
                              password: passwordEntered,
                              returnSecureToken: true,
                         }),
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    });
                    const data = await response.json();
                    if (!response.ok) {
                         dispatch(setErrorMessage(data.error.message || 'Something went wrong'));
                         return data;
                    }
                    return data;
               } catch (error) {
                    dispatch(setErrorMessage(error.message));
               }
          },
          [isLogin, dispatch, setErrorMessage]
     );

     const loginHandler = useCallback(
          async (email, password) => {
               return loginToFirebase(email, password).then(responseData => {
                    if (responseData.error) {
                         history.push('/');
                    } else {
                         history.push('/meals');
                         dispatch(setAuthenticated(true));
                         localStorage.setItem('isLoggedIn', '1');
                    }
               });
          },
          [loginToFirebase, dispatch, history, setAuthenticated]
     );

     const logoutHandler = useCallback(() => {
          localStorage.removeItem('isLoggedIn');
          dispatch(setAuthenticated(false));
          history.replace('/');
     }, [history, dispatch, setAuthenticated]);

     return { loginToFirebase, loginHandler, logoutHandler };
};
export default ActionsAuth;
