import React from 'react';

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import Concern from './Screens/Concern';
import Consult from './Screens/Consult';
import Profile from './Screens/Profile';
import Appointment from './Screens/Appointment';
import Confirm from './Screens/Confirm';
import Booked from './Screens/Booked';
import OnSkip from './Screens/OnSkip';
import MyBooking from './Screens/MyBooking';
import ConcernUpload from './Screens/Concernuplode';
import Complete from './Screens/Complete';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Concern"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Define all routes here */}
        <Stack.Screen name="Concern" component={Concern} />
        <Stack.Screen name="Consult" component={Consult} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Appointment" component={Appointment} />
        <Stack.Screen name="Confirm" component={Confirm} />
        <Stack.Screen name="Booked" component={Booked} />
        <Stack.Screen name="OnSkip" component={OnSkip} />
        <Stack.Screen name="MyBooking" component={MyBooking} />
        <Stack.Screen name="ConcernUpload" component={ConcernUpload} />
        <Stack.Screen name="Complete" component={Complete} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
});
