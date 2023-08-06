import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import styles from './AuthMenu.module.scss';
import {FiUserCheck} from 'react-icons/fi';
import {FiUser} from 'react-icons/fi';

interface AuthMenuProps {}

const AuthMenu: FC<AuthMenuProps> = () => {

  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.authState);

  const logOutHandler = () => {
    dispatch(logout());
  }

  const renderContent = () => {
    if(user){
      return(
        <span className={styles.AuthMenu__connected}>
        <strong><FiUserCheck color='blue' size={20}/> {user.firstName} {user.lastName}</strong>
        <NavLink className={styles.AuthMenu__navlinks} to='/auth/login' onClick={logOutHandler}>Log-out</NavLink>
        </span>
      )
    }
    return(
      <span className={styles.AuthMenu__disconnected}>
      <strong><FiUser color='grey' size={20}/> Hello Guest</strong>
      <NavLink className={styles.AuthMenu__navlinks} to="/auth/register">Register</NavLink>
      <NavLink className={styles.AuthMenu__navlinks} to="/auth/login"> Log-in</NavLink>
      </span>
    );
  }

  return(
    <span className={styles.AuthMenu}>
      {renderContent()}
    </span>
  );
}

export default AuthMenu;
