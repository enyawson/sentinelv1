import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform
} from 'react-native';


export default class VoteTally extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});

        this.state = {
            

        }
    }

componentDidMount(){

}
componentWillUnmount(){


}
getVerificationCode= (text) => {
        setVerificationCode(text);
    }

     onFormSubmit (){
        //set the onSubmit state to true
        setOnSubmit(true);
    }

    render()
    {
        return(
    
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent:'flex-end', backgroundColor: '', margin: 10, marginTop: 80,}}>
                    <Text style={{fontFamily:'roboto',
                        fontSize:24,
                        fontWeight:'700', 
                        color: 'black', alignSelf: 'center', bottom:0,}}>
                        ENTER RESULT
                    </Text>
                </View>
                <View style={{marginTop: 0, backgroundColor: '', margin:10, marginTop: 30,}}>
                    <View style={{alignSelf:'center', margin:20}}>
                        <TouchableOpacity style={styles.presidential}
                            onPress={()=> onFormSubmit()}>
                            <Text style={{alignSelf:'center', color:'gray'}}>
                                PRESIDENTIAL
                            </Text>
                        </TouchableOpacity>
                    </View> 
                
                    <View style={{alignSelf:'center', margin:20}}>
                        <TouchableOpacity style={styles.parliamentary}
                            onPress={()=> onFormSubmit()}>
                            <Text style={{alignSelf:'center', color:'gray'}}>
                                PARLIAMENTARY
                            </Text>
                        </TouchableOpacity>
                    </View>  
                </View> 

                <View style={{flex:1, marginTop: 100,backgroundColor: '',
                    margin: 10, justifyContent:'flex-end'}}>
                    <Text style={{fontFamily:'roboto',
                        fontSize:16,
                        fontWeight:'700', 
                        color: 'rgba(117, 115, 115, 0.6)', alignSelf: 'center', bottom: 10,}}>
                        POWERED BY SOFTMASTERS
                    </Text>
                </View>
            </View>
            
        
        );

    }
   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 0,
        backgroundColor: 'white'
    },
    contentContainer: {
    
    flex:1, 
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
    presidential:{
        width: 300,
        height: 40,
        justifyContent: 'center',
        borderRadius:5, 
        borderWidth: 1,
        borderColor:'#1D5179',
        backgroundColor: '#f0f0f0',


    },
    parliamentary:{
        width: 300,
        height: 40,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        borderRadius:5,  
        borderRadius:5, 
        borderWidth: 1,
        borderColor:'#1D5179'
    },
    
})