import React, { FC } from 'react';
import styles from './PageNotFound.module.scss';

interface PageNotFoundProps { }

const PageNotFound: FC<PageNotFoundProps> = () => (
    <div className={styles.PageNotFound}>
        <span>404 isnt only for errors...but..</span>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/9WQ5X6MRK2Y" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" >
            </iframe>  
            <span>The page you are looking for, does not exist</span> 
        </div>
);

export default PageNotFound;
