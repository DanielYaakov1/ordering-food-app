import { useState, useCallback } from 'react';
import Header from '../components/Layout/Header';
import Meals from '../components/Meals/Meals';
import Card from '../components/Cart/Cart';

const HomePage = () => {
     const [isCardShown, setIsCardShown] = useState(false);

     const showCardHandler = useCallback(() => setIsCardShown(true), [setIsCardShown]);
     const HideCardHandler = useCallback(() => setIsCardShown(false), [setIsCardShown]);

     return (
          <>
               {isCardShown && <Card onHide={HideCardHandler} />}
               <Header onPressCard={showCardHandler} />
               <Meals />
          </>
     );
};

export default HomePage;
