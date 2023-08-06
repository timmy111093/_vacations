import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Vacation from '../../../models/Vacation';
import { addVacationAsync } from '../../../utils/fetch-vacations';
import FormErrors from '../../FormErrors/FormErrors';
import validation from './validation';
import Modal from '../../Modal/Modal';
import { addVacation, setVacations } from '../vacationsSlice';
import styles from './AddVacation.module.scss';
import { BASE_API_URL } from '../../../config';
import Loader from '../../Loader/Loader';

interface AddVacationProps {
  onClose: () => void;
}

const AddVacation: FC<AddVacationProps> = ({onClose}) => {
  const {vacations} = useAppSelector((state) => state.vacations);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const {register,handleSubmit, formState} = useForm<Vacation>();
  const [vacationImage, setVacationImage] = useState({
    imageName: ''
  });
  const dispatch = useAppDispatch();

  const handleImgAdding = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setImagePreview(imageURL); 
    }
  };

  // const addingVacationHandler = async (vacation:Vacation) => {
  //     try{
  //       const addedVacation = await addVacationAsync(vacation);
  //       setVacationImage((prevVacation) => ({
  //         ...prevVacation,
  //         imageName: addedVacation.imageName
  //       }));
  //       dispatch(addVacation(addedVacation));
  //       onClose();
  //     }catch(err:any){
  //       setErrorMessage(err.response.data);
  //     }
  // }

  const addingVacationHandler = async (vacation:Vacation) => {
    try{
      const addedVacation = await addVacationAsync(vacation);
      setVacationImage((prevVacation) => ({
        ...prevVacation,
        imageName: addedVacation.imageName
      }));
      const newVacations = [...vacations, addedVacation].sort((a, b) => {
        const dateA = new Date(a.vacationStart);
        const dateB = new Date(b.vacationStart);
        return dateA.getTime() - dateB.getTime();
      });
      dispatch(setVacations(newVacations));
      onClose();
    }catch(err:any){
      setErrorMessage(err.response.data);
    }
}


  return(
  <Modal onClose={onClose}>
  <div className={styles.AddVacation__AddModal}>
  <span onClick={onClose} className={styles.AddVacation__closeModal}>&#10005;</span>
  
  <form onSubmit={handleSubmit(addingVacationHandler)}>
  <h2>Add Vacation</h2>
  <FormErrors error={formState.errors.destination?.message}>
    <label>Destination:</label> <br />
    <input type="text" {...register('destination',validation.destination)} autoFocus  placeholder='Enter Destination...'/>
  </FormErrors>

  <FormErrors error={formState.errors.description?.message}>
    <label>Description:</label> <br />
    <textarea {...register('description', validation.description)} rows={3}  placeholder='Enter Vacation Description...'></textarea>
  </FormErrors>

  <FormErrors error={formState.errors.vacationStart?.message}>
    <label>Vacation Start:</label> <br />
    <input type="date" {...register('vacationStart')} />
  </FormErrors>

  <FormErrors error={formState.errors.vacationEnd?.message}>
    <label>Vacation End:</label> <br />
    <input type="date" {...register('vacationEnd')} />
  </FormErrors>

  <FormErrors error={formState.errors.price?.message}>
    <label>Price:</label> <br />
    <input type="number" {...register('price',validation.price)} placeholder='Enter Price...'/>
  </FormErrors>

  <FormErrors error={formState.errors.image?.message}>
    <label>Vacation Image:</label> <br />
    <input type="file" accept='image/*' {...register('image',validation.image)}  onChange={handleImgAdding}/>
    {imagePreview && <img src={imagePreview} alt="vacation_image"/>}
  </FormErrors>
  {errorMessage && <span style={{color: 'red'}}><strong> {errorMessage}</strong></span>} <br /><br />
  <div className={styles.AddVacation__buttons}>
  <button className='btn btn-primary'>Add</button>
  <button onClick={onClose} className='btn btn-outline-secondary'>Cancel</button>
  </div>
  </form>
  </div>
  </Modal>
  );
}

export default AddVacation;
