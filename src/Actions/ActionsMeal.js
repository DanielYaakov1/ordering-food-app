import { useCallback, useState } from 'react';
import useHttp from '../hooks/use-http';
import { useSelector } from 'react-redux';

const useMealsActions = () => {
     const [meals, setMeals] = useState([]);
     const { request, clearError } = useHttp();
     const items = useSelector(state => state.mealReducer.items);

     const getMealsApi = useCallback(() => {
          request(process.env.BASE_URL).then(resData => {
               const loadedMeals = [];
               for (const key in resData) {
                    loadedMeals.push({
                         id: key,
                         name: resData[key].name,
                         description: resData[key].description,
                         price: resData[key].price,
                    });
               }
               setMeals(loadedMeals);
          });
          clearError();
     }, [request, clearError, setMeals]);

     const sendRequestApi = async userData => {
          try {
               const response = await request(process.env.BASE_URL, 'POST', {
                    user: userData,
                    orderedItems: items,
               });
          } catch (error) {
          } finally {
          }
     };

     return { getMealsApi, sendRequestApi, meals };
};

export default useMealsActions;
