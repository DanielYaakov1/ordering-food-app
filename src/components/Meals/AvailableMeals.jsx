import { useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem';
import Spinner from '../UI/Spinner';
import useHttp from '../../hooks/use-http';
import { useSelector } from 'react-redux';
import useMealsActions from '../../Actions/ActionsMeal';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
     const { getMealsApi, meals } = useMealsActions();
     const { request, clearError } = useHttp();

     const isLoading = useSelector(state => state.appReducer.isLoading);
     const isErrorMessage = useSelector(state => state.appReducer.isErrorMessage);

     useEffect(() => {
          getMealsApi();
     }, [request, clearError, getMealsApi]);

     if (isLoading) {
          return (
               <section className={classes.mealsLoading}>
                    <Spinner />
               </section>
          );
     }

     if (isErrorMessage) {
          return (
               <section className={classes.mealsHttpError}>
                    <p>{isErrorMessage}</p>
               </section>
          );
     }

     const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

     const context = () => {
          return meals.length >= 0 ? mealsList : <p>Meal no found!</p>;
     };

     return (
          <section className={classes.meals}>
               <Card>
                    <ul>{context()}</ul>
               </Card>
          </section>
     );
};

export default AvailableMeals;
