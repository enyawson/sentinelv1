import { Email } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform, ToastAndroid,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AsyncStorage from '@react-native-community/async-storage';

export default function VerificationCodeForm({route, navigation, props}){

    const [verificationPin, setVerificationPin] = useState("");
    const [pinReceived, setPinReceived] = useState("");
   
    

    useEffect(() => {
       
            console.log('Verification page mounted');
            getData();
            //userVerificationPin();
    
        return () => {
            
        }
    }, [])


       
    // retrieve login Response
    const getData = async ()=> {
            const jsonValue = await AsyncStorage.getItem('pin')
            // get verification pin to login
            setPinReceived(jsonValue);
            console.log("Pin Received "+ pinReceived)
        }

   
    // const userVerificationPin = (value)=>{
    //     setVerificationPin(value);
    // }
    
    let {pinFromResponse}= route.params
    return(
        
    <View style={styles.contentContainer}>
{/*        
        <Image
            style={{padding:10,width:'70%', height:'20%',marginTop:50}}
            source={require('../assets/Election_watch_without_bg.png')}>
        </Image> */}
    
        <View style={{marginTop: '50%',marginBottom: 0}}>
            <View> 
                <TextInput 
                    style={styles.textInputBoxStyle }
                    // onChangeText={(value) => 
                    //     //userVerificationPin(value)
                    // }
                    value={pinFromResponse}
                    multiline={false}
                    keyboardType={'numeric'}
                    placeholder={'Enter verification code'}
                    enablesReturnKeyAutomatically={true}
                > 
                </TextInput>
            </View>
           
            <View>
                <TouchableOpacity style={styles.submitButton}
                    onPress={()=> {
                        if(pinReceived ===null){
                             ToastAndroid.show('Enter Verification code', ToastAndroid.SHORT);
                        }
                        if(pinReceived != null){
                             ToastAndroid.show('Registered Successfully', ToastAndroid.LONG);
                            navigation.navigate('EnterResult')
                          
                        }
                       
                    }}>
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
        color: '#000',
        textAlign:'center'

        
        
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