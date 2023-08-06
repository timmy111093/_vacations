import React, { FC, useState,useEffect } from 'react';
import styles from './VacationsArea.module.scss';
import {getVacations} from '../../utils/fetch-vacations'; 
import {useAppDispatch,useAppSelector} from '../../hooks';
import { setVacations } from './vacationsSlice';
import Vacations from './Vacations/Vacations';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import Login from '../authArea/Login/Login';
// import Modal from '../Modal/Modal';

interface VacationsAreaProps {}

const VacationsArea: FC<VacationsAreaProps> = () => {

  const dispatch = useAppDispatch();
  const {vacations} = useAppSelector((state) => state.vacations);
  const {user} = useAppSelector((state) => state.authState);
  const [errorMessage,setErrorMessage] = useState("");
  const [loading,setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); 
  const nav = useNavigate();

  useEffect(() => {
    if(!user) nav('/auth/login');
    setLoading(true);
    getVacations(currentPage*10).then((vacations) => {
      setTotalPages(Math.ceil(vacations.length / 10));
      console.log("total:" , totalPages);
      console.log("current:", currentPage);
      dispatch(setVacations(vacations));
    }).catch((err) => {
      console.log(err.message);
      alert("Your connection has expired... please reconnect");
      nav('/auth/login');
    }).finally(() => {
      setLoading(false);
    })
  },[currentPage]);


  const nextBtnHandler = () => {
    if (currentPage > totalPages - 1) return;
    setCurrentPage((prevState) => prevState + 1);
    window.scrollTo({top:0,behavior:"smooth"});
  }

  const prevBtnHandler = () => {
    if(currentPage <= 0) return;
    setCurrentPage((prevState) => prevState - 1);
    window.scrollTo({top:0,behavior:"smooth"});
    console.log("total:" , totalPages);
    console.log("current:", currentPage);
  }

  if(loading){
    return(
      <div className={styles.VacationsArea__loaderContainer}>
      <Loader />
    </div>
    );
  }

  return(
    <div className={styles.VacationsArea}>
      <Vacations vacations={vacations} />
      <div className={styles.VacationsArea__pagination}>
          {currentPage > 0 && <button onClick={prevBtnHandler}> &#60; Previous</button>}
          {currentPage < totalPages && <button onClick={nextBtnHandler}>Next &#62;</button>}
          </div>
    </div>
  );
}

export default VacationsArea;
