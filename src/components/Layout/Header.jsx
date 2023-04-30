import { Fragment, memo } from 'react';
import mealsImage from '../../assets/bg.jpeg';
import ButtonLogin from '../Login/ButtonLogin';
import HeaderCardButton from './HeaderCardButton';
import ActionsAuth from '../../Actions/ActionsAuth';
import classes from './Header.module.css';

const Header = memo(({ onPressCard }) => {
     const { logoutHandler } = ActionsAuth();

     return (
          <Fragment>
               <header className={classes.header}>
                    <h1>café italia</h1>
                    <HeaderCardButton onClick={onPressCard} />
                    <ButtonLogin onClick={logoutHandler}>logout</ButtonLogin>
               </header>
               <div className={classes.mainImage}>
                    <img src={mealsImage} alt='delicious food!' />
               </div>
          </Fragment>
     );
});

export default Header;
