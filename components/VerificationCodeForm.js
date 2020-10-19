import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform
} from 'react-native';


export default function VerificationCodeForm ({route, navigation,navigation:{setParams}}){

    const [verificationCode,setVerificationCode] = useState('');
    const [codeVerified, setCodeVerified] = useState('');
   

    useEffect(() => {
            console.log('verification code form mounted');
        return () => {
            
        }
    }, [])

  
   
    const getVerificationCode= (text) => {
        setVerificationCode(text);
    }

    function onFormSubmit (){
        //set the onSubmit state to true
        setOnSubmit(true);
    }

    return(
    
        <View style={styles.container}>
         <StatusBar barStyle="light-content" backgroundColor="#174060"/>
                <View style={{flex:0.55, backgroundColor: '#1D5179'}}>
                    <Text style={{fontFamily:'roboto',
                    fontSize:35, marginTop: 10,marginLeft: 30,marginRight: 30,
                     fontWeight:'bold', 
                     color: 'white', alignSelf: 'center'}}>
                        ELECTION WATCH
                    </Text>
                       
                    <Text style={{fontFamily:'roboto',
                    fontSize:26,
                     fontWeight:'bold', 
                     color: 'white', marginLeft: 35, marginTop:5}}>
                         Verification code
                    </Text>
                    <Text style={{fontFamily:'roboto',
                    fontSize:14,
                     color: 'white', marginLeft: 35, marginTop:0}}>
                        A verification code has been sent to your 054 138 6626
                        phone number, please enter it
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    <View style={{marginTop: 50,marginBottom: 0}}>
                        <View style={{flexDirection: 'row',alignSelf:'center', marginTop: 70}}>
                            <TextInput 
                                style={styles.codeInput}
                                onChangeText={(text) => 
                                setAffiliateCode(text)
                                }
                                value={''}
                                multiline={false}
                                enablesReturnKeyAutomatically={true} > 
                            </TextInput>
                            <TextInput 
                                style={styles.codeInput}
                                onChangeText={(text) => 
                                setAffiliateCode(text)
                                }
                                value={''}
                                multiline={false}
                                enablesReturnKeyAutomatically={true} > 
                            </TextInput>
                            <TextInput 
                                style={styles.codeInput}
                                onChangeText={(text) => 
                                setAffiliateCode(text)
                                }
                                value={''}
                                multiline={false}
                                enablesReturnKeyAutomatically={true} > 
                            </TextInput>
                            <TextInput 
                                style={styles.codeInput}
                                onChangeText={(text) => 
                                setAffiliateCode(text)
                                }
                                value={''}
                                multiline={false}
                                enablesReturnKeyAutomatically={true} > 
                            </TextInput>
                            <TextInput 
                                style={styles.codeInput}
                                onChangeText={(text) => 
                                setAffiliateCode(text)
                                }
                                value={''}
                                multiline={false}
                                enablesReturnKeyAutomatically={true} > 
                            </TextInput>
                            <TextInput 
                                style={styles.codeInput}
                                onChangeText={(text) => 
                                setAffiliateCode(text)
                                }
                                value={''}
                                multiline={false}
                                enablesReturnKeyAutomatically={true} > 
                            </TextInput>
                            
                        </View>
                    
                        <View style={{alignSelf:'center'}}>
                            <TextInput 
                                style={styles.textInputBoxStyle}
                                onChangeText={(text) => 
                                setAffiliateCode(text)
                                }
                                value={''}
                                multiline={false}
                                placeholder={'  verification code'}
                                enablesReturnKeyAutomatically={true} > 
                            </TextInput>
                        </View>
                    
                        <View style={{alignSelf:'center', marginTop:20}}>
                            <TouchableOpacity style={styles.submitButton}
                                onPress={()=> onFormSubmit()}>
                                <Text style={{alignSelf:'center', color:'white'}}>
                                    continue
                                </Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{alignSelf:'center'}}>
                            <Text style={{justifyContent:'center',color: '#898989', fontSize: 14, 
                            marginLeft:32, marginRight: 30, marginTop: 15}}>
                            Could not receive verification code via sms? Please click 
                            on try voice call, we’ll make a voice call 
                            to 054****626 with the verification code
                            </Text>
                        </View>
                        
                        <View style={{flexDirection:'row', alignSelf: 'center', marginTop: 25}}>
                            <Image 
                            style={styles.imageInBox}
                            source = { require('../assets/voiceCall.png') } />
                            <Text style={{marginLeft: 5}}>try voice call</Text>
                        </View>
                       
                        
                        <Text style={{fontFamily:'roboto',
                            fontSize:18,
                            fontWeight:'700', 
                            color: 'rgba(117, 115, 115, 0.6)', alignSelf: 'center', marginTop: 60,}}>
                            by
                        </Text>
                        <Text style={{fontFamily:'roboto',
                            fontSize:24,
                            fontWeight:'bold', 
                            color: '#EE7155', alignSelf: 'center', marginBottom:30,}}>
                            SOFTMASTERS
                        </Text>
                    </View>
                </View>
                    
        </View>
        
    
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D5179',
        flexDirection: 'column',
    },
    contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex:2, 
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    },

    text: {
        fontFamily: 'roboto',
        fontSize: 16,
        fontWeight: 'bold', 
    },
    textInputBoxStyle:{
        height: 40, 
        width: 300,
        borderRadius: 100,
        borderColor:'#C4C4C4',
        borderWidth: 1, 
        marginBottom: 0,
    },
    codeInput:{
        height: 40, 
        width: 40,
        borderRadius: 100,
        borderColor:'#C4C4C4',
        borderWidth: 1, 
        marginBottom: 15,
        marginLeft: 10,
    },
    submitButton:{
        width: 300,
        height: 40,
        backgroundColor: '#1D5179',
        justifyContent: 'center',
        borderRadius: 100,  
    },
    imageInBox: {
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignSelf:'center',
      },
})