import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {MAIN_URL, APIKEY} from './ConstantUrls';
import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class SignUp extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});

        this.state ={
           firstName:'',
           lastName: '',
           userEmail:'',
           contact: '',
           countrySelected:'', // remove country from both sides, just use the country code to detect country
           institution: '',
           institutionIDNum: '', // remove this// use accreditation number or code is optional
           deviceIMEI: '', // submit the device id when submitting telephone number


           onContinue: false,
           individualColor: '#1D5179', 
           businessColor: '#f0f0f0',
            
        } 
    };
    componentDidMount(){
        this.onIndividualButtonClick();

    }
    componentDidUpdate(){

    }
    componentWillUnmount(){
        
    }

     _register =()=>{
        // firstname Chaos
        // lastname Figthing
        // email Ghana
        // affiliation Joy FM
        // affiliationcode 8020202
        // password 11111
        // telephone 904030303
        // address Abeka
        // country Ghana
        let formData=new FormData();
        formData.append('firstname',this.state.firstName);
        formData.append('lastname', this.state.lastName);
        formData.append('email', this.state.userEmail);
        formData.append('affiliation', this.state.institution);
        formData.append('affiliationcode', this.state.institutionIDNum);
        formData.append('telephone', this.state.contact);
       


        axios({
            method:'POST',
            url:MAIN_URL+'register',
            data:formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                apikey: APIKEY,
              },
        }).then(response=>{
            console.log(response.data);
        })

    }
    setPersonsFirstName = (text)=>{
        this.setState({
            firstName: text,
        });
    } 
    setPersonsEmail = (text)=>{
        this.setState({
            userEmail: text,
        });
    } 
    setPersonsContact = (text)=>{
        this.setState({
            contact: text,
        });
    } 
    setPersonsLast = (text)=>{
        this.setState({
            lastName: text,
        });
    } 
    setCountryName= (text) => {
        this.setState({
            countrySelected: text,
        });
    }
    setNameOfInstitution= (text) => {
        this.setState({
            institution: text,
        });
    }
    setCodeOfInstitution= (text) => {
        this.setState({
            institutionIDNum: text,
        });
    }
    
    onContinueForm = () =>{
        //set the onSubmit state to true
        this.setState({
            onContinue: true,
        });
        //this.props.navigation.navigate('');
    }

    /**this method changes business button color on press */
  
    onBusinessButtonClick =()=>{
        this.setState({
           businessColor: "#1d5179",
           individualColor: '#f0f0f0',
        });
        this.props.navigation.navigate('BusinessRegistration')
        console.log('BUSINESS')
        
    }
     /**this method changes individual button color on press */
    onIndividualButtonClick =()=>{
        this.setState({
            businessColor: "#f0f0f0",
            individualColor: '#1d5179',
         });
        console.log('INDIVIDUAL')
        this.props.navigation.navigate('SignUp')
       
    }


    render(){
        return(
            <View style={styles.container}>
             <StatusBar barStyle="light-content" backgroundColor="#174060"/>
                    <View style={{flex:0.35, backgroundColor: '#1D5179'}}>
                        <Text style={{fontFamily:'roboto',
                            fontSize:35,
                            marginTop: 10,
                            marginLeft: 30,
                            marginRight: 30,
                            fontWeight:'bold',
                            color: 'white', 
                            alignSelf: 'center',
                        }}>
                            ELECTION WATCH
                        </Text>
                           
                        <Text style={{fontFamily:'roboto',
                        fontSize:24,
                         fontWeight:'bold', 
                         color: 'white', alignSelf: 'center', margin:2,}}>
                             Sign up
                        </Text>
                    </View>
                     {/* toggling between buttons */}
                    <View style={styles.contentContainer}>
                        <View style={{flexDirection:'row',marginTop: 45, backgroundColor:'',
                             alignItems:'flex-end'}}>
                            <TouchableOpacity
                            style={{background:'red',
                                width: 20,
                                height:20,
                                borderRadius: 100,
                                borderWidth:1,
                                backgroundColor: this.state.individualColor, 
                                borderColor:'#1D5179'}}
                             onPress={()=> {this.onIndividualButtonClick()}}>
                            </TouchableOpacity>
                            <Text style={{paddingLeft: 5}}
                            onPress={()=> {this.onIndividualButtonClick()}}>Individual</Text>
    
                            <TouchableOpacity
                             style={{background:'red', 
                                width: 20,
                                height:20,
                                marginLeft:50,
                                borderRadius: 100,
                                borderWidth:1,
                                backgroundColor:this.state.businessColor, 
                                borderColor:'#1D5179'}}
                             onPress={()=> {this.onBusinessButtonClick()}}>
                            </TouchableOpacity>
                            <Text style={{paddingLeft: 5}} onPress={()=> {this.onBusinessButtonClick()}}>Institution</Text> 
    
                        </View>
                        <View style={{marginTop: 30,marginBottom: 0}}>
                            <View> 
                                <TextInput 
                                    style={styles.textInputBoxStyle}
                                    onChangeText={(text) => 
                                    this.setPersonsFirstName(text)
                                    }
                                    value={this.state.firstName}
                                    multiline={false}
                                    placeholder={'  first Name'}
                                    enablesReturnKeyAutomatically={true}
                                > 
                                </TextInput>
                            </View>
                            <View>
                                <TextInput 
                                    style={styles.textInputBoxStyle}
                                    onChangeText={(text) => 
                                    this.setPersonsLast(text)
                                    }
                                    value={this.state.lastName}
                                    multiline={false}
                                    placeholder={'  Last Name'}
                                    enablesReturnKeyAutomatically={true}
                                > 
                                </TextInput>
                            </View>
                            <View>
                                <TextInput 
                                    style={styles.textInputBoxStyle}
                                    onChangeText={(text) => 
                                    this.setPersonsEmail(text)
                                    }
                                    value={this.state.userEmail}
                                    multiline={false}
                                    placeholder={'  Email address'}
                                    enablesReturnKeyAutomatically={true}
                                > 
                                </TextInput>
                            </View>
                            
                            <View >
                                <TextInput 
                                    style={styles.textInputBoxStyle}
                                    onChangeText={(text) => 
                                    this.setPersonsContact(text)
                                    }
                                    value={this.state.contact}
                                    multiline={false}
                                    placeholder={'  Phone Number'}
                                    enablesReturnKeyAutomatically={true}
                                > 
                                </TextInput>
                            </View>
    
                            <View >
                                <TextInput 
                                    style={styles.textInputBoxStyle}
                                    onChangeText={(text) => 
                                    this.setCountryName(text)
                                    }
                                    value={this.state.countrySelected}
                                    multiline={false}
                                    placeholder={'  Country'}
                                    enablesReturnKeyAutomatically={true}
                                > 
                                </TextInput>
                            </View>
                            <View >
                                <TextInput 
                                    style={styles.textInputBoxStyle}
                                    onChangeText={(text) => 
                                    this.setNameOfInstitution(text)
                                    }
                                    value={this.state.institution}
                                    multiline={false}
                                    placeholder={'  Institution'}
                                    enablesReturnKeyAutomatically={true}
                                > 
                                </TextInput>
                            </View>
                            <View>
                                <TextInput 
                                    style={styles.textInputBoxStyle}
                                    onChangeText={(text) => 
                                    this.setCodeOfInstitution(text)
                                    }
                                    value={this.state.institutionIDNum}
                                    multiline={false}
                                    placeholder={'  Institution\'s ID Number'}
                                    enablesReturnKeyAutomatically={true} > 
                                </TextInput>
                            </View>
                        
                            <View>
                                <TouchableOpacity style={styles.submitButton}
                                    onPress={()=> this.props.navigation.navigate('SignUpContinuation')}>
                                    <Text style={{alignSelf:'center', color:'white'}}>
                                        continue
                                    </Text>
                                </TouchableOpacity>
                            </View>  
                            <KeyboardSpacer />
                            <Text style={{fontFamily:'roboto',
                                fontSize:14,
                                fontWeight:'bold', 
                                color: 'rgba(117, 115, 115, 0.6)', alignSelf: 'center', marginTop: 10,}}>
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
    },
})