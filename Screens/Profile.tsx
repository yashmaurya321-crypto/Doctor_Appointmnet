import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../Componenet/Header';
import { useDispatch } from 'react-redux';
import { setDoctors } from '../redux/DocterSlice';
const Profile = ({ navigation, route }) => {
  const { data } = route.params;
const dispatch = useDispatch();
  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.profileContainer}>
        {/* Doctor's Info */}
        <Image source={{ uri: data.image }} style={styles.profileImage} />
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.speciality}>{data.speciality}</Text>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{data.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{data.yearofexperience} years</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{data.reviews[0].star}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.sectionContent}>{data.Bio}</Text>
        </View>

        {/* Specialization Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specializes in</Text>
          <View style={styles.specializationContainer}>
            {[
              { icon: '💊', label: 'Cardiology' },
              { icon: '🧠', label: 'Neurology' },
              { icon: '👶', label: 'Pediatrics' },
              { icon: '🏋️', label: 'Orthopedics' },
              { icon: '🌿', label: 'Ayurveda' },
            ].map((item, index) => (
              <View key={index} style={styles.specializationBox}>
                <Text style={styles.specializationIcon}>{item.icon}</Text>
                <Text style={styles.specializationLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews and Ratings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews and Ratings</Text>
          {data.reviews.map((review, index) => (
            <View key={index} style = {{
              backgroundColor: '#f5f5f5',
              padding: 10,
              borderRadius: 5,
              marginVertical: 5,
            }}>
              <Text style={styles.ratingText}>
                {`⭐`.repeat(Math.round(review.star))}
                {'\n'}
                {review.comment}
              </Text>
            </View>
          ))}
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.workExperience.map((exp, index) => (
            <View key={index} style = {{marginVertical: 5, lineHeight: 20,
              backgroundColor: '#f5f5f5',}}>
            <Text  style={styles.sectionContent}>
              {exp.hospital} - {exp.years}
              {'\n'}{exp.street}
            </Text>
            
            </View>
          ))}
        </View>

        {/* Academics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academics</Text>
          {data.academicQualification.map((qualification, index) => (
            <View key={index} style = {{backgroundColor: '#f5f5f5', marginVertical: 5, lineHeight: 20}}>
            <Text  style={styles.sectionContent}>
              {qualification.degree} - {qualification.year}{'\n'}{qualification.street}
            </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Book Consultation Button */}
      <TouchableOpacity style={styles.bookButton} onPress={() => {dispatch(setDoctors(data));navigation.navigate('Appointment', {data})}}>
        <Text style={styles.bookButtonText} >Book Consultation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
    marginTop: -90,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  speciality: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  section: {
    width: '100%',
  backgroundColor : 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 14,
    color: '#555',
   
    padding: 10,
    borderRadius: 10
  },
  ratingText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: 'rgba(58, 100, 59, 1)',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  specializationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  specializationBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  specializationIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  specializationLabel: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});
