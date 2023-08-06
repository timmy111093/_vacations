import React, { FC } from 'react';

import styles from './Footer.module.scss';

interface FooterProps { }

const Footer: FC<FooterProps> = () => {

    return (
        <footer className={styles.Footer}>
            <b>All Rights Reserve &copy;  <em>My Vacations {new Date().getFullYear()}</em></b> 
        </footer>
    )
}





export default Footer
