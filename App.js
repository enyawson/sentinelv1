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
import SignUpContinuation from './components/SignUpContinuation';
import VerificationCodeForm from './components/VerificationCodeForm';
import MainActivityList from './components/MainActivityList';
import { MenuProvider } from 'react-native-popup-menu';
import ActivityList from './components/ActivityList';
import ActivityPreview from './components/ActivityPreview';
import VoteTally from './components/VoteTally';
import EnterResult from './components/EnterResult';
import VideoPreview from './components/VideoPreview';
//import PinSheet from './components/PinSheet';
import PresidentialComponent from './components/PresidentialComponent';
import ParliamentaryComponent from './components/ParliamentaryComponent';
import ResultPreview from './components/ResultPreview';
import BusinessRegistration from './components/BusinessRegistration';
// import DocumentScanner from './components/DocumentScanner';
import ScannedDocumentPage from './components/ScannedDocumentPage';
import BusinessRegContinuation from './components/BusinessRegContinuation';
import ResultPreviewPresidential from './components/ResultPreviewPresidential';
//import LocationMapStatic from './components/LocationMapStatic';
// import CropperPage from './components/CropperPage';
// import ScannerDoc from './components/ScannerDoc';
import LoginPage from './components/LoginPage';
import {HeaderBackButton} from '@react-navigation/stack';
import { Navigation } from '@material-ui/icons';
import CameraScanner from './components/CameraScanner';
import CropperTool from './components/CropperTool';
import CropperToolSecond from './components/CropperToolSecond';


const Stack = createStackNavigator();

const Auth = ()=> {
  // stack Navigator for Login and Sign Up Screen
  return (
    <Stack.Navigator >
      <Stack.Screen 
          name="LoginPage" 
          component ={LoginPage}
          options={{
          headerLeft:null,
          title:'Report on Result',
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
          name="VerificationCodeForm" 
          component ={VerificationCodeForm}
          options={{
          headerShown: false
        }}/> 
    </Stack.Navigator>
  );
}

export default function App() {
  
  return (
  <MenuProvider>
    <NavigationContainer initialRouteName = "Home">
   {/* Auth Navigator: Include Login and Signup */}
   
    <Stack.Navigator>
        {/* <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown:false}}
        /> */}
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
          title: '       REPORT',
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
          name="SignUpContinuation" 
          component ={SignUpContinuation}
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
            title:'             REPORT',
          headerShown: true,
          headerStyle: {
          backgroundColor: '#1D5179',
          },
          headerTintColor: '#FFFFFF',
          
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
        {/* <Stack.Screen 
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
        />   */}
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
         <Stack.Screen 
          name="BusinessRegistration" 
          component ={BusinessRegistration}
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
          name="BusinessRegContinuation" 
          component ={BusinessRegContinuation}
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
          fontFamily: 'roboto',
         }}
          }
        />  
        {/* <Stack.Screen 
          name="DocumentScanner" 
          component ={DocumentScanner}
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
        />   */}
        {/* <Stack.Screen 
          name="ScannerDoc" 
          component ={ScannerDoc}
          options={{
          title: 'Scan',
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
        />  */}
        {/* <Stack.Screen 
          name="CropperPage" 
          component ={CropperPage}
          options={{
          title: 'Crop Scanned Document',
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
        />  */}
          <Stack.Screen 
          name="ScannedDocumentPage" 
          component ={ScannedDocumentPage}
          options={{
          headerLeft:null,
          title:'RESULTS',
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
        {/* <Stack.Screen 
          name="LocationMapStatic" 
          component ={LocationMapStatic}
          options={{
          title: 'Report on Result',
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
        />   */}

        <Stack.Screen 
          name="ResultPreviewPresidential" 
          component ={ResultPreviewPresidential}
          options={{
          
          title:'CONFIRM RESULT',
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
          name="CameraScanner" 
          component ={CameraScanner}
          options={{
          
          title:'',
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
          name="CropperTool" 
          component ={CropperTool}
          options={{
          
          title:'',
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
         {/* <Stack.Screen 
          name="CropperToolSecond" 
          component ={CropperToolSecond}
          options={{
          
          title:'',
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
        />  */}
        
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
