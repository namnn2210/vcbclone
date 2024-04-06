import _userReducer from './user/userSlice';
import _authSlice from './auth/authSlice';

export * from './user/userSlice';
export * from './auth/authSlice';

export const userReducer = _userReducer;
export const autheReducer = _authSlice;

