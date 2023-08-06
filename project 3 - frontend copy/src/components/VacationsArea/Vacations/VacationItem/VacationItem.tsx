import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BASE_API_URL } from '../../../../config';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import Vacation from '../../../../models/Vacation';
import { deleteVacationAsync } from '../../../../utils/fetch-vacations';
import { followAsync, getFollowersByVacationAsync, getFollowingsUser, unFollowAsync } from '../../../../utils/fetch-followers';
import Modal from '../../../Modal/Modal';
import EditVacation from '../../EditVacation/EditVacation';
import { deleteVacation } from '../../vacationsSlice';
import styles from './VacationItem.module.scss';
import {FaTrash} from 'react-icons/fa6';
import {FiEdit3} from 'react-icons/fi';

interface VacationItemProps {
  vacation: Vacation;
}

const VacationItem: FC<VacationItemProps> = ({vacation}) => {
  const {user} = useAppSelector((state) => state.authState);
  const [showEditModal,setShowEditModal] = useState(false);
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const [isFollowing,setIsFollowing] = useState(false);
  const [followersNum,setFollowersNum] = useState<number>(0);
  const {vacationId,destination,description,vacationStart,vacationEnd,price,image,imageName} = vacation;
  const dispatch = useAppDispatch();


  const deleteHandler = async () => {
    try{
      const success = await deleteVacationAsync(vacationId);
        if(success){
          dispatch(deleteVacation(vacationId));
        }
    }catch(err:any){
      console.error(err);
    }
  }

  const deleteModalHandler = () => {
    setShowDeleteModal((prevState) => !prevState);
  }
  const editModalHandler = () => {
    setShowEditModal((prevState) => !prevState);
  }

  async function followVacation(){
    if(user){
      await followAsync(user.userId,vacation.vacationId);
      setFollowersNum(followersNum + 1);
      setIsFollowing(true);
    }
  }
  const unfollowVacation = async () => {
    if(user){
      await unFollowAsync(user?.userId,vacationId);
      setFollowersNum(followersNum - 1);
      setIsFollowing(false);
    }
  }

  const changeDateFormat = (dateTime:string) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}.${month}.${year}`;
   }

  useEffect(() => {
    try{
      const followersCount = async () => {
        if(user){
          const data = await getFollowingsUser(vacationId,user?.userId);
          const followersCount = await getFollowersByVacationAsync(vacationId);
          setFollowersNum(followersCount[0].followers);
          if(data[0].isFollowing){
            setIsFollowing(true);
          }
          return followersNum;
        }
      }
      followersCount();

    }catch(err:any){
      console.log("error get followers: ",err)
    }
  },[])

  return (
    <div className={styles.VacationItem}>
<div className="card">
  <div className={styles.VacationItem__cardTiltle}>
  <h5 className="card-title">{destination}</h5>
  <span>&#128198; {changeDateFormat(vacationStart)} <b>-</b> {changeDateFormat(vacationEnd)}</span>
  </div>

  <div className="card-body">
  <div className={styles.VacationItem__cardBody}>
    <div className={styles.VacationItem__cardBody__img}>
    <img src={`${BASE_API_URL}/vacations/images/${imageName}`} alt={destination}/>
    </div>
    <p className={styles.VacationItem__cardBody__priceLine}>{price}$</p>
    <div className={styles.VacationItem__cardBody__description}><p className="card-text">{description}</p>
    </div>
    {user?.userRole === 'User' && isFollowing && <NavLink to={'#'}  className={styles.VacationItem__cardBody__cardLink__unLike} onClick={() => unfollowVacation()}>&hearts; {followersNum}</NavLink>}
    {user?.userRole === 'User' && !isFollowing && <NavLink onClick={() => {
      followVacation();
      }} to={"#"} className={styles.VacationItem__cardBody__cardLink__like}>&hearts; {followersNum > 0 ? followersNum : ""}</NavLink>}
    <div className={styles.VacationItem__adminBtns}>
    {user?.userRole === 'Admin' && <NavLink onClick={editModalHandler} to={"#"} className={styles.VacationItem__cardBody__cardLink}> Edit <FiEdit3 /></NavLink>}
    {user?.userRole === 'Admin' && <NavLink onClick={() => setShowDeleteModal(true)} to={"#"} className={styles.VacationItem__cardBody__cardLink}>Delete <FaTrash size={14}/></NavLink>}
    </div>
    
    {showEditModal && <EditVacation onClose={editModalHandler} vacation={vacation}/>}
    
    {showDeleteModal && <Modal onClose={deleteModalHandler}>
      <div className={styles.VacationItem__deleteModal}>
        <h4>Are you sure ?</h4>
        <div className={styles.VacationItem__deleteModal__buttons}>
        <button className='btn btn-danger' onClick={deleteHandler}>Yes, Delete</button>
        <button className={styles.VacationItem__deleteModal__cancel} onClick={() => setShowDeleteModal(false)}>Cancel</button>
        </div>

      </div>
      </Modal>}

    </div>
    </div>
    </div>
  </div>
  );
}

export default VacationItem;
