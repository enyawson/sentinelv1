import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform
} from 'react-native';


export default function SignUpContinuation({route, navigation,navigation:{setParams}}){

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [onSubmit, setOnSubmit]= useState(false);

    useEffect(() => {
            console.log('SignUp mounted');
        return () => {
            
        }
    }, [])

   
    const setNameOfUser= (text) => {
        setUserName(text);
    }
    const setUserPassword= (text) => {
        setPassword(text);
    }
    const setUserConfirmPassword= (text) => {
        setConfirmPassword(text);
    }

    const  onContinueForm = () =>{
        //set the onSubmit state to true
        setOnContinue(true);
        navigation.navigate('VerificationCodeForm');
    }
    const  onSubmitForm = () =>{
        //set the onSubmit state to true
        setOnSubmit(true);
        navigation.navigate('Home');
    }

    return(
    
        <View style={styles.container}>
         <StatusBar barStyle="light-content" backgroundColor="#174060"/>
                <View style={{flex:0.45, backgroundColor: '#1D5179'}}>
                    <Text style={{fontFamily:'roboto',
                    fontSize:35, marginTop: 30,marginLeft: 30,marginRight: 30,
                     fontWeight:'bold', 
                     color: 'white', alignSelf: 'center'}}>
                        ELECTION WATCH
                    </Text>
                       
                    <Text style={{fontFamily:'roboto',
                    fontSize:24,
                     fontWeight:'bold', 
                     color: 'white', alignSelf: 'center', margin:5,}}>
                         Sign-up 
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                <View style={{marginTop: 0,marginBottom: 0}}>
                 <View> 
                        <TextInput 
                            style={styles.textInputBoxStyle}
                            onChangeText={(text) => 
                            setNameOfUser(text)
                            }
                            value={userName}
                            multiline={false}
                            placeholder={'  Enter user name'}
                            enablesReturnKeyAutomatically={true}
                        > 
                        </TextInput>
                    </View>
                    <View>
                        <TextInput 
                            style={styles.textInputBoxStyle}
                            onChangeText={(text) => 
                            setUserPassword(text)
                            }
                            value={password}
                            multiline={false}
                            placeholder={'  password'}
                            enablesReturnKeyAutomatically={true}
                        > 
                        </TextInput>
                    </View>
                    <View>
                        <TextInput 
                            style={styles.textInputBoxStyle}
                            onChangeText={(text) => 
                            setUserConfirmPassword(text)
                            }
                            value={confirmPassword}
                            multiline={false}
                            placeholder={'  Confirm Password'}
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
                    <Text style={{fontFamily:'roboto',
                        fontSize:14,
                        fontWeight:'bold', 
                        color: 'rgba(117, 115, 115, 0.6)', alignSelf: 'center', marginTop: 10,}}>
                        by
                    </Text>
                    <Text style={{fontFamily:'roboto',
                        fontSize:24,
                        fontWeight:'bold', 
                        color: '#EE7155', alignSelf: 'center', marginBottom:0,}}>
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
        marginBottom: 15,
        padding: 10,
    },
    submitButton:{
        width: 300,
        height: 40,
        backgroundColor: '#1D5179',
        justifyContent: 'center',
        borderRadius: 100,  
        marginTop: 10,
        marginBottom: 90,
    },
})