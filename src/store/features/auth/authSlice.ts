import { createSlice } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: any = {
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'authen',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getAuth: (state) => {
      return state;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    }, //// demo check fake login
  },
});

export const { getAuth, setLogin } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userReducer = (state: any) => state.user;

export default authSlice.reducer;
