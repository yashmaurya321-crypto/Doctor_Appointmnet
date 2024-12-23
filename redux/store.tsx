import { configureStore } from '@reduxjs/toolkit';

import doctorReducer from './DocterSlice'
import appointmentReducer from './AppointmentSlice'

export const store = configureStore({
  reducer: {
    doctors: doctorReducer,
    appointments: appointmentReducer
  }
})