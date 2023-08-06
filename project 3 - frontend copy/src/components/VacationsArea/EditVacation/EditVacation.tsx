import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Vacation from '../../../models/Vacation';
import Modal from '../../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateVacationAsync } from '../../../utils/fetch-vacations';
import { updateVacation } from '../vacationsSlice';
import styles from './EditVacation.module.scss';
import FormErrors from '../../FormErrors/FormErrors';
import { BASE_API_URL } from '../../../config';
import {FcEditImage} from 'react-icons/fc';

interface EditVacationProps {
  onClose: () => void;
  vacation:Vacation;
}

const EditVacation: FC<EditVacationProps> = ({onClose,vacation}) => {
 const {register,handleSubmit, formState, setValue} = useForm<Vacation>();
 const [errorMessage, setErrorMessage] = useState('');
 const {vacations} = useAppSelector((state) => state.vacations);
 const [imagePreview, setImagePreview] = useState<string | null>(`${BASE_API_URL}/vacations/images/${vacation.imageName}`);
 const dispatch = useAppDispatch();

 const changeDateForInputValue = (dateTime:string) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth()+1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
 }

 const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedImage = event.target.files?.[0];
  if (selectedImage) {
    const imageObjectURL = URL.createObjectURL(selectedImage);
    setImagePreview(imageObjectURL); // Set the image preview URL
  }
};

 useEffect(() => {
  if(vacation){
    setValue('vacationId', vacation.vacationId);
    setValue('destination', vacation.destination);
    setValue('description', vacation.description);
    setValue('vacationStart', changeDateForInputValue(vacation.vacationStart));
    setValue('vacationEnd', changeDateForInputValue(vacation.vacationEnd));
    setValue('price', vacation.price);
    setValue('image', vacation.image);
    setValue('imageName', vacation.imageName);
  }
 },[]);

 const submitVacationHandler = (vacation:Vacation) => {
    updateVacationAsync(vacation).then((response) => {
    dispatch(updateVacation(response));
      onClose();
    }).catch((err) => setErrorMessage(err.response.data));
 }

return(
<Modal onClose={onClose}>
  <div className={styles.EditVacation__EditModal}>
    <span onClick={onClose} className={styles.EditVacation__closeModal}>&#10005;</span>

  <form onSubmit={handleSubmit(submitVacationHandler)}>
    <h2>Edit Vacation</h2>
      <input type="hidden" value={vacation?.vacationId} />

    <FormErrors error={formState.errors.destination?.message}>
      <label>Destination:</label><br />
      <input type="text" {...register('destination')} />
    </FormErrors>

    <FormErrors error={formState.errors.description?.message}>
      <label>Description:</label><br />
      <textarea {...register('description')} rows={3}></textarea>
    </FormErrors>

    <FormErrors error={formState.errors?.vacationStart?.message}>
      <label>Vacation Start:</label><br />
      <input type="date"  {...register('vacationStart')} />
    </FormErrors>

    <FormErrors error={formState.errors?.vacationStart?.message}>
      <label>Vacation End:</label><br />
      <input type="date" {...register('vacationEnd')} />
      {errorMessage && <span style={{color: 'red'}}><strong> {errorMessage}</strong></span>}
    </FormErrors>

    <FormErrors error={formState.errors?.price?.message}>
      <label>Price:</label>
      <input type="number" {...register('price')} />
    </FormErrors>
    <FormErrors error={formState.errors?.price?.message}>
      <label className={styles.EditVacation__inputImgLabel}>Vacation Image:<br />
      {imagePreview && <img className={styles.EditVacation__changeImg} src={imagePreview} alt="current_image" />}
      <input style={{display:"none"}} type="file" accept='image/*' {...register('image')} onChange={handleImageChange}/>
      <br /><span>Change Image <FcEditImage size={20}/></span>
      </label>
    </FormErrors>

      <div className={styles.EditVacation__buttons}>
        <button className='btn btn-primary'> Save </button>
        <button onClick={onClose} className='btn btn-outline-secondary'>Close</button>
      </div>

    </form>
  </div>
</Modal>
);
}

export default EditVacation;
