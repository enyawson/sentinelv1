import { Email } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AsyncStorage from '@react-native-community/async-storage';
export default function VerificationCodeForm({route, navigation}){

    const [verificationPin, setVerificationPin] = useState("");
    const [deviceId, setDeviceId] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [generatedToken, setGeneratedToken] = useState("")
    
    const [onCodeVerified, setOnCodeVerified]= useState(false);
    

    useEffect(() => {
            console.log('Verification page mounted');
            getData();
    
        return () => {
            
        }
    }, [])

    // retrieve login Response
    const getData = async ()=> {
        
       
            const jsonValue = await AsyncStorage.getItem('loginResponse')
            // get response from json value
            const getValue =(JSON.parse(jsonValue));
            console.log(getValue)
       
        }

   
    const userVerificationPin = (value)=>{
        setVerificationPin(value);
    }
    const userDeviceId = (value)=>{
        setDeviceId(value);
    }
    const userPhoneNumber = (value)=>{
        setPhoneNumber(value);
    }
    const userAccessToken = (value)=>{
        setGeneratedToken(value);
    }

    

    // const userAddress = (value) => {
    //     setUserEmail(value);
    // }

   const toggleOnCodeVerified = ()=> {
       setOnCodeVerified(true);
   }

   const onSubmitForm=()=> {
    //if verified true, move to Home
        navigation.navigate('Home')
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
                        userVerificationPin(value)
                    }
                    value={verificationPin}
                    multiline={false}
                    keyboardType={'numeric'}
                    placeholder={'Enter verification code'}
                    enablesReturnKeyAutomatically={true}
                > 
                </TextInput>
            </View>
            {/* <View>
                <TextInput 
                    style={styles.textInputBoxStyle}
                    onChangeText={(value) => 
                        userAddress(value)
                    }
                    value={userEmail}
                    keyboardType={'Email'}
                    multiline={false}
                    placeholder={'Email'}
                    enablesReturnKeyAutomatically={true}
                > 
                </TextInput>
            </View>
             */}
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