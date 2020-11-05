import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform
} from 'react-native';


export default function SignUp ({route, navigation,navigation:{setParams}}){

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [emailState,setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [countrySelected, setCountrySelected] = useState("");
    const [affiliate, setAffiliate] = useState("");
    const [affiliateCode, setAffiliateCode] = useState("");
    const [onContinue, setOnContinue] = useState(false);

    useEffect(() => {
            console.log('SignUp mounted');
        return () => {
            
        }
    }, [])

    const setPersonsFirstName = (text)=>{
        setFirstName(text);
    } 
    const setPersonsEmail = (text)=>{
        setEmail(text);
    } 
    const setPersonsContact = (text)=>{
        setContact(text);
    } 
    const setPersonsLast = (text)=>{
        setLastName(text);
    } 
    const setCountryName= (text) => {
        setSelectedCountry(text);
    }
    const setNameAffiliate = (text) => {
        setAffiliate(text);
    }
    const setCodeOfAffiliate = (text) => {
        setAffiliateCode(text);
    }

    const  onContinueForm = () =>{
        //set the onSubmit state to true
        setOnContinue(true);
        navigation.navigate('VerificationCodeForm');
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
                         Sign up
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                <View style={{marginTop: 45,marginBottom: 0}}>
                 <View> 
                        <TextInput 
                            style={styles.textInputBoxStyle}
                            onChangeText={(text) => 
                            setFirstName(text)
                            }
                            value={''}
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
                            setLastName(text)
                            }
                            value={''}
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
                            setPersonsEmail(text)
                            }
                            value={''}
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
                            setPersonsContact(text)
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
                            setSelectedCountry(text)
                            }
                            value={''}
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
                            setAffiliate(text)
                            }
                            value={''}
                            multiline={false}
                            placeholder={'  Affiliate'}
                            enablesReturnKeyAutomatically={true}
                        > 
                        </TextInput>
                    </View>
                    <View>
                        <TextInput 
                            style={styles.textInputBoxStyle}
                            onChangeText={(text) => 
                            setAffiliateCode(text)
                            }
                            value={''}
                            multiline={false}
                            placeholder={'  Affiliate Code'}
                            enablesReturnKeyAutomatically={true} > 
                        </TextInput>
                    </View>
                
                    <View>
                        <TouchableOpacity style={styles.submitButton}
                            onPress={()=> onContinueForm()}>
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