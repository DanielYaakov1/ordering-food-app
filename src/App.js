import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

import { useSelector } from 'react-redux';

function App() {
     const isAuthenticated = useSelector(state => state.appReducer.isAuthenticated);

     return (
          <>
               <Route exact path='/'>
                    {!isAuthenticated ? <LoginPage /> : <HomePage />}
               </Route>
               <Route path='/meals'>{isAuthenticated ? <HomePage /> : <LoginPage />}</Route>
          </>
     );
}

export default App;
