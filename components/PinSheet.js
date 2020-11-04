import React, { useState, Fragment } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform, Dimensions, ScrollView,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import ArrowDown from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-community/picker';
import RNPicker from "rn-modal-picker";



export default class PinSheet extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});

        this.state ={
           
            
            
        } 
    };
    
  
    componentDidMount(){
    }
    componentWillUnmount(){
    }
    componentDidUpdate(){
    }

    
    

    render()
    {
        return(
        <View style={styles.container}>
           
           <View style={{flexDirection:'row',}}>
                <ArrowBack
                name={'arrow-back-outline'}
                size={23}
                color="black"
                style={{margin:15, marginRight:50, }}
                    onPress={()=> this.props.navigation.goBack()}
                />

                <Text style={{ color:"#6D6B6B", fontSize: 16, marginTop: 0,
                fontFamily:'roboto',fontWeight: 'bold', alignSelf: 'center'}}>
                POWERED BY SOFTMASTERS</Text>
            </View>
               <Text style={{justifyContent:'center', alignSelf:'center', marginTop: 200}}>
                   PIN SHEET SCANNED
               </Text>

                <TouchableOpacity style={{backgroundColor:'#1D5179', marginTop:300,width: 85, height:35, 
                justifyContent:'center',alignSelf:'flex-end', margin: 25,borderRadius:5}}
                onPress={()=>this.props.navigation.navigate('ResultPreview')}>
                    <Text style={{color: '#ffffff', justifyContent: 'center',
                    alignSelf:'center',  fontFamily:'Roboto', fontSize: 14}}>
                        Next
                    </Text>
                </TouchableOpacity>
               
         
            
        </View>
        );

    }
   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 0,
        backgroundColor: '#F2F2F2',
    },
    searchBarContainerStyle: {
        marginBottom: 10,
        flexDirection: "row",
        height: 40,
        shadowOpacity: 1.0,
        shadowRadius: 5,
        shadowOffset: {
          width: 1,
          height: 1
        },
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#d3d3d3",
        borderRadius: 10,
        elevation: 3,
        marginLeft: 10,
        marginRight: 10
      },
      selectLabelTextStyle: {
        color: "#000",
        textAlign: "left",
        width: "99%",
        padding: 10,
        flexDirection: "row"
      },
      dropDownImageStyle: {
        marginLeft: 10,
        width: 10,
        height: 10,
        alignSelf: "center",
     
      },
    
      pickerStyle: {
        marginLeft: 25,
        elevation:1,
        paddingRight: 25,
        marginRight: 15,
        marginBottom: 10,
        shadowOpacity: 0.2,
        shadowOffset: {
          width: 1,
          height: 1
        },
        borderWidth:0.3,
        borderColor:"gray",
        shadowRadius: 0,
        backgroundColor: "rgba(255,255,255,1)",
        
        borderRadius: 5,
        flexDirection: "row"
      },
      listTextViewStyle: {
        color: "#000",
        marginVertical: 5,
        marginLeft: 20,
        marginHorizontal: 5,
        textAlign: "left"
      },
      placeHolderTextStyle: {
        color: "gray",
        padding: 10,
        textAlign: "left",
        width: "99%",
        flexDirection: "row"
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
        height: 50,
        width: Dimensions.get('window').width/2,
        alignSelf: 'center',
        justifyContent:'center',
        borderColor:'gray',
        backgroundColor:'#C4C4C4',
    },
    parliamentary:{
        height: 50,
        width: Dimensions.get('window').width/2,
        backgroundColor: '#1D5179',
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor:'gray',
    },
    imageInBox:{
        width: 70,
        height: 70,
        justifyContent:'center',
        alignSelf: 'center',
    
    },
    partyImage:{
        width: 60,
        height: 60,
        justifyContent:'center',
        alignSelf: 'center',
    
    }
    
})