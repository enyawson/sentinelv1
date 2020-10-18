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
import AudioRecorder from './components/AudioRecorder';
import AudioRecorderPlayer from './components/AudioRecorderPlayer';
import AudioRecorderActivityList from './components/AudioRecordingActivityList';
import SubmitEvidenceForm from './components/SubmitEvidenceForm';


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
        name="GPSLocationLogic" 
        component ={GPSLocationLogic}
        />
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
        <Stack.Screen 
          name="PhotoLogic" 
          component ={PhotoLogic}
          options={{
          headerShown: false
        }}/>
        <Stack.Screen 
          name="AudioRecorder" 
          component ={AudioRecorder}
          options={{
          headerShown: false
        }}/>
         <Stack.Screen 
          name="PhotoPreviewer" 
          component ={PhotoPreviewer}
          options={{
          headerShown: false
        }}/>
        <Stack.Screen 
          name="AudioRecorderPlayer" 
          component ={AudioRecorderPlayer}
          options={{
          headerShown: false
        }}/> 
        <Stack.Screen 
          name="SubmitEvidenceForm" 
          component ={SubmitEvidenceForm}
          options={{
          title: 'Submit Evidence',
          headerShown: true,
          headerStyle: {
          backgroundColor: '#1D5179',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
          fontWeight: 'normal',
          marginLeft: 20,
          fontFamily: 'roboto'
         }}
          }
        />  

        
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
