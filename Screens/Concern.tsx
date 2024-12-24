import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../Componenet/Header';
import { useDispatch } from 'react-redux';
import { initializeAppointment, updateConcernType } from '../redux/AppointmentSlice';

type ConcernType = {
  id: string;
  name: string;
  icon: string;
};

const { width } = Dimensions.get('window');

const Concern: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const topConcerns: ConcernType[] = [
    { id: '1', name: 'Hypertension', icon: 'heart-pulse' },
    { id: '2', name: 'Diabetes', icon: 'needle' },
    { id: '3', name: 'Obesity', icon: 'weight' },
    { id: '4', name: 'Anxiety', icon: 'emoticon-sad-outline' },
    { id: '5', name: 'PCOS', icon: 'gender-female' },
  ];

  const seasonalConcerns: ConcernType[] = [
    { id: '1', name: 'Hypertension', icon: 'heart-pulse' },
    { id: '2', name: 'Anxiety', icon: 'emoticon-sad-outline' },
    { id: '3', name: 'Obesity', icon: 'weight' },
  ];

  const lifestyleConcerns: ConcernType[] = [
    { id: '1', name: 'Hypertension', icon: 'heart-pulse' },
    { id: '2', name: 'Diabetes', icon: 'needle' },
    { id: '3', name: 'Obesity', icon: 'weight' },
    { id: '4', name: 'Anxiety', icon: 'emoticon-sad-outline' },
    { id: '5', name: 'PCOS', icon: 'gender-female' },
    { id: '6', name: 'Insomnia', icon: 'bed-empty' },
  ];

  const renderConcernItem = ({ item }: { item: ConcernType }) => (
    <View>
      <TouchableOpacity 
        onPress={() => {
          dispatch(initializeAppointment());
          dispatch(updateConcernType(item.name));
          navigation.navigate('Consult', { active: item.name });
        }} 
        style={styles.concernItem}
      >
        <View style={styles.concernIconWrapper}>
          <MaterialCommunityIcons name={item.icon} size={40} color="#5DAE8B" />
        </View>
      </TouchableOpacity>
      <Text style={styles.concernText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title="Select Concern" />

        <View style={{ padding: 16 }}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for concern here"
            placeholderTextColor="#9E9E9E"
          />

          <Text style={styles.sectionTitle}>Seasonal Based Concern</Text>
          <FlatList
            data={seasonalConcerns}
            renderItem={renderConcernItem}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={styles.concernListHorizontal}
          />

          <Text style={styles.sectionTitle}>Concern for Lifestyle Related Conditions</Text>
          <FlatList
            data={lifestyleConcerns}
            renderItem={renderConcernItem}
            keyExtractor={(item) => item.id}
            numColumns={Math.floor(width / 120)}
            contentContainerStyle={styles.concernListGrid}
          />

          <Text style={[styles.sectionTitle, { marginTop: 26 }]}>Top Concerns</Text>
          <FlatList
            data={topConcerns}
            renderItem={renderConcernItem}
            keyExtractor={(item) => item.id}
            numColumns={Math.floor(width / 120)}
            contentContainerStyle={styles.concernListGrid}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Concern;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    backgroundColor: '#e3e3e3',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: width * 0.04,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    marginBottom: 26,
    marginTop: 5,
    color: 'black',
  },
  concernListHorizontal: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  concernListGrid:{
     paddingHorizontal :8
   },
   concernItem:{
     backgroundColor:'white',
     borderRadius :100, 
     alignItems:'center',
     justifyContent:'center',
     width : width * .2, 
     height : width * .2, 
     marginHorizontal : width * .03,
     marginVertical : width * .03,
     shadowColor:'#000',
     shadowOpacity:.2,
     shadowRadius :5,
     elevation :4
   },
   concernIconWrapper:{
     backgroundColor:'#E6F2E8',
     borderRadius :50,
     width:'70%',
     height:'70%',
     alignItems:'center',
     justifyContent:'center'
   },
   concernText:{
     marginTop :1,
     fontSize :width * .035,
     fontWeight :'500',
     textAlign :'center',
     color:'#2E7D6A'
   }
});
