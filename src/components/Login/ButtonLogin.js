import React, { memo } from 'react';
import classes from './ButtonLogin.module.css';

const ButtonLogin = memo(props => {
     return (
          <button type={props.type || 'button'} className={`${classes.button} ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
               {props.children}
          </button>
     );
});

export default ButtonLogin;
