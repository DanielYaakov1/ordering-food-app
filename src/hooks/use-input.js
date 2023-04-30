import React, { useState } from 'react';
const useInput = validateValue => {
     const [enteredInputValue, setEnteredInputValue] = useState('');
     const [isTouched, setIsTouched] = useState(false);

     const inputIsValid = validateValue(enteredInputValue);
     const hasError = !inputIsValid && isTouched;

     const valueChangedHandler = event => {
          setEnteredInputValue(event.target.value);
     };
     const inputBlurHandler = event => {
          setIsTouched(true);
     };
     const reset = () => {
          setEnteredInputValue('');
          setIsTouched(false);
     };
     return {
          value: enteredInputValue,
          isValid: inputIsValid,
          hasError,
          valueChangedHandler,
          inputBlurHandler,
          reset,
     };
};

export default useInput;
