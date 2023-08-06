import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import Vacation from '../../../models/Vacation';
import { getFavoritesAsync } from '../../../utils/fetch-followers';
import AddVacation from '../AddVacation/AddVacation';
import VacationItem from './VacationItem/VacationItem';
import styles from './Vacations.module.scss';
import {FiBarChart2} from 'react-icons/fi';
import {FiPlus} from 'react-icons/fi';
import {MdFilterListAlt} from 'react-icons/md';
import {FaPlane} from 'react-icons/fa6';
import {FaHeart} from 'react-icons/fa6';
import {MdFilterAltOff} from 'react-icons/md';

interface VacationsProps {
  vacations: Vacation[];
}

const Vacations: FC<VacationsProps> = ({vacations}) => {
  const [showAddVacation, setShowAddVacation] = useState(false);
  const [vacationsByFilter, setVacationsByFilter] = useState(vacations);
  const [noVacationsMsg,setNoVacationsMsg] = useState("");
  const {user} = useAppSelector((state) => state.authState);
  const today = new Date();

  const modalHandler = () => {
    setShowAddVacation((prevState) => !prevState);
  };

  const favoritesVacations = async () => {
    if(user){
      const favoritesPerPage:Vacation[] = [];
      const favorites = await getFavoritesAsync(user.userId);
      for(let f of favorites){
        for(let i = 0; i < vacations.length; i++){
          if(f.vacationId === vacations[i].vacationId){
            favoritesPerPage.push(f);
          }
        }
      }
      setVacationsByFilter(favoritesPerPage);
    }
  }

  const upcomingVacations = async () => {
    setNoVacationsMsg("");
      const upcoming = vacations.filter((v) => new Date(v.vacationStart) > today);
      setVacationsByFilter(upcoming);
      if(upcoming.length === 0){
        setNoVacationsMsg("No Upcoming Vacations Right Now...");
      }
  };

  const activeVacations = async () => {
      const active = vacations.filter((vacation) => {
      const startingDate = new Date(vacation.vacationStart);
      const endingDate = new Date(vacation.vacationEnd);
      return today >= startingDate && today <= endingDate;
      })
      if(active.length === 0){
        setNoVacationsMsg("No Active Vacations In This Page...");
      }
      setVacationsByFilter(active);
  }

  const clearFilters = () => {
    setVacationsByFilter(vacations);
    setNoVacationsMsg("");
  }

  const renderVacations = (vacationsToRender:Vacation[]) => {
    return vacationsToRender.map((vacation) => (
      <VacationItem key={vacation.vacationId} vacation={vacation} />
    ));
  };

  useEffect(() => {
    setVacationsByFilter(vacations);
  },[vacations])

  return (
    <div className={styles.Vacations}>
        <div className={styles.Vacations__filtersNav}>
          <strong> Filters <MdFilterListAlt size={22}/></strong>
          {user?.userRole === 'User' && <NavLink to={'#'} className={styles.Vacations__filterBtn} onClick={favoritesVacations}>My Favorites <FaHeart /></NavLink>}
          <NavLink to={'#'} className={styles.Vacations__filterBtn} onClick={upcomingVacations}>Upcoming <FaPlane /></NavLink>
          <NavLink to={'#'} className={styles.Vacations__filterBtn} onClick={activeVacations}>Active Now <FaPlane /></NavLink>
          <NavLink to={'#'} className={styles.Vacations__filterBtn} onClick={clearFilters}>Clear Filters <MdFilterAltOff size={22}/></NavLink>
          {user?.userRole === 'Admin' && <NavLink to={'/vacations/statistics'} className={styles.Vacations__filterBtn}>Display Statistics <FiBarChart2 size={20} color='white'/></NavLink>}
        </div>
          {renderVacations(vacationsByFilter)}
          {user?.userRole === 'Admin' && <NavLink onClick={modalHandler} to="#"> <FiPlus size={25}/>
          Add Vacation</NavLink>}
          {noVacationsMsg && <div className={styles.Vacations__NoResultsMessage}>{noVacationsMsg}
          <NavLink to="#" onClick={clearFilters}>&nbsp; Go Back</NavLink>
          </div> }
          {showAddVacation && <AddVacation onClose={modalHandler} />}
    </div>
  );
};

export default Vacations;