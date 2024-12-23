import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const Header = ({title, nav}) => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
       
        {title ? (
            <View>
               <TouchableOpacity onPress={() => navigation.navigate(nav)}>
               <MaterialCommunityIcons name="arrow-left" size={24} color="#5DAE8B" />
               </TouchableOpacity>
             
          <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>
            {title}
          </Text>
          </View>
        ) : null}
      </View>

      {/* Circles */}
      <View style={styles.circleContainer}>
        <View style={[styles.circle, {  left: 300 }]} />
        <View style={[styles.circle, { top : -70, right: 90 }]} />
        
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAF2EA',
    justifyContent: 'flex-end',
    height: 190,
    padding: 15,
    position: 'relative', 
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start', 
    justifyContent: 'center',
    marginTop: 16,
  },
  headerText: {
    fontSize: 50,
    fontWeight: '600',
    marginLeft: 8,
    color: 'black',
  },
  circleContainer: {
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  circle: {
    width: 150, 
    height: 150, 
    borderRadius: 90, 
    backgroundColor: 'rgba(93, 174, 139, 0.2)',
    position: 'absolute', 

  },
});
