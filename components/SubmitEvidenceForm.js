import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function EvidenceSubmissionForm ({route, navigation,navigation:{setParams}}){

    const [nameState,setNameState] = useState('');
    const [emailState,setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [onSubmit, setOnSubmit] = useState(false);

    useEffect(() => {
    
        return () => {
            
        }
    }, [])

    const setPersonsName = (text)=>{
        setNameState(text);
    } 
    const setPersonsEmail = (text)=>{
        setEmail(text);
    } 
    const setPersonsContact = (text)=>{
        setContact(text);
    } 

    function onFormSubmit (){
        //set the onSubmit state to true
        setOnSubmit(true);
        navigation.navigate('Home');
    }

    return(
    
            <View style={styles.container}>
                <View style={{ 
                 alignSelf: 'center', alignContent:'center'}}>
                    <Text style={styles.text}>
                        Name:
                    </Text>
                        <TextInput 
                            style={styles.textInputBoxStyle}
                            onChangeText={(text) => 
                            setPersonsName(text)
                            }
                            value={''}
                            multiline={false}
                            enablesReturnKeyAutomatically={true}
                        > 
                        </TextInput>
                </View>

                <View >
                    <Text style={styles.text}>
                        Telephone:
                    </Text>
                        <TextInput 
                            style={styles.textInputBoxStyle}
                            onChangeText={(text) => 
                            setPersonsContact(text)
                            }
                            value={nameState}
                            multiline={false}
                            enablesReturnKeyAutomatically={true}
                        > 
                        </TextInput>
                </View>
                <View>
                        <Text style={styles.text}>
                            Email:
                        </Text>
                            <TextInput 
                                style={styles.textInputBoxStyle}
                                onChangeText={(text) => 
                                setPersonsEmail(text)
                                }
                                value={nameState}
                                multiline={false}
                                enablesReturnKeyAutomatically={true}
                            > 
                            </TextInput>
                    </View>
                <View >
                    <TouchableOpacity style={styles.submitButton}
                        onPress={()=> onFormSubmit()}>
                        <Text style={{alignSelf:'center', color:'white'}}>
                            submit
                        </Text>
                    </TouchableOpacity>
                </View>
                
                
                
                    
            </View>
            
    
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        marginBottom: 50,
        backgroundColor:'#f0f0f0',
        flexDirection: 'column',
        alignSelf: 'center', 
        alignContent:'center'
    },

    text: {
        fontFamily: 'roboto',
        fontSize: 16,
        fontWeight: 'bold',
        
    },
    textInputBoxStyle:{
        height: 45, 
        width: 270,
        borderRadius: 8,
        borderColor:'#C4C4C4',
        borderWidth: 1, 
        marginLeft: 5,
        marginTop:5,
        marginBottom: 30
    },
    submitButton:{
        width: 270,
        height: 45,
        backgroundColor: '#1D5179',
        justifyContent: 'center',
        borderRadius: 8,
        marginLeft: 5,
        marginTop: 5,
    },
})