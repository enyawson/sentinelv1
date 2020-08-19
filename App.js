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

import EvidenceSubmission from './components/EvidenceSubmission';
import PhotoPreviewer from './components/PhotoPreviewer';


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
        
        <Stack.Screen 
        name="PhotoPreviewer"
        component={PhotoPreviewer}
        options={{
        headerShown: false
        }}
        />
      </Stack.Navigator>

      <Stack.Screen 
        name="EvidenceSubmission" 
        component ={EvidenceSubmission}
        options={{
          title: 'Evidence Submission',
          headerStyle: {
          backgroundColor: '#1D5179',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
          fontWeight: 'normal',
          marginLeft: 20,
          fontFamily: 'roboto'
          }
          
        }}/>
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
