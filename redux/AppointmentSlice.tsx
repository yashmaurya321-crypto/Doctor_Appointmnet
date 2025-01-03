import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [
    {
        id: 1,
        DoctorName: "Dr. John Doe",
        DoctorImage: "https://images.pexels.com/photos/3768152/pexels-photo-3768152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        concern : {
            type : "General Checkup",
            1 : {
                severity : "High",
                howLongFacing : "3 Months"
            },
            2 : {
                description : "klsadlk saoidjp asd okjsdfpj; asofcj as",
                sleepPattern : "Night Owl",
            },
            3 : {
                uploadedFiles :"yash.png"
            }
        
        },
        type : "chat consultation",
        appointment : {
            date : "12/12/2022",
            time : "10:00 AM"
        },
        status : "completed"
    },
  ],
  currentAppointment: {
    id: null,
    DoctorName: "",
    DoctorImage: "",
    concern: {
      type: "",
      1: {
        severity: "",
        howLongFacing: ""
      },
      2: {
        description: "",
        sleepPattern: ""
      },
      3: {
        uploadedFiles: ""
      }
    },
    type: "",
    appointment: {
      date: "",
      time: ""
    }
  },
  status : "Upcomming",
  loading: false,
  error: null
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    initializeAppointment: (state) => {
      state.currentAppointment = {
        ...initialState.currentAppointment,
        id: Date.now() 
      };
      console.log("Initialized appointment with ID: ", state.currentAppointment.id);
    },
    updateConcernType: (state, action) => {
      state.currentAppointment.concern.type = action.payload;
      console.log("Updated concern type: ", state.currentAppointment.concern.type);
    },

    updateDoctorName: (state, action) => {
      state.currentAppointment.DoctorName = action.payload;
console.log("Updated doctor name: ", state.currentAppointment.DoctorName);
    },

    updateConsultationType: (state, action) => {
      state.currentAppointment.type = action.payload;
      console.log("Updated consultation type: ", state.currentAppointment.type);
    },

    updateAppointmentDateTime: (state, action) => {
      const { date, time } = action.payload;
      state.currentAppointment.appointment = { date, time };
      console.log("Updated appointment date and time: ", state.currentAppointment.appointment);
    },
)
    updateConcernDetails: (state, action) => {
        const { id, step, data } = action.payload;
      
        if (id === undefined) {
          console.error("Invalid ID provided for updating concern details.");
          return;
        }
      
        console.log("Updating concern details: ", { id, step, data });
        
        const index = state.appointments.findIndex(apt => apt.id === id);
        
        if (index !== -1) {
        
          if (state.appointments[index].concern[step]) {
            
            state.appointments[index].concern[step] = {
              ...state.appointments[index].concern[step],
              ...data
            };
            console.log(`Updated concern details for appointment ID: ${id}, Step: ${step}`);
            console.log("Updated Data: ", state.appointments[index].concern[step]);
          } else {
            console.log(`Step ${step} not found in concern for appointment ID: ${id}`);
          }
        } else {
          console.log(`Appointment with ID ${id} not found.`);
        }
      },
      
      

    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.appointments.findIndex(apt => apt.id === id);
      if (index !== -1) {
        state.appointments[index].status = status;
      }
      console.log("Updated appointment status: ", state.appointments[index].status);
    },

    updateDoctorImage: (state, action) => {
        state.currentAppointment.DoctorImage = action.payload;
console.log("Updated doctor image: ", state.currentAppointment.DoctorImage);
    },
    saveAppointment: (state) => {
      state.appointments.push({ ...state.currentAppointment });
      state.currentAppointment = initialState.currentAppointment;
      console.log("Appointment saved: ", state.appointments);
    },

    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(apt => apt.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
      console.log("Updated appointment: ", state.appointments[index]);
    },

    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(apt => apt.id !== action.payload);
      console.log("Deleted appointment: ", action.payload);
    },

    setAppointments: (state, action) => {
      state.appointments = action.payload;
      console.log("Appointments set: ", state.appointments);
    },
    
  }
});

export const {
  initializeAppointment,
  updateConcernType,
  updateDoctorName,
  updateConsultationType,
  updateAppointmentDateTime,
  updateConcernDetails,
  saveAppointment,
  updateAppointment,
  deleteAppointment,
  setAppointments,
  updateAppointmentStatus, 
  updateDoctorImage 
} = appointmentSlice.actions;

export default appointmentSlice.reducer;