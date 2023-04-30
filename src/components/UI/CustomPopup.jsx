import classes from './CustomPopup.module.css';
const CustomPopup = props => {
     return (
          <div>
               {props.error ? (
                    <p>{props.error}</p>
               ) : (
                    <>
                         <p>{props.description}</p>
                         <p>Thank you for your order!</p>
                         <p>Your order number is: {Math.floor(Math.random() * 100000)}</p>
                         <p>Your order will be delivered in 30 minutes.</p>
                    </>
               )}
               <div className={classes.actions}>
                    <button className={classes.button} onClick={props.onHide}>
                         Close
                    </button>
               </div>
          </div>
     );
};

export default CustomPopup;
