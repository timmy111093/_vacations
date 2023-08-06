import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Vacation from '../../models/Vacation';

export interface VacationsState {
    vacations: Vacation[];
    vacation?: Vacation;
}

const vacationsState:VacationsState = {
    vacations: [],
}

export const vacationsSlice = createSlice({
    name: 'vacations',
    initialState: vacationsState,
    reducers: {
        setVacations: (state,action:PayloadAction<Vacation[]>) => {
              // redux toolkit allows us to write mutating logic in the reducers
              state.vacations = action.payload;
        },
        setVacation:(state,action:PayloadAction<Vacation>) => {
              const {payload} = action;
              state.vacation = payload;
        },

        addVacation:(state,{payload:vacation}:PayloadAction<Vacation>) => {
              state.vacations.push(vacation);
        },
        updateVacation:(state,{payload:vacation}:PayloadAction<Vacation>) => {
              const indexToUpdate = state.vacations.findIndex((v) => v.vacationId === vacation.vacationId);
              if(indexToUpdate >= 0){
                    state.vacations[indexToUpdate] = vacation;
              }
              state.vacation = vacation;
        },
        deleteVacation: (state,{payload:vacationId}:PayloadAction<number>) => {
              const indexToDelete = state.vacations.findIndex((v) => v.vacationId === vacationId);
              if(indexToDelete >= 0){
                    state.vacations.splice(indexToDelete,1);
              }
        }
  }
});

// export the action creators
export const { setVacations, setVacation,addVacation,updateVacation,deleteVacation } = vacationsSlice.actions;

export default vacationsSlice.reducer;


