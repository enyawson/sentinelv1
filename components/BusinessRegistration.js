import React, { useState, useEffect  } from 'react';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, 
    BackHandler,FlatList,ActivityIndicator, Platform
} from 'react-native';


export default class BusinessRegistration extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});

        this.state ={
            institutionIDNumber: '',
            institutionName: '',
            institutionEmail: '',
            institutionContact: '',
            institutionCountry: '',
            accountManager: '',
            userName: '',
            password: '',
            confirmPassword: ' ',
            onContinueForm: false,

              } 
    };
    navigate = this.props.navigation

    componentDidMount(){
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
     setNameOfInstitution = (text)=>{
        this.setState({
            institutionName: text,
        });
    } 
    setIDOfInstitution = (text)=>{
       this.setState({
           institutionIDNumber: text,
       })
    } 
    setEmailOfInstitution = (text)=>{
        this.setState({
            institutionEmail: text,
        });
    } 
    setContactOfaInstitution = (text)=>{
        this.setState({
            institutionContact: text,
        });
    } 
    
    setCountryName= (text) => {
    this.setState({
        institutionCountry: text,
    })
    }
    
    setUserNameOfInstitution= (text) => {
      this.setState({
          userName: text,
      })
    }
    setAccountManager = (text) => {
        this.setState({
            accountManager: text,
        })
      }
    setPasswordOfInstitution= (text) => {
        this.setState({
          password: text,  
        })
    }
    setUserConfirmPassword= (text) => {
        this.setState({
            confirmPassword:text
        })
    }

    onContinueForm = () =>{
        //set the onSubmit state to true
        this.setState({
            onContinueForm: true,
        })
        navigation.navigate('BusinessRegContinuation');
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
             <StatusBar barStyle="light-content" backgroundColor="#174060"/>
                    <View style={{flex:0.45, backgroundColor: '#1D5179'}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                onPress={()=> navigate('Home')}>
                                <ArrowBack
                                    name={'arrow-back-outline'}
                                    size={23}
                                    color="white"
                                    style={{margin:0, alignContent: 'center', marginTop: 15, padding:10}}
                                    
                                />
                            </TouchableOpacity>
                            
                            <Text style={{fontFamily:'roboto',
                                fontSize:35, 
                                marginTop: 15,
                                marginLeft: 15,
                                marginRight: 15,
                                fontWeight:'bold', 
                                color: 'white', alignSelf: 'center'}}>
                                ELECTION WATCH
                            </Text> 
                        </View>
                        
                           
                        <Text style={{fontFamily:'roboto',
                        fontSize:24,
                         fontWeight:'bold', 
                         color: 'white', alignSelf: 'center', margin:5,}}>
                             Sign up
                        </Text>
                    </View>
    
                    <View style={styles.contentContainer}>
                    <View style={{marginTop: 45,marginBottom: 0}}>
                     <View> 
                            <TextInput 
                                style={styles.textInputBoxStyle}
                                onChangeText={(text) => 
                                this.setNameOfInstitution(text)
                                }
                                value={''}
                                multiline={false}
                                placeholder={' name of Institution'}
                                enablesReturnKeyAutomatically={true}
                            > 
                            </TextInput>
                        </View>
                        <View>
                            <TextInput 
                                style={styles.textInputBoxStyle}
                                onChangeText={(text) => 
                                    this.setIDOfInstitution(text)
                                }
                                value={''}
                                multiline={false}
                                placeholder={'  Institution  ID number'}
                                enablesReturnKeyAutomatically={true}
                            > 
                            </TextInput>
                        </View>
                        <View>
                            <TextInput 
                                style={styles.textInputBoxStyle}
                                onChangeText={(text) => 
                                    this.setEmailOfInstitution(text)
                                }
                                value={''}
                                multiline={false}
                                placeholder={'  Email '}
                                enablesReturnKeyAutomatically={true}
                                
                            > 
                            </TextInput>
                        </View>
                        
                        <View >
                            <TextInput 
                                style={styles.textInputBoxStyle}
                                onChangeText={(text) => 
                                 this.setContactOfaInstitution(text)
                                }
                                value={''}
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
                                 this.setAccountManager(text)
                                }
                                value={''}
                                multiline={false}
                                placeholder={'  Account Manager'}
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
                                value={''}
                                multiline={false}
                                placeholder={'  Country'}
                                enablesReturnKeyAutomatically={true}
                            > 
                            </TextInput>
                        </View>
                       
                      
                        <View>
                            <TouchableOpacity style={styles.submitButton}
                                onPress={()=> this.props.navigation.navigate('BusinessRegContinuation')}>
                                <Text style={{alignSelf:'center', color:'white'}}>
                                    continue
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
    },
    submitButton:{
        width: 300,
        height: 40,
        backgroundColor: '#1D5179',
        justifyContent: 'center',
        borderRadius: 100,  
    },
})