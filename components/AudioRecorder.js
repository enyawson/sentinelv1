import React, { Component } from 'react';
import { AppRegistry,
    StyleSheet, Text, 
    PermissionsAndroid, View, StatusBar,
    Image, TouchableOpacity, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StartRecord from 'react-native-vector-icons/Ionicons';
import StopRecord from 'react-native-vector-icons/Ionicons';
import Arrow from 'react-native-vector-icons/FontAwesome5';
import { NavigateBefore, Navigation } from '@material-ui/icons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ArrowBack from 'react-native-vector-icons/Ionicons';


const audioRecorderPlayer = new AudioRecorderPlayer();

export default class AudioRecorder extends Component{
    constructor(props,navigation){
        super();
        this.state = {
            audioUri: '',
            isRecordingStart: false,
            isRecordingStop:false,
            isRecordingSaved:false,
            recordSecs: '',
            recordTime: '',
            currentPositionSec: '',
            currentDurationSec:'',
            playTime: '',
            duration: '',

        }
    }
    
    componentDidMount (){
        
    }
    componentWillUnmount (){

    }
    permissionToRecord= async()=>{
        if (Platform.OS === 'android') {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                  title: 'Permissions for write access',
                  message: 'Give permission to your storage to write a file',
                  buttonPositive: 'ok',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('audio permission granted');
              } else {
                console.log(' permission denied');
                navigate.goBack();
                return;
              }
            } catch (err) {
              console.warn(err);
              return;
            }
          }
    }

    onStartRecord = async ()=>{
        //ask for audio prermission
        this.permissionToRecord();
       //change isRecordingStart to true to switch button view
       this.setState({

           isRecordingStart: true,
        
       })
       const result = await this.audioRecorderPlayer.startRecorder();
       this.audioRecorderPlayer.addReRecordBackListener((e)=> {
           this.setState({
               recordSecs: e.current_position,
               recordTime: this.audioRecordPlayer.mmssss(Math.floor(e.current_position)),
           });
           return;
       });
       console.log('*****START RECODING*****')
       console.log(result);
       console.log("recordSecs", this.state.recordSecs)
       console.log("recordTime", this.state.recordTime)
    }

    onStopRecord = async()=> {
       //set isRecordingStart to false to switch button view
       this.setState({
           isRecordingStart: false,
       }) 

       const result = await this.audioRecordPlayer.stopRecorder();
       this.audioRecordPlayer.removeRecordBackListener();
       this.setState({
           recordSecs: 0,
        });
        console.log('*****STOP*****')
        console.log(result);
        console.log("recordSecs", this.state.recordSecs)
        console.log("recordTime", this.state.recordTime)
   }

   onStartPlay = async() => {
        console.log('onStartPlay');
        const msg = await this.audioRecordPlayer.startPlayer();
        console.log(msg);
        this.audioRecordPlayer.addPlayBackListener((e)=> {
            if (e.current_position === e.duration){
                console.log("finished");
                this.audioRecordPlayer.stopPlayer();
            }
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
            return;
        });
   }

   onPausePlay = async ()=> {
        await this.audioRecorderPlayer.pausePlayer();
   }

   onStopPlay = async () => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
    }
//     Default path for android uri is sdcard/sound.mp4.
// Default path for ios uri is sound.m4a.

    render(){
       
        return(
            <SafeAreaView style= {styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#174060"/>
                 
                <View style={{flex:0.9, backgroundColor:'#1D5179', justifyContent:'center'
                    ,borderBottomRightRadius:5, borderBottomLeftRadius:5}}>
                    <View style={{flexDirection:'row',  marginTop:'0%', }}>
                    <TouchableOpacity
                                onPress={()=> this.props.navigation.navigate('Home')}>
                                <ArrowBack
                                    name={'arrow-back-outline'}
                                    size={23}
                                    color="white"
                                    style={{margin:0, alignContent: 'center', marginTop: 15, padding:10}}   
                                />
                    </TouchableOpacity>
                    <Text style={{fontSize:20, fontStyle:'normal', color:'white', fontFamily:'roboto',
                        alignSelf:'center', marginLeft:'15%', }}>
                        New Recording
                    </Text>
                    </View>
                     
                    <Text style={{color:'white',justifyContent:'center',fontFamily:'roboto',alignSelf:'center'
                        ,marginBottom: 5, marginTop: 5}}>
                        Time & date
                    </Text>
                </View>
                    <View style={{flex: 2, backgroundColor: ''}}>
                        <Image 
                        style={styles.recordImage}
                        source = { require('../assets/recordingImage.png') }
                            backgroundColor={''}
                        />
                    </View>
                    
                    <View style={styles.recorderTimer}> 
                        <Text style={{fontSize: 18, paddingTop: 0}}>
                            00:00:00
                        </Text>
                    </View>
                    {this.state.isRecordingStart? 
                        <View  style={{flex: 0.7, backgroundColor:''}}>
                            <TouchableOpacity
                                style={styles.startRecord}
                                onPress={()=>{this.onStopRecord()}}>
                                <StopRecord
                                name={"square"}
                                size={25}
                                color="white"
                                style={{margin:10, alignContent: 'center'}}
                                />   
                            </TouchableOpacity>  
                        </View>
                        :
                        <View  style={{flex: 0.7, backgroundColor:''}}>
                            <TouchableOpacity
                                style={styles.startRecord}
                                onPress={()=> { this.onStartRecord()}}>
                                <StartRecord
                                name={"ellipse-outline"}
                                size={25}
                                color="white"
                                style={{margin:10, alignContent: 'center'}}
                                />   
                            </TouchableOpacity>  
                        </View>
                    }
        
        </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column', 
        color: '#F0F0F0',
    },
    recordImage: {
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignSelf:'center',
        marginTop: 0,
    
    },
    startRecord:{
        alignSelf: 'center',
        alignContent:'center',
        borderRadius: 100,
        elevation: 7,
        backgroundColor: '#cf352e'
    },
    recordButton: {
        width: 0,
        height: 0,
        justifyContent: 'center',
        alignSelf:'center',
       
      },
    recorderTimer: {
        flex: 0.9,
        paddingTop: 0,
        alignItems: 'center',
        alignContent: 'center'
    }
});
AppRegistry.registerComponent('App', () => AudioRecorder);