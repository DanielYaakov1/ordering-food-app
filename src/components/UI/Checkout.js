import { useState } from 'react';
import classes from './Checkout.module.css';

const isEmptyInput = value => value.trim() === '';
const isFiveDigits = value => value.trim().length === 5;

const Checkout = props => {
     const [enteredName, setEnteredName] = useState('');
     const [enteredStreet, setEnteredStreet] = useState('');
     const [enteredCity, setEnteredCity] = useState('');
     const [enteredPostcode, setEnteredPostcode] = useState('');

     const [formInputValid, setFormInputValid] = useState({
          name: true,
          street: true,
          city: true,
          postalCode: true,
     });

     const nameChangeHandler = event => {
          setEnteredName(event.target.value);
     };
     const streetChangeHandler = event => {
          setEnteredStreet(event.target.value);
     };
     const cityChangeHandler = event => {
          setEnteredCity(event.target.value);
     };
     const postcodeChangeHandler = event => {
          setEnteredPostcode(event.target.value);
     };

     const confirmHandler = event => {
          event.preventDefault();

          const enteredNameIsValid = !isEmptyInput(enteredName);
          const enteredStreetIsValid = !isEmptyInput(enteredStreet);
          const enteredCityIsValid = !isEmptyInput(enteredCity);
          const enteredPostcodeIsValid = isFiveDigits(enteredPostcode);

          setFormInputValid({
               name: enteredNameIsValid,
               street: enteredStreetIsValid,
               city: enteredCityIsValid,
               postalCode: enteredPostcodeIsValid,
          });

          const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostcodeIsValid;

          if (!formIsValid) {
               return;
          }
          props.onSubmit({
               name: enteredName,
               street: enteredStreet,
               city: enteredCity,
               postalCode: enteredPostcode,
          });
     };

     const nameControlClasses = `${classes.control} ${formInputValid.name ? '' : classes.invalid}`;
     const streetControlClasses = `${classes.control} ${formInputValid.street ? '' : classes.invalid}`;
     const cityControlClasses = `${classes.control} ${formInputValid.city ? '' : classes.invalid}`;
     const postcodeControlClasses = `${classes.control} ${formInputValid.postalCode ? '' : classes.invalid}`;

     return (
          <form className={classes.form} onSubmit={confirmHandler}>
               <div className={nameControlClasses}>
                    <label htmlFor='name'> Your Name</label>
                    <input type='text' id='name' value={enteredName} onChange={nameChangeHandler} />
                    {!formInputValid.name && <p>Please enter a valid name!</p>}
               </div>
               <div className={streetControlClasses}>
                    <label htmlFor='street'>Street</label>
                    <input type='text' id='street' value={enteredStreet} onChange={streetChangeHandler} />
                    {!formInputValid.street && <p>Please enter a valid street!</p>}
               </div>
               <div className={cityControlClasses}>
                    <label htmlFor='city'>City</label>
                    <input type='text' id='city' value={enteredCity} onChange={cityChangeHandler} />
                    {!formInputValid.city && <p>Please enter a valid city!</p>}
               </div>
               <div className={postcodeControlClasses}>
                    <label htmlFor='postcode'>Post Code</label>
                    <input type='text' id='postcode' value={enteredPostcode} onChange={postcodeChangeHandler} />
                    {!formInputValid.postalCode && <p>Please enter a valid postcode (5 dig)!</p>}
               </div>
               <div className={classes.actions}>
                    <button onClick={props.onClose} type='button'>
                         Cancel
                    </button>
                    <button className={classes.submit}>Confirm</button>
               </div>
          </form>
     );
};

export default Checkout;
