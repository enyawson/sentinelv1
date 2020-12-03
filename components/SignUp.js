import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {MAIN_URL, APIKEY} from './ConstantUrls';
import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform, BackHandler,ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ArrowBack from 'react-native-vector-icons/Ionicons';


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
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

    }
    componentDidUpdate(){

    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backAction)
        
    }
     // this method navigates to home on device back press
     backAction=()=>{
        //    alert('go')
           return true;
        }

    register = () =>{
        
        let formData=new FormData();
        formData.append('firstname',this.state.firstName);
        formData.append('lastname', this.state.lastName);
        formData.append('email', this.state.userEmail);
        formData.append('affiliation', this.state.institution);
        formData.append('affiliationcode', this.state.institutionIDNum);
        formData.append('password', '1111111');
        formData.append('telephone', this.state.contact);
        formData.append('address', 'Abeka');
        formData.append('country', this.state.countrySelected);


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
    
    onSubmitForm = () =>{
        //set the onSubmit state to true
        this.register();
        // this.setState({
        //     onContinue: true,
        // });
        this.props.navigation.navigate('Home');
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
                    <View style={{flex:0.15, backgroundColor: '#1D5179'}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                onPress={()=> this.props.navigation.navigate('Home')}>
                                <ArrowBack
                                    name={'arrow-back-outline'}
                                    size={23}
                                    color="white"
                                    style={{margin:0, alignContent: 'center', marginTop: 15, padding:10}}   
                                />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'roboto',
                                fontSize:35,
                                marginTop: '2%',
                                fontWeight:'bold',
                                color: 'white', 
                                alignSelf: 'center',
                            }}>
                                ELECTION WATCH
                            </Text>
                        </View>
                        
                           
                        <Text style={{
                            fontFamily:'roboto',
                            fontSize:24,
                            fontWeight:'bold', 
                            color: 'white', 
                            alignSelf: 'center',
                            }}>
                             Sign up
                        </Text>
                    </View>
                     {/* toggling between buttons */}
                <View style={{ borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    flex:0.85, 
                    backgroundColor: '#F0F0F0',
                    alignItems: 'center',
                    justifyContent: 'center',
                   
                }}>
                <View>
                <ScrollView>

                
                    <View style={{flexDirection:'row',marginTop:25,
                        alignItems:'flex-end', justifyContent:'center', paddingBottom:20}}>
                        <TouchableOpacity
                        style={{
                            width: 20,
                            height:20,
                            borderRadius: 100,
                            borderWidth:1,
                            backgroundColor: this.state.individualColor, 
                            borderColor:'#1D5179'}}
                            onPress={()=> {this.onIndividualButtonClick()}}>
                        </TouchableOpacity>
                        <Text style={{paddingLeft: '2%'}}
                        onPress={()=> {this.onIndividualButtonClick()}}>Individual</Text>

                        <TouchableOpacity
                            style={{background:'red', 
                            width: 20,
                            height:20,
                            marginLeft:'10%',
                            borderRadius: 100,
                            borderWidth:1,
                            backgroundColor:this.state.businessColor, 
                            borderColor:'#1D5179'}}
                            onPress={()=> {this.onBusinessButtonClick()}}>
                        </TouchableOpacity>
                        <Text style={{paddingLeft: '2%'}} onPress={()=> {this.onBusinessButtonClick()}}>Institution</Text> 

                    </View>
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
                        /> 
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
                    <View>
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
                        onPress={()=> this.onSubmitForm()}>
                            <Text style={{alignSelf:'center', color:'white'}}>
                                Submit
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
                        color: '#EE7155', alignSelf: 'center', marginBottom:'10%',}}>
                        SOFTMASTERS
                    </Text>

                </ScrollView>
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
    flex:0.8, 
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