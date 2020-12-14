import { Email } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform, Alert, BackHandler
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {getUniqueId} from 'react-native-device-info';
import {APIKEY, MAIN_URL, LOGIN_URL, VERIFY_DEVICE} from '../components/ConstantUrls'
import AsyncStorage from '@react-native-community/async-storage';

//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({route, navigation, props}){

    const [phoneNumber, setPhoneNumber] = useState("");
    const [uniqueId, setUniqueId] = useState(" ");
    const [pinVerification, setPinVerification] = useState('')
    const [savingTelephone, setSavingTelephone]=useState(false);
    
    const handleBackButtonClick= () =>{
        navigation.navigate('Home');
        return true;
    }
    useEffect( ()=>{
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        ( async() => {
            console.log('Login Page Mounted');
            let deviceId = DeviceInfo.getUniqueId();
            const status = await AsyncStorage.getItem('status')
            //console.log('users ss', status)
            checkUserAuthentication(status)
            setUniqueId( deviceId);
            console.log(uniqueId);
        })();
        return () => { 
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick); 
        }
    }, []);

   
    
    /** sign up method */
    const _signUp =()=>{
        setSavingTelephone(true);
        if(phoneNumber){
           
        let formData=new FormData();
        formData.append('telephone', phoneNumber);
        formData.append('deviceid', uniqueId);
        axios({
            method:'POST',
            url:LOGIN_URL,
            data:formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                apikey: APIKEY,
              },
        }).then(response=>{
            //console.log('Test', response.data.data)
            //console.log('Phone', phoneNumber)
            const pin  = response.data.data.pin;
            const telephone = phoneNumber; 
            const deviceid = JSON.stringify( response.data.data.deviceid);
            
            storeData(pin, telephone, deviceid);
        })


    } else if (phoneNumber.length() < 10){
        alert('incorrect number')
        console.log(typeof phoneNumber)
    } else {
        alert('please enter your phone number')
    }

    }
    /** This method saves pin, telephone, deviceid */
    const storeData = async(pin, telephone, deviceid)=> {
     //set loader to true.
       
        try{
            await AsyncStorage.setItem('pin', pin)
            await AsyncStorage.setItem('telephone', telephone)
            await AsyncStorage.setItem('deviceid', deviceid)
            await AsyncStorage.setItem('status', 'verified')
      
             setSavingTelephone(false);
            //navigate  to verification 
            navigation.navigate('VerificationCodeForm', {pinFromResponse: pin })
        }catch (e){
            console.log('error saving login response', e)
        }
    }
    /** This method checks authentication */
    const checkUserAuthentication = (status)=>{

        if(status === 'verified'){
            //set loader to false
            setSavingTelephone(false);
           navigation.navigate('EnterResult')


        }else{
            //set loader to false
            setSavingTelephone(false);
            navigation.navigate('LoginPage')
           // Alert.alert("Enter number to Sign Up");

        }
       
        // let formData=new FormData();
        // formData.append('deviceid', deviceid);
        // formData.append('telephone', telephone);
        
        // axios({
        //     method:'POST',
        //     url:VERIFY_DEVICE,
        //     data:formData,
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         apikey: APIKEY,
        //       },
        //  }).then(response=>{
        //      if(response.data.data.verificationstatus === 'verified'){
        //        //perform the action
        //        navigation.navigate('Home')
        //        console.log("is verified")
        //      }else{
        //         // remain on the same page
        //         navigation.navigate('LoginPage')
        //         Alert.alert("Enter number to Sign Up");
        //      }
        // })
    }
   /** set user's phone number in state */
    const userPhoneNumber = (value)=>{
        setPhoneNumber(value);
    }
   /** sign up method */
   const onSubmitForm=()=> {
       _signUp();
       
   }


    return(  
    <View style={styles.contentContainer}>
       
            <Image
                style={{padding:10,width:'70%', height:'20%',marginTop:50}}
                source={require('../assets/Election_watch_without_bg.png')}>
            </Image>
       
        <View style={{marginTop: 70,marginBottom: 0}}>
            <View> 
                <TextInput 
                    style={styles.textInputBoxStyle}
                    onChangeText={(value) => 
                        userPhoneNumber(value)
                    }
                    value={phoneNumber}
                    multiline={false}
                    keyboardType={'numeric'}
                    placeholder={'Register Phone Number'}
                    enablesReturnKeyAutomatically={true}
                > 
                </TextInput>
            </View>
           
            <View>
                <TouchableOpacity style={styles.submitButton}
                    onPress={()=> onSubmitForm()}>
                    <Text style={{alignSelf:'center', color:'white'}}>
                        submit
                    </Text>
                </TouchableOpacity>
            </View>  
            <KeyboardSpacer />
            <Text style={{fontFamily:'roboto',
                fontSize:14,
                fontWeight:'bold', 
                color: 'rgba(117, 115, 115, 0.6)', alignSelf: 'center', marginTop:80,}}>
                by
            </Text>
            <Text style={{fontFamily:'roboto',
                fontSize:24,
                fontWeight:'bold', 
                color: '#F79520', alignSelf: 'center', marginBottom:0,}}>
                SOFTMASTERS
            </Text>
        </View>
        {savingTelephone &&  
                <ActivityIndicator
                size='large'
                color='#1D5179'
                style={styles.activityIndicator}
                animating={savingTelephone}
                />}
    </View>
 
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    contentContainer: {
     flex:1, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    },
    activityIndicator: {
       
        color: 'blue',
        position: 'absolute',
        left: 10,
        right: 10,
        top: 10,
        bottom: 0,
        alignSelf:'center'
    },

    text: {
        fontFamily: 'roboto',
        fontSize: 16,
        fontWeight: 'bold', 
    },
    textInputBoxStyle:{
        height: 35, 
        width: 250,
        borderRadius: 100,
        borderColor:'#C4C4C4',
        borderWidth: 1, 
        marginBottom: 15,
        paddingLeft: 15,
        
    },
    submitButton:{
        width: 250,
        height: 35,
        backgroundColor: '#F79520',
        justifyContent: 'center',
        borderRadius: 100,  
        marginTop: 10,
        marginBottom: 90,
    },
})