import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform
} from 'react-native';


export default class BusinessRegistration extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});

        this.state ={
            userName: '',
            password: '',
            confirmPassword: ' ',
            onSubmitForm: false,

              } 
    };

  
    
    setUserNameOfInstitution= (text) => {
      this.setState({
          userName: text,
      })
    }
    setPasswordOfInstitution= (text) => {
        this.setState({
          password: text,  
        })
    }
    setInstitutionConfirmPassword= (text) => {
        this.setState({
            confirmPassword:text
        })
    }

    onSubmitForm = () =>{
        //set the onSubmit state to true
        this.setState({
            onSubmitForm: true,
        })
        navigation.navigate('Home');
    }

    render(){
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
                                 this.setUserNameOfInstitution(text)
                                }
                                value={''}
                                multiline={false}
                                placeholder={'  Enter username'}
                                enablesReturnKeyAutomatically={true}
                            > 
                            </TextInput>
                        </View>
                        <View>
                            <TextInput 
                                style={styles.textInputBoxStyle}
                                onChangeText={(text) => 
                                this.setPasswordOfInstitution(text)
                                }
                                value={''}
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
                                this.setInstitutionConfirmPassword(text)
                                }
                                value={''}
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
    },
    submitButton:{
        width: 300,
        height: 40,
        backgroundColor: '#1D5179',
        justifyContent: 'center',
        borderRadius: 100,  
    },
})