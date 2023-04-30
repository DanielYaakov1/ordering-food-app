import { Fragment, memo } from 'react';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';

const Meals = memo(() => {
     return (
          <Fragment>
               <MealsSummary />
               <AvailableMeals />
          </Fragment>
     );
});

export default Meals;
