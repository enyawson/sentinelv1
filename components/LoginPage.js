import { Email } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform, Alert
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {getUniqueId} from 'react-native-device-info';
import {APIKEY, MAIN_URL, LOGIN_URL, VERIFY_DEVICE} from '../components/ConstantUrls'
import AsyncStorage from '@react-native-community/async-storage';

//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({route, navigation}){

    const [phoneNumber, setPhoneNumber] = useState("");
    const [uniqueId, setUniqueId] = useState(" ");
    const [pinVerification, setPinVerification] = useState('')
 
    
    
    useEffect(() => {
            console.log('Login Page Mounted');
            let deviceId = DeviceInfo.getUniqueId();
            const telephone = '';
            telephone = AsyncStorage.getItem('telephone')
            checkUserAuthentication(deviceId, telephone);
            setUniqueId( deviceId);
            console.log(uniqueId)

        return () => {  
        }
    }, [])

    

    //sign up 
    const _signUp =()=>{
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
            // let value = response['data']
            ;
            const storeData = async()=> {
                try{
                    await AsyncStorage.setItem('pin', response.data.data.pin)
                    await AsyncStorage.setItem('telephone', response.data.data.telephone)
                    await AsyncStorage.setItem('deviceid',
                    JSON.stringify( response.data.data.deviceid))
                    //(response.data.data.pin);
                    console.log("Pin Retrieved ", response.data.data.pin)
                    //navigate  to verification 
                    navigation.navigate('VerificationCodeForm', {pinFromResponse: response.data.data.pin })
                }catch (e){
                    console.log('error saving login response')
                }
            }
            storeData();
        })


        


    } else if (phoneNumber.length() < 10){
        alert('incorrect number')
        console.log(typeof phoneNumber)
    } else {
        alert('please enter your phone number')
    }

    }

    const checkUserAuthentication = (deviceid, telephone)=>{
       
        let formData=new FormData();
        formData.append('deviceid', deviceid);
        formData.append('telephone', telephone);
        
        axios({
            method:'POST',
            url:VERIFY_DEVICE,
            data:formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                apikey: APIKEY,
              },
         }).then(response=>{
             if(response.data.data.verificationstatus === 'verified'){
               //perform the action
               navigation.navigate('Home')
               console.log("is verified")
             }else{
                // remain on the same page
                navigation.navigate('LoginPage')
                Alert.alert("Enter number to Sign Up");
             }
        })
    }
   
    const userPhoneNumber = (value)=>{
        setPhoneNumber(value);
    }
   

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