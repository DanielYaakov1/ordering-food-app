import { useDispatch } from 'react-redux';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import { addItem } from '../../store/mealSlice.js';

const MealItem = props => {
     const { name, description, price, id } = props;
     const dispatch = useDispatch();

     const addToCartHandler = amount => {
          dispatch(addItem({ id, name, amount, price }));
     };

     return (
          <li className={classes.meal}>
               <div>
                    <h3>{name}</h3>
                    <div className={classes.description}>{description}</div>
                    <div className={classes.price}>${price}</div>
               </div>
               <div>
                    <MealItemForm onAddToCart={addToCartHandler} id={id} />
               </div>
          </li>
     );
};
export default MealItem;
