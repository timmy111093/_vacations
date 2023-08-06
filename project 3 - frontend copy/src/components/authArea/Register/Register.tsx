import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import User from '../../../models/User';
import FormErrors from '../../FormErrors/FormErrors';
import authValidation from '../authValidation';
import styles from './Register.module.scss';
import * as Auth from '../../../auth/authSlice';
import { registerAsync } from '../../../utils/fetch-auth';
import { NavLink } from 'react-router-dom';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {

  const navigate = useNavigate();
  const {register,handleSubmit, formState} = useForm<User>();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  const registerHandler = async (user:User) => {
    try{
      const token = await registerAsync(user);
      dispatch(Auth.registration(token));
      navigate('/');

    }catch(err:any){
      setErrorMessage(err.response.data);
    }
  }

  return(
    <div className={styles.Register__formDiv}>
                  <h3>Register</h3>
          <form onSubmit={handleSubmit(registerHandler)}>
            <FormErrors error={formState.errors.firstName?.message}>
              <label>First name:</label>
              <input type="text" {...register('firstName', authValidation.firstName)} autoFocus/>
            </FormErrors>
            <FormErrors error={formState.errors.lastName?.message}>
              <label>Last name:</label>
              <input type="text" {...register('lastName', authValidation.lastName)}/>
            </FormErrors>
            <FormErrors error={formState.errors.email?.message}>
              <label>Email Address:</label>
              <input type="text" {...register('email', authValidation.email)}/>
            </FormErrors>
            <FormErrors error={formState.errors.password?.message}>
              <label>Password:</label>
              <input type="password" {...register('password', authValidation.password)}/>
            </FormErrors>
            <button className={styles.Register__button}>Sign in</button><br />
            {errorMessage && <span style={{color: 'red'}}><strong> {errorMessage}</strong></span>}
            <br /><NavLink className={styles.Register__loginLink} to={"/auth/login"}>Already a member? Log in <b>here</b></NavLink>
          </form>
    </div>
  );
}

export default Register;
