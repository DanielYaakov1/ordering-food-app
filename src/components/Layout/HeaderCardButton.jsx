import { useEffect, useState, memo } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCardButton.module.css';
import { useSelector } from 'react-redux';

const HeaderCardButton = memo(props => {
     const items = useSelector(state => state.mealReducer.items);
     const [btnHighlighted, setBtnHighlighted] = useState(false);
     const numberCartItems = items.reduce((currentValue, item) => {
          return currentValue + item.amount;
     }, 0);

     useEffect(() => {
          if (items.length === 0) {
               return;
          }
          setBtnHighlighted(true);
          const timerButton = setTimeout(() => {
               setBtnHighlighted(false);
          }, 300);
          return () => {
               clearTimeout(timerButton);
          };
     }, [items, setBtnHighlighted]);

     return (
          <button className={`${classes.button} ${btnHighlighted ? classes.bump : ''}`} onClick={props.onClick}>
               <span className={classes.icon}>
                    <CartIcon />
               </span>
               <span>Your Cart</span>
               <span className={classes.badge}>{numberCartItems}</span>
          </button>
     );
});

export default HeaderCardButton;
