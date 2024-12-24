import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

interface BookedProps {
  navigation: any;
  route: {
    params: {
      appointmentId: string;
      data: {
        image: string;
        name: string;
        video: string;
      };
    };
  };
}

const Booked: React.FC<BookedProps> = ({ navigation, route }) => {
  const { appointmentId, data } = route.params;
  const doctor = useSelector((state: any) => state.doctors.doctors);
  const appointments = useSelector((state: any) => state.appointments.appointments);
  const currentAppointment = appointments.find((app: { id: string }) => app.id === appointmentId);

  return (
    <View style={styles.container}>
      <View style={styles.successIconContainer}>
        <MaterialCommunityIcons name="check-circle" size={70} color="#28a745" />
      </View>

      <Text style={styles.headerText}>Appointment Successfully Booked</Text>

      <View style={styles.doctorContainer}>
        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.consultationInfo}>
          {currentAppointment.type === 'Chat' ? 'Chat Consultation - Free' : 'Video Consultation - ' + doctor.video}
        </Text>
      </View>

      <Text style={styles.message}>
        86% of users who submitted their reports and shared detailed information with the doctor have successfully improved their health.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={() => navigation.navigate('OnSkip', { appointmentId })}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={() => navigation.navigate('ConcernUpload', { appointmentId })}
        >
          <Text style={styles.uploadButtonText}>Upload Health Records</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Booked;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7f5e9',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#333',
    marginBottom: 5,
  },
  consultationInfo: {
    fontSize: 14,
    color: '#555',
  },
  message: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 50,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  skipButton: {
    width: '90%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#28a745',
    alignItems: 'center',
    marginBottom: 15,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: '600',
  },
  uploadButton:{
     width:'90%',
     paddingVertical :15,
     borderRadius :8,
     backgroundColor :'#28a745',
     alignItems :'center'
   },
   uploadButtonText:{
     fontSize :16,
     color :'#fff',
     fontWeight :'600'
   }
});
