import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'; 
import img1 from '../assets/doctor.jpeg'; 

const OnSkip = ({ navigation, route }) => {
  const { appointmentId } = route.params;
  const [appointment, setAppointment] = useState({});
const doctor = useSelector((state) => state.doctors.doctors);
  const {data} = route.params;
  // Fetch appointment data based on appointmentId
  const appointments = useSelector((state) => state.appointments.appointments);
  
  useEffect(() => {
    const foundAppointment = appointments.find(app => app.id === appointmentId);
    if (foundAppointment) {
      setAppointment(foundAppointment);
    }
  }, [appointments, appointmentId]);

  // Function to count uploaded files
  const countFilledInfo = (concern) => {
    let filledCount = 0;
  
    // Ensure concern and necessary keys are present
    if (concern) {
      // Check the nested fields inside concern[1], concern[2], and concern[3]
      if (concern[1]) {
        if (concern[1].severity.trim() !== "" && concern[1].howLongFacing.trim() !== "") filledCount++;
      
      }
      if (concern[2]) {
        if (concern[2].description.trim() !== "" && concern[2].sleepPattern.trim() !== "") filledCount++;
   
      }
      if (concern[3]) {
        if (concern[3].uploadedFiles.trim() !== "") filledCount++;  // Check if uploadedFiles is not an empty string
      }
    }
  
    return filledCount;
  };
  

  const totalFilesCount = 3; 

  const uploadedFilesCount = countFilledInfo(appointment.concern || {});
console.log("uploadedFilesCount", uploadedFilesCount);
  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <View style={styles.successIconContainer}>
        <MaterialCommunityIcons name="check-circle" size={70} color="#28a745" />
      </View>

      {/* Header Text */}
      <Text style={styles.headerText}>Appointment Successfully Booked</Text>

      {/* Doctor Information */}
      <View style={styles.doctorContainer}>
        <Image source={{uri : appointment.DoctorImage}} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{appointment.DoctorName || 'Dr. Prerna'}</Text>
        <Text style={styles.consultationInfo}>
     {appointment.type  === "Chat"? "Chat - Free" : "Video - Paid"  }
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 30 }}>
        <View style={styles.successIconContainer}>
          <MaterialCommunityIcons name="account-heart-outline" size={70} />
        </View>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 5,
          textAlign: 'center',
        }}>
          We understand your concern in skipping these steps.
        </Text>
        <Text style={{
          fontSize: 14,
          color: '#555',
          textAlign: 'center'
        }}>
          If you ever feel ready, you can always provide this information to help the Doctor improve your care.
        </Text>
      </View>

      {/* Displaying upload status */}
     
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={() => navigation.navigate('ConcernUpload', { appointmentId })}
        >
          <Text style={styles.skipButtonText}>Continue Uploading { uploadedFilesCount}/{totalFilesCount }</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={() => navigation.navigate('MyBooking')}
        >
          <Text style={styles.uploadButtonText}>View My Application</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnSkip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7f5e9',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent : 'center'
  },
  successIconContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  doctorContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#333',
    marginBottom :5
  },
  consultationInfo: {
    fontSize: 14,
    color:'#555'
  },
  uploadStatusContainer:{
    marginTop :20,
    alignItems : 'center'
  },
  uploadStatusText:{
    fontSize :16,
    fontWeight : '600',
    color : '#333'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  skipButton: {
    width: '90%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  skipButtonText: {
    fontSize: 16,
    color: 'rgba(58, 100, 60, 1)',
    fontWeight: '600',
  },
  uploadButton: {
    width: '90%',
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(58, 100, 60, 1)',
    alignItems: 'center',
  },
  uploadButtonText:{
    fontSize :16,
    color : '#fff',
    fontWeight :'600'
  },
});
