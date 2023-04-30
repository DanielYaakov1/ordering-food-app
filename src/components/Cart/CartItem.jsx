import { memo } from 'react';
import classes from './CartItem.module.css';

const CartItem = memo(props => {
     const { name, amount, price, onRemove, onAdd } = props;

     return (
          <li className={classes.cartItem}>
               <div>
                    <h2>{name}</h2>
                    <div className={classes.summary}>
                         <span className={classes.price}>{price}</span>
                         <span>x{amount}</span>
                    </div>
               </div>
               {/* add here generic button  */}
               <div className={classes.actions}>
                    <button onClick={onRemove}>-</button>
                    <button onClick={onAdd}>+</button>
               </div>
          </li>
     );
});

export default CartItem;
