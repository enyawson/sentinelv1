import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Home from './components/Home';
import PhotoLogic from './components/PhotoLogic';
import GPSLocationLogic from './components/GPSLocationLogic'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen 
        name="PhotoLogic" 
        component ={PhotoLogic}
        options={{
          headerShown: false
        }}/>
        <Stack.Screen 
        name="GPSLocationLogic" 
        component ={GPSLocationLogic}
        options={{
          headerShown: false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0f0f0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });
