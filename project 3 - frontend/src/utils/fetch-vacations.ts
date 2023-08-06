import axios from '../axios';
import { BASE_API_URL } from '../config';
import Vacation from '../models/Vacation';

export const getVacations = async (page:number): Promise<Vacation[]> => {
   //ajax
   const response = await axios.get<Vacation[]>(`/vacations/${page}`);
   const vacations = response.data;
   return vacations;
}

export const addVacationAsync = async (vacation:Vacation):Promise<Vacation> => {

      // AJAX request - send a new vacation to the server / recieving back the vacation
      const formData = new FormData(); // containing strings / files
   
      formData.append('destination', vacation.destination);
      formData.append('description', vacation.description);
      formData.append('vacationStart', vacation.vacationStart);
      formData.append('vacationEnd', vacation.vacationEnd);
      formData.append('price', vacation.price.toString());
      formData.append('image', vacation.image[0]); // image = FileList image[0] = File / Blob
      
      const response = await axios.post('/vacations/',formData);
      const addedVacation = response.data;
      return addedVacation;

   }

export const updateVacationAsync = async (vacation:Vacation):Promise<Vacation> => {

      // AJAX request - send a new vacation to the server / recieving back the updated vacation
         const formData = new FormData(); // containing strings / files
   
      formData.append('destination', vacation.destination);
      formData.append('description', vacation.description);
      formData.append('vacationStart', vacation.vacationStart);
      formData.append('vacationEnd', vacation.vacationEnd);
      formData.append('price', vacation.price.toString());
      formData.append('imageName', vacation.imageName); // image = FileList image[0] = File / Blob
      if(vacation.image && vacation.image[0]){
            formData.append('image', vacation.image[0]);
      }
      const response = await axios.put(`/vacations/update/${vacation.vacationId}`,formData);
      const updatedVacation = response.data;
   
      return new Promise((resolve,reject) => {
           resolve(updatedVacation);
      });
   }

export const deleteVacationAsync = async (id:number):Promise<boolean> => {
      await axios.delete<Vacation>(`/vacations/delete/${id}`);

      return new Promise((resolve,reject) => {
            resolve(true);
            reject(false);
      })
}

export const downloadCsv = async (): Promise<void> => {
      try {
          const response = await axios.get<Blob>(`${BASE_API_URL}/followers/csv`, { responseType: 'blob' });
          const csvBlob = new Blob([response.data], { type: 'text/csv' });
          const url = window.URL.createObjectURL(csvBlob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'vacations.csv');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Failed to download CSV file:', error);
        throw error;
      }
    };



