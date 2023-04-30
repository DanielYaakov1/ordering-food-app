import React, { useState, Fragment } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from '../UI/Checkout';
import useHttp from '../../hooks/use-http';
import useMealsActions from '../../Actions/ActionsMeal';
import classes from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem } from '../../store/mealSlice';

const Cart = props => {
     const { onHide } = props;
     const dispatch = useDispatch();
     const { error } = useHttp();
     const { sendRequestApi } = useMealsActions();
     const items = useSelector(state => state.mealReducer.items);
     const totalAmount = useSelector(state => state.mealReducer.totalAmount);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [didSubmitOrder, setDidSubmitOrder] = useState(false);
     const [isCheckout, setIsCheckout] = useState(false);
     const totalAmountToFixed = totalAmount.toFixed(2);
     const hasCartItems = items.length > 0;

     const decrementCartItemRemoveHandler = id => dispatch(deleteItem(id));
     const incrementCardItemHandler = item => dispatch(addItem({ ...item, amount: 1 }));
     const orderHandler = () => setIsCheckout(true);

     const submitOrderHandler = async userData => {
          setIsSubmitting(true);
          try {
               await sendRequestApi(userData);
               setIsSubmitting(false);
               setDidSubmitOrder(true);
          } catch (error) {
          } finally {
               setIsSubmitting(false);
               setDidSubmitOrder(true);
          }
     };

     return (
          <Modal onHide={onHide}>
               {!isSubmitting && !didSubmitOrder && (
                    <Fragment>
                         <ul className={classes['cart-items']}>
                              {items.map(item => (
                                   <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={decrementCartItemRemoveHandler.bind(null, item.id)} onAdd={incrementCardItemHandler.bind(null, item)} />
                              ))}
                         </ul>
                         <div className={classes.total}>
                              <span>Total Amount:</span>
                              <span>${totalAmountToFixed}</span>
                         </div>
                         {isCheckout && hasCartItems ? (
                              <Checkout onSubmit={submitOrderHandler} onClose={onHide} />
                         ) : (
                              <div className={classes.actions}>
                                   <button className={classes['button--alt']} onClick={onHide}>
                                        Close
                                   </button>
                                   {hasCartItems && (
                                        <button className={classes.button} onClick={orderHandler}>
                                             Order
                                        </button>
                                   )}
                              </div>
                         )}
                    </Fragment>
               )}
               {isSubmitting && <p>Sending order data...</p>}
               {!isSubmitting && didSubmitOrder && (
                    <div>
                         {error ? (
                              <p>{error}</p>
                         ) : (
                              <>
                                   <p>Thank you for your order!</p>
                                   <p>Your order number is: {Math.floor(Math.random() * 100000)}</p>
                                   <p>Your order will be delivered in 30 minutes.</p>
                              </>
                         )}
                         <div className={classes.actions}>
                              <button className={classes.button} onClick={onHide}>
                                   Close
                              </button>
                         </div>
                    </div>
               )}
          </Modal>
     );
};
export default Cart;
