import React, { useState, useEffect, useReducer, useRef, useCallback } from 'react';
import Card from './CardLogin';
import Button from './ButtonLogin';
import Input from './InputLogin';
import { useSelector, useDispatch } from 'react-redux';
import ActionsAuth from '../../Actions/ActionsAuth';
import { appActions } from '../../store/appSlice';
import classes from './Login.module.css';

const emailReducer = (state, action) => {
     if (action.type === 'USER_INPUT') {
          return { value: action.val, isValid: action.val.includes('@') };
     }
     if (action.type === 'INPUT_BLUR') {
          return { value: state.value, isValid: state.value.includes('@') };
     }
     return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
     if (action.type === 'USER_INPUT') {
          return { value: action.val, isValid: action.val.trim().length > 2 };
     }
     if (action.type === 'INPUT_BLUR') {
          return { value: state.value, isValid: state.value.trim().length > 2 };
     }
     return { value: '', isValid: false };
};

const Login = props => {
     // const [enteredEmail, setEnteredEmail] = useState('');
     // const [emailIsValid, setEmailIsValid] = useState();
     // const [enteredPassword, setEnteredPassword] = useState('');
     // const [passwordIsValid, setPasswordIsValid] = useState();
     const { setLogin, setErrorMessage } = appActions;
     const isLogin = useSelector(state => state.appReducer.isLogin);
     const isErrorMessage = useSelector(state => state.appReducer.isErrorMessage);
     const [formIsValid, setFormIsValid] = useState(false);
     const { loginHandler } = ActionsAuth();
     const dispatch = useDispatch();

     const [emailState, dispatchEmail] = useReducer(emailReducer, {
          value: '',
          isValid: null,
     });
     const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
          value: '',
          isValid: null,
     });

     const emailInputRef = useRef();
     const passwordInputRef = useRef();

     const { isValid: emailIsValid } = emailState;
     const { isValid: passwordIsValid } = passwordState;

     useEffect(() => {
          const identifier = setTimeout(() => {
               setFormIsValid(emailIsValid && passwordIsValid);
          }, 300);

          return () => {
               clearTimeout(identifier);
          };
     }, [emailIsValid, passwordIsValid]);

     const emailChangeHandler = event => {
          dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
     };

     const passwordChangeHandler = event => {
          dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
     };

     const validateEmailHandler = () => {
          dispatchEmail({ type: 'INPUT_BLUR' });
     };

     const validatePasswordHandler = () => {
          dispatchPassword({ type: 'INPUT_BLUR' });
     };

     const submitHandler = useCallback(
          event => {
               event.preventDefault();
               if (formIsValid) {
                    loginHandler(emailState.value, passwordState.value);
               } else if (!emailIsValid) {
                    emailInputRef.current.focus();
               } else {
                    passwordInputRef.current.focus();
               }
          },
          [formIsValid, emailState, passwordState, emailIsValid, loginHandler]
     );

     const switchAuthModeHandler = useCallback(
          event => {
               event.preventDefault();
               dispatch(setLogin());
               dispatch(setErrorMessage(null));
          },
          [dispatch, setLogin, setErrorMessage]
     );

     const loginModalContext = isLogin ? <>Login</> : <>Sign-In</>;

     return (
          <Card className={classes.login}>
               <form onSubmit={submitHandler}>
                    <div className={classes.title}>{loginModalContext}</div>
                    <Input ref={emailInputRef} id='email' label='E-Mail' type='email' isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
                    <Input ref={passwordInputRef} id='password' label='Password' type='password' isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
                    {isErrorMessage && <p className={classes.errorMessage}>{isErrorMessage}</p>}
                    <button className={classes.buttonLogin} onClick={switchAuthModeHandler}>
                         {isLogin ? 'Create new account here' : 'Login with existing account'}
                    </button>
                    <div className={classes.actions}>
                         <Button disabled={!formIsValid} type='submit' className={classes.btn}>
                              {loginModalContext}
                         </Button>
                    </div>
               </form>
          </Card>
     );
};

export default Login;
