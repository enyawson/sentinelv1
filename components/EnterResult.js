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


// presidential:{
//     partyName: " ",
//     candidateName: " ",
//     result: " ",  
// },
// {
//     id: 1,
//     imageOfCandidate: ' ',
//     partyImage: '',
//     candidateName: '',
//     result: ' '

    
//   },
// parliamentary:{
//     partyName: " ",
//     candidateName: " ",
//     result: " ",  
// }

export default class EnterResult extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});

        this.state ={
            dataSource: [
                {
                  id: '1',
                  name:'Ayawso-North CC0014',
                },
                {
                  id: '2',
                  name: 'Ablekuma-North CC0674',
                },
                {
                  id: '3',
                  name: 'Doodowa-Central CC0244',
                },
                {
                  id: '4',
                  name: 'Kasao-East CC0034',
                },
                {
                  id: '5',
                  name: 'Hafo-east CC00544',
                },
                {
                  id: '6',
                  name: 'Tain CC00554',
                },
                {
                  id: '7',
                  name: 'Paga  CC00454',
                },
                {
                  id: '8',
                  name: 'Boko CC0894',
                },
                {
                    id: '9',
                    name: 'Nima-Central CC0017', 
                }, {
                    id: '10',
                    name: 'Boko CC0894',
                  },
                  {
                      id: '11',
                      name: 'Nima-Central CC0017', 
                  },
                  {
                    id: '12',
                    name: 'Boko CC0894',
                  },
                  {
                      id: '13',
                      name: 'Nima-Central CC0017', 
                  },{
                    id: '14',
                    name: 'Nima-Central CC0017', 
                },
                {
                  id: '15',
                  name: 'Boko CC0894',
                },
                {
                    id: '16',
                    name: 'Nima-Central CC0017', 
                },
                {
                    id: '17',
                    name: 'Boko CC0894',
                  },
                  {
                      id: '18',
                      name: 'Nima-Central CC0017', 
                  }, {
                      id: '19',
                      name: 'Boko CC0894',
                    },
                
              ],
            placeHolderText: "Select polling Station",
            selectedText: " ",
            result: " ",
           // selectedPollStation: '',
            selectedItems:[],
            presidential:[
            {
                id: 1,
                candidateImage: '',
                candidateName: " ",
                partyImage: " ",
                partyName: " ",
                result: 0,  
            },
            {
                id: 1,
                imageOfCandidate: ' ',
                partyImage: '',
                candidateName: '',
                result: ' ' 
              },
           
            ]
            
        } 
    };
    
    componentDidMount(){
        console.log("enter result mounted")
    }
    componentWillUnmount(){
    }
    componentDidUpdate(prevProps, prevState){
    if(prevState.selectedText !== this.state.selectedText){
        console.log("selected Text : "+ this.state.selectedText)
    }
    if(prevState.result !== this.state.result){
        console.log("selected result : "+ this.state.result)
    }
    
}
    /**The method that set state of selected Item */
    _selectedValue(index, item){
        this.setState({
            selectedText: item.name
        });
        //console.log("Value selected : "+ this.state.selectedText)
    }
    /** this method sets the state result to the entered total votes */
    _enteredResult(text){
        console.log("TEXT : "+ text)
        
        this.setState({
            result : text,
        });
    }



    // getVerificationCode= (text) => {
    //     setVerificationCode(text);
    // }

    //  onFormSubmit (){
    //     //set the onSubmit state to true
    //     setOnSubmit(true);
    // }
    
    
   

    render()
    {
        return(
        <View style={styles.container}>
            <View style={{backgroundColor: 'white',borderBottomLeftRadius: 5, borderBottomRightRadius:5,elevation:10}}>
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
                <RNPicker
                    dataSource={this.state.dataSource}
                    dummyDataSource={this.state.dataSource}
                    defaultValue={false}
                    pickerTitle ={"Polling Stations"}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder = {"Search....."}
                    showPickerTitle ={true}
                    searchBarContainerStyle={this.props.searchBarContainerStyle}
                    pickerStyle={styles.pickerStyle}
                    pickerItemTextStyle={styles.listTextViewStyle}
                    selectedLabel={this.state.selectedText}
                    placeHolderLabel={this.state.placeHolderText}
                    selectLabelTextStyle={styles.selectLabelTextStyle}
                    placeHolderTextStyle={styles.placeHolderTextStyle}
                    dropDownImageStyle={styles.dropDownImageStyle}
                    dropDownImage= {require("../assets/ic_drop_down.png") }
                    selectedValue={(index, item) => this._selectedValue(index.toString(), item)}
                />
              

            </View>
       
                    {/* presidential and parliamentary result  */}
                <View style={{flex: 0.1, flexDirection: 'row',backgroundColor: '',elevation: 0,}}>
                   
                        <TouchableOpacity style={styles.presidential}>
                            <Text style={{alignSelf:'center',fontWeight:'500', color:'#1D5179'}}>
                                PRESIDENTIAL
                            </Text>
                        </TouchableOpacity>
                   
                        <TouchableOpacity style={styles.parliamentary}>
                            <Text style={{alignSelf:'center',fontWeight:'500', color:'#FFFFFF'}}>
                                PARLIAMENTARY
                            </Text>
                        </TouchableOpacity>
                </View>
               
                <ScrollView style={{margin: 5,}}>
                    <View style={{flex:1,backgroundColor: '',flexDirection:'column',margin:15 }}>
                        <View style={{backgroundColor:'', flexDirection:'row', flex:0.2,borderRadius:7,elevation:2}}>
                            {/* candidate Image */}
                            <Image style={{width: 80, height:80, backgroundColor:'#FFD4D4', borderRadius:100,marginLeft:20, alignSelf: 'center'}}
                                source={require('../assets/dramani.jpg')}
                            />
                            <View style={{flexDirection:'column'}}>
                                <View style={{flexDirection:'row', alignSelf:'center',justifyContent:'center', marginLeft: 10, marginTop: 12}}>
                                    <Text style={{fontSize:15, fontFamily:'Roboto', fontWeight:'500', alignSelf: 'center', justifyContent:'center' }}>John M. Dramani</Text>
                                    <Image style={{width: 40, height:40, backgroundColor:'#FFD4D4', borderRadius:100,marginLeft:10, alignSelf: 'center'}}
                                        source={require('../assets/ndc.png')}
                                    />
                                </View>
                                <TextInput 
                                style={{height:30, 
                                width: 185,
                                borderRadius: 50,
                                borderColor:'#C4C4C4',
                                borderWidth: 1, marginLeft: 10,
                                backgroundColor: 'rgba(196, 196, 196, 0.3)',
                                marginBottom: 5,
                            }}
                                onChangeText={(text) => {
                                    this._enteredResult(text);
                                    // console.log('votes entered stored in state');
                                    //console.log(this.state.selectedText + " : " + this.state.result);
                                    
                                }}
                                
                                textAlign={'center'}
                                placeholder={'enter total votes'}
                                fontSize={14}
                                marginTop={5}
                                padding={0}
                                enablesReturnKeyAutomatically={true}
                            > 
                            </TextInput>

                            </View>
            
                        
                        </View>  
                        

                    </View>
                       
                </ScrollView>
                
                <TouchableOpacity style={{backgroundColor:'#1D5179', width: 85, height:35, 
                justifyContent:'center',alignSelf:'flex-end', margin: 25,borderRadius:5}}
                onPress={()=> this.props.navigation.navigate('PinSheet')}>
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