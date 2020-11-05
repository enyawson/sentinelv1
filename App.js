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
import SignUp from './components/SignUp';
import VerificationCodeForm from './components/VerificationCodeForm';
import MainActivityList from './components/MainActivityList';
import { MenuProvider } from 'react-native-popup-menu';
import ActivityList from './components/ActivityList';
import ActivityPreview from './components/ActivityPreview';
import VoteTally from './components/VoteTally';
import EnterResult from './components/EnterResult';
import VideoPreview from './components/VideoPreview';
import PinSheet from './components/PinSheet';
import PresidentialComponent from './components/PresidentialComponent';
import ParliamentaryComponent from './components/ParliamentaryComponent';
import ResultPreview from './components/ResultPreview';


const Stack = createStackNavigator();

export default function App() {
  return (
  <MenuProvider>
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

        <Stack.Screen 
          name="SignUp" 
          component ={SignUp}
          options={{
          headerShown: false
        }}/> 

        <Stack.Screen 
          name="VerificationCodeForm" 
          component ={VerificationCodeForm}
          options={{
          headerShown: false
        }}/> 

        <Stack.Screen 
          name="MainActivityList" 
          component ={MainActivityList}
          options={{
          headerShown: true,
          title: '       Activities',
          headerTitleStyle: {
          fontWeight: 'normal',
          marginLeft: 20,
          fontFamily: 'roboto'
         }
        }}/> 
        <Stack.Screen 
          name="ActivityList" 
          component ={ActivityList}
          options={{
          headerShown: true,
          title: '       Activities',
          headerTitleStyle: {
          fontWeight: 'normal',
          marginLeft: 20,
          fontFamily: 'roboto'
         }
        }}/> 
        <Stack.Screen 
          name="ActivityPreview" 
          component ={ActivityPreview}
          options={{
          headerShown: false
        }}/> 
         <Stack.Screen 
          name="VoteTally"
          component ={VoteTally}
          options={{
          headerShown: false
        }}/> 
        <Stack.Screen 
          name="EnterResult" 
          component ={EnterResult}
          options={{
          title: 'Enter Result',
          headerShown: false,
          headerStyle: {
          backgroundColor: '#1D5179',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
          fontWeight: 'normal',
          alignSelf:'center',
          fontFamily: 'roboto'
         }}
          }
        />  
         <Stack.Screen 
          name="VideoPreview"
          component ={VideoPreview}
          options={{
          headerShown: false
        }}/> 
        <Stack.Screen 
          name="PinSheet" 
          component ={PinSheet}
          options={{
          title: 'Enter Result',
          headerShown: false,
          headerStyle: {
          backgroundColor: '#1D5179',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
          fontWeight: 'normal',
          alignSelf:'center',
          fontFamily: 'roboto'
         }}
          }
        />  
        <Stack.Screen 
          name="PresidentialComponent" 
          component ={PresidentialComponent}
          options={{
          title: 'Enter Result',
          headerShown: false,
          headerStyle: {
          backgroundColor: '#1D5179',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
          fontWeight: 'normal',
          alignSelf:'center',
          fontFamily: 'roboto'
         }}
          }
        />  
        <Stack.Screen 
          name="ParliamentaryComponent" 
          component ={ParliamentaryComponent}
          options={{
          title: 'Enter Result',
          headerShown: false,
          headerStyle: {
          backgroundColor: '#1D5179',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
          fontWeight: 'normal',
          alignSelf:'center',
          fontFamily: 'roboto'
         }}
          }
        />  

        <Stack.Screen 
          name="ResultPreview" 
          component ={ResultPreview}
          options={{
          title: 'Enter Result',
          headerShown: false,
          headerStyle: {
          backgroundColor: '#1D5179',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
          fontWeight: 'normal',
          alignSelf:'center',
          fontFamily: 'roboto'
         }}
          }
        />  
        
      </Stack.Navigator>
      
    </NavigationContainer>
  </MenuProvider>
    
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
