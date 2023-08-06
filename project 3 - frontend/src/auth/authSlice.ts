import User from '../models/User';
import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import { handleToken, setInitialAuthState } from './utils';

export interface AuthState{
      user: User | null;
      token: string | null;
}

export const authSlice = createSlice({
      name: 'auth',
      initialState: setInitialAuthState,
      reducers:{
            registration: (state,{ payload: token }:PayloadAction<string>) => {
                  // saving the token action
                  handleToken(state,token);
            },
            login: (state, {payload: token}: PayloadAction<string>) => {
                  // saving the token action
                  handleToken(state,token);
            },
            logout: (state) => {
                  //remove token/user from session storage
                  state.token = null;
                  state.user = null;
                  sessionStorage.removeItem('token');
            }
      }
})
//export the action creators
export const {registration,login,logout} = authSlice.actions;

export default authSlice.reducer;

