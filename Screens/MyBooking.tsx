import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import Header from '../Componenet/Header';

interface Concern {
  type: string;
  [key: number]: {
    severity?: string;
    description?: string;
    uploadedFiles?: string[];
  };
}

interface Appointment {
  id: string;
  DoctorImage: string;
  DoctorName: string;
  status?: string;
  concern: Concern;
  appointment: {
    date: string;
    time: string;
  };
}

interface RootState {
  appointments: {
    appointments: Appointment[];
  };
}

interface NavigationProps {
  navigation: {
    navigate: (screen: string, params: any) => void;
  };
}

const MyBooking: React.FC<NavigationProps> = ({ navigation }) => {
  const appointmentsList = useSelector((state: RootState) => state.appointments.appointments);

  const countFilledInfo = (concern: Concern): number => {
    let filledCount = 0;
    if (concern[1]?.severity) filledCount++;
    if (concern[2]?.description) filledCount++;
    if (concern[3]?.uploadedFiles) filledCount++;
    return filledCount;
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="My Booking" />
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.inactiveTabText}>Orders</Text>
        </TouchableOpacity>
      </View>

      {appointmentsList.length > 0 ? (
        appointmentsList.map((appointment) => (
          <View key={appointment.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={{ uri: appointment.DoctorImage }} style={styles.doctorImage} />
              <View>
                <Text style={styles.doctorName}>{appointment.DoctorName}</Text>
                <Text style={styles.speciality}>{appointment.concern.type}</Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={appointment.status === 'completed' ? styles.completedStatus : styles.upcomingStatus}>
                  {appointment.status ? 
                    appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1) : 
                    'Upcomming'
                  }
                </Text>
              </View>
            </View>

            <View style={styles.dateTimeContainer}>
              <MaterialCommunityIcons name="calendar" size={20} color="#555" />
              <Text style={styles.dateTimeText}>{appointment.appointment.date}</Text>
              <MaterialCommunityIcons name="clock" size={20} color="#555" />
              <Text style={styles.dateTimeText}>{appointment.appointment.time}</Text>
            </View>

            <View style={styles.infoContainer}>
              {appointment.status === 'completed' ? (
                <>
                  <Text style={styles.infoTitle}>Check Prescription</Text>
                  <Text style={styles.infoSubtitle}>{appointment.DoctorName} has suggested you some solutions.</Text>
                </>
              ) : (
                <TouchableOpacity onPress={() => navigation.navigate('ConcernUpload', { appointmentId: appointment.id })}>
                  <Text style={styles.infoTitle}>Add Medical Information ({countFilledInfo(appointment.concern)}/3)</Text>
                  <Text style={styles.infoSubtitle}>Concern Severity: {appointment.concern[1]?.severity || 'Not provided'}</Text>
                  <Text style={styles.infoSubtitle}>Description: {appointment.concern[2]?.description || 'Not provided'}</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.buttonContainer}>
              {appointment.status === 'completed' ? (
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Appointment Details</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Join Appointment</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))
      ) : (
        <View style={styles.noAppointmentsContainer}>
          <Text>No appointments found.</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default MyBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#28a745',
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  inactiveTabText: {
    fontSize: 16,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  speciality: {
    fontSize: 14,
    color: '#777',
  },
  statusContainer: {
    marginLeft: 'auto',
  },
  upcomingStatus: {
    backgroundColor: '#ffedd5',
    color: '#ff7a00',
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  completedStatus: {
    backgroundColor: '#d4edda',
    color: '#28a745',
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
    marginRight: 15,
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#28a745',
    alignItems: 'center',
    marginRight: 10,
  },
  detailsButtonText: {
    color: '#28a745',
    fontSize: 14,
    fontWeight: '600',
  },
  joinButton: {
    flex: 1,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  noAppointmentsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '20%',
  },
});