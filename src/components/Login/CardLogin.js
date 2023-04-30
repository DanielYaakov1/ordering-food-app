import React, { memo } from 'react';
import classes from './CardLogin.module.css';

const Card = memo(props => {
     return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
});

export default Card;
