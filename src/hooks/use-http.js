import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from '../store/appSlice';

const useHttp = () => {
     const dispatch = useDispatch();
     const { setLoading, setErrorMessage } = appActions;

     const request = useCallback(
          async (url, method = 'GET', body = null, headers = {}) => {
               dispatch(setLoading(true));
               try {
                    if (body) {
                         body = JSON.stringify(body);
                         headers['Content-Type'] = 'application/json';
                    }
                    const response = await fetch(url, { method, body, headers });
                    const data = await response.json();
                    if (!response.ok) {
                         dispatch(setErrorMessage(data.error.message));
                         throw new Error(data.error.message || 'Something went wrong');
                    }
                    return data;
               } catch (error) {
                    dispatch(setErrorMessage(error.message));
               } finally {
                    dispatch(setLoading(false));
               }
          },
          [dispatch, setErrorMessage, setLoading]
     );

     const clearError = useCallback(() => {
          dispatch(setErrorMessage(null));
     }, [setErrorMessage, dispatch]);

     return { request, clearError };
};

export default useHttp;
