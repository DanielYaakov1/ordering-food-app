import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     isLoading: false,
     isErrorMessage: null,
     isLogin: true,
     isAuthenticated: null,
};

const appSlice = createSlice({
     name: 'app',
     initialState: initialState,
     reducers: {
          setLoading(state, action) {
               state.isLoading = action.payload;
          },
          setErrorMessage(state, action) {
               state.isErrorMessage = action.payload;
          },
          setLoginState(state, action) {
               state.isLogin = action.payload;
          },
          setLogin(state) {
               state.isLogin = !state.isLogin;
          },
          setAuthenticated(state, action) {
               state.isAuthenticated = action.payload;
          },
     },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
