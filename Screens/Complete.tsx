import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

interface Doctor {
  image: string;
  name: string;
  speciality: string;
}

interface CompleteProps {
  navigation: any;
}

const Complete: React.FC<CompleteProps> = ({ navigation }) => {
  const doctor: Doctor = useSelector((state: any) => state.doctors.doctors);

  return (
    <View style={styles.container}>
      {/* Banner Section */}
      <View>
        <Image source={require('../assets/rb_68125.png')} style={styles.bannerImage} />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Thank You Message */}
        <View style={styles.confettiContainer}>
          <Text style={styles.confettiText}>Thank you for updating your health information</Text>
          <Text style={styles.subText}>We wish you a speedy recovery.</Text>
        </View>

        {/* Doctor Information Section */}
        <View style={styles.doctorInfoContainer}>
          <Image
            source={{ uri: doctor.image }}
            style={styles.doctorImage}
          />
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialization}>{doctor.speciality}</Text>
        </View>

        {/* Button Section */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('MyBooking')}
        >
          <Text style={styles.buttonText}>View My Appointments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF5',
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 20,
  },
  confettiContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  confettiText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 10,
    textAlign: 'center',
  },
  doctorInfoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  specialization: {
    fontSize: 16,
    color: '#777777',
  },
  button: {
    backgroundColor: '#006400',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 80,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
