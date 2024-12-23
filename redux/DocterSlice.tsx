import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
    
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {   
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    }
  }
});

export const {  setDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;
