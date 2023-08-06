import jwtDecode from 'jwt-decode';
import { setAuthHeader } from '../axios/utils';
import { SESSION_STORAGE_KEY } from '../config';
import User from '../models/User';
import {AuthState} from './authSlice';

export const setInitialAuthState = ():AuthState => {

      //take the token from session storage (if exists)
      const token = sessionStorage.getItem(SESSION_STORAGE_KEY);
      let user = null;

      if(token){
         const container: {user:User} = jwtDecode(token);
         user = container.user;
         setAuthHeader(token);
      } 
      return {
            user,
            token
      }
}
export const handleToken = (state: AuthState, token: string) => {

      state.token = token;
      // making token with jwt decoder
      const container:{user:User} = jwtDecode(token);
      state.user = container.user;

      setAuthHeader(token);
      sessionStorage.setItem(SESSION_STORAGE_KEY, token);
}