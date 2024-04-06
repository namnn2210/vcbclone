import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  Account: undefined,
  Key: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUserInfo: (state) => {
      return state;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logOutUser: () => {
      return {
        Account: {
          ID: undefined,
          Username: undefined,
          Email: undefined,
          FirstName: undefined,
          LastName: undefined,
          Phone: undefined,
          Address: undefined,
          BirthDay: undefined,
          Gender: undefined,
          Wallet: undefined,
          WalletCYN: undefined,
          Role: undefined,
          Level: undefined,
          IMGUser: undefined,
          title: undefined,
          RegisterLink: undefined,
          SalePhone: undefined
        },
        Key: undefined,
      };
    },
  },
});

export const { getUserInfo, updateUser, logOutUser } = userSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const userReducer = (state: any) => state.user;
export default userSlice.reducer;
