import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { saveAppointment } from "../redux/AppointmentSlice";

interface ConfirmProps {
  navigation: any;
  route: {
    params: {
      data: {
        image: string;
        name: string;
        video: string;
      };
    };
  };
}

const Confirm: React.FC<ConfirmProps> = ({ navigation, route }) => {
  const currentAppointment = useSelector((state: any) => state.appointments.currentAppointment);
  const dispatch = useDispatch();
  const { data } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.confirmationCard}>
        <Image
          source={{ uri: data.image }}
          style={styles.profileImage}
        />
        <MaterialCommunityIcons name='check-circle' color={'#15ff00'} size={50} style={{ marginTop: -39 }} />
        <Text style={styles.confirmationTitle}>Appointment Confirmed</Text>
        <Text style={styles.confirmationSubtitle}>
          Thank you for choosing our Experts to help guide you
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailsLabel}>Expert</Text>
            <Text style={styles.detailsValue}>{data.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailsLabel}>Appointment Date</Text>
            <Text style={styles.detailsValue}>{currentAppointment.appointment.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailsLabel}>Appointment Time</Text>
            <Text style={styles.detailsValue}>{currentAppointment.appointment.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailsLabel}>Consultation Type</Text>
            <Text style={styles.detailsValue}>{currentAppointment.type}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailsLabel}>Consultation Fee</Text>
            <Text style={styles.detailsValue}>
              {currentAppointment.type === 'Chat' ? 'Free' : '₹' + data.video}
            </Text>
          </View>
        </View>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: -31
      }}>
        {[...Array(8)].map((_, index) => (
          <View key={index} style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            backgroundColor: '#f9f9f9',
            marginBottom: -10
          }}></View>
        ))}
      </View>

      <View style={styles.couponContainer}>
        <TextInput
          style={styles.couponInput}
          placeholder="Apply Coupon Code"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.couponButton}>
          <Text style={styles.couponButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.paymentButton} 
        onPress={() => {
          dispatch(saveAppointment());
          navigation.navigate('Booked', { appointmentId: currentAppointment.id, data });
        }}
      >
        <Text style={styles.paymentButtonText}>Make Payment</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 40 }}></View>
    </ScrollView>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  confirmationCard: {
    backgroundColor: '#e7f5e9',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  confirmationSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    borderRadius: 8,
    paddingVertical: 0,
    marginTop: 20,
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailsLabel: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
    flex: 1.5,
  },
  detailsValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'right',
  },
  couponContainer:{
     flexDirection:'row',
     alignItems:'center',
     marginVertical :20
   },
   couponInput:{
     flex :1,
     borderWidth :1,
     borderColor:'#ddd',
     borderRadius :8,
     padding :12,
     marginRight :10,
     fontSize :14,
     color :'#333',
     backgroundColor :'#fff'
   },
   couponButton:{
     backgroundColor:'#28a745',
     paddingVertical :12,
     paddingHorizontal :20,
     borderRadius :8
   },
   couponButtonText:{
     color:'#fff',
     fontSize :14,
     fontWeight:'600'
   },
   paymentButton:{
     backgroundColor:'rgba(58,100,59,1)',
     paddingVertical :15,
     borderRadius :8,
     alignItems:'center'
   },
   paymentButtonText:{
     color:'#fff',
     fontSize :18,
     fontWeight :'600'
   }
});
