import React, { FC } from 'react';
import styles from './Header.module.scss';
import AuthMenu from '../authArea/AuthMenu/AuthMenu';
import {GiAirplaneDeparture} from 'react-icons/gi';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    return (
        <div className={styles.Header__header}>
            <GiAirplaneDeparture size={45} color='rgb(0, 99, 255)'/><h4>My Vacation</h4> &nbsp; <span><em>Everywhere You Wish...</em></span>
            <AuthMenu />
        </div>
    )
}





export default Header
