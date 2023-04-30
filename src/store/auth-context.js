import React, { useState } from 'react';

const AuthContext = React.createContext({
     isLoggedIn: false,
     userId: null,
     token: null,
     onLogout: () => {},
     onLogin: (email, password) => {},
});

export const AuthContextProvider = props => {
     const [isLoggedIn, setIsLoggedIn] = useState();

     const logoutHandler = () => {};
     const loginHandler = (email, password) => {};
     return (
          <AuthContext.Provider
               value={{
                    isLoggedIn: isLoggedIn,
                    onLogout: logoutHandler,
                    onLogin: loginHandler,
               }}>
               {props.children}
          </AuthContext.Provider>
     );
};

export default AuthContext;
