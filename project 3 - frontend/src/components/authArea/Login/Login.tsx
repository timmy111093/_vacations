import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../../../auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Credentials from '../../../models/Credentials';
import { loginAsync } from '../../../utils/fetch-auth';
import FormErrors from '../../FormErrors/FormErrors';
import authValidation from '../authValidation';
import styles from './Login.module.scss';

interface LoginProps {

}

const Login: FC<LoginProps> = () => {

  const {user} = useAppSelector((state) => state.authState);
  const {formState,register,handleSubmit} = useForm<Credentials>();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const loginHandler = async (credentials:Credentials) => {
    try{
      const token = await loginAsync(credentials);
      dispatch(login(token));
      navigate('/');
    }catch(err:any){
      setErrorMessage(err.response.data)
    }
  }

  useEffect(() => {
    if(user){
      dispatch(logout())
    }
  },[])

  return(

    <form className={styles.Login__form} onSubmit={handleSubmit(loginHandler)}>
      <h3>Log in</h3>
    <FormErrors error={formState.errors.email?.message}>
    <label>Email Address:</label>
    <input type="text" {...register('email', authValidation.email)} autoFocus/>
  </FormErrors>
  <FormErrors error={formState.errors.password?.message}>
    <label>Password:</label>
    <input type="password" {...register('password', authValidation.password)}/>
  </FormErrors>
  <button className={styles.Login__button}>Log in</button><br />
  {errorMessage && <span style={{color: 'red'}}><strong> {errorMessage}</strong></span>}
  <br /><NavLink to={"/auth/register"}>Not a member? Register <b>here</b></NavLink>
  </form>
  )
}

export default Login;
