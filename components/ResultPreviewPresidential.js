import React, { useState, Fragment } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform, Dimensions, ScrollView,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import AlertIcon from 'react-native-vector-icons/Ionicons';
import ArrowDown from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-community/picker';
import RNPicker from "rn-modal-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PresidentialComponent from './PresidentialComponent';
import ParliamentaryComponent from './ParliamentaryComponent';
import axios from 'axios';
import {APIKEY, TOKEN_URL, POLLING_STATION} from './ConstantUrls';
import AsyncStorage from '@react-native-community/async-storage';
import { set, Value } from 'react-native-reanimated';



export default class EnterResult extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});

        this.state ={
           
            placeHolderText: "Select polling Station",
            selectedText: null,
            result: " ",
            focusedPresButtonColor:'',
            focusedPresTextColor: 'black',
            presPressed: null,
            focusedParliaButtonColor:'',
            focusedParliaTextColor: 'black',
            parliaPressed: null,
            toggleCandidates: false,
            scannerReady: true,
            toggleParliamentaryView: false,
            generatedToken: '', 
        } 
    };   

    componentDidMount(){
        console.log('Enter Result mounted')
        this.closeViewIfNoPollSelected();  
     
        this.getData();
        //this.getPollingStations();
   
    }

    componentWillUnmount(){
        console.log("Enter Result unmounted")
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.selectedText !== this.state.selectedText){
            //console.log("selected Text : "+ this.state.selectedText)
        }
        if(prevState.result !== this.state.result){
           // console.log("selected result : "+ this.state.result)
        }
        if(prevState.presPressed !== this.state.presPressed){
            //console.log("presStatus : "+ this.state.presPressed)
        }
        if(prevState.focusedPresButtonColor!== this.state.focusedPresButtonColor){
            //console.log("presBut: "+ this.state.focusedPresButtonColor)
        }
        if(prevState.focusedPresTextColor!== this.state.focusedPresTextColor){
           // console.log("presText: "+ this.state.focusedPresTextColor)
        }
        if(prevState.parliaPressed !== this.state.parliaPressed){
            //console.log("parliaStatus : "+ this.state.parliaPressed)
        }
        if(prevState.focusedParliaButtonColor!== this.state.focusedParliaButtonColor){
            //console.log("parliaBut: "+ this.state.focusedParliaButtonColor)
        }
        if(prevState.focusedParliaTextColor!== this.state.focusedParliaTextColor){
            //console.log("parliaText: "+ this.state.focusedParliaTextColor)
        }
        if(prevState.toggleCandidates!== this.state.toggleCandidates){
            //console.log("parliaText: "+ this.state.toggleCandidates)
        }
        if(prevState.toggleParliamentaryView!== this.state.toggleParliamentaryView){
            //console.log("view: "+ this.state.toggleParliamentaryView)
        }
        if(prevState.generatedToken !== this.state.generatedToken){
           // console.log("Token: "+ this.state.generatedToken)
        }
        
    }

    setGeneratedToken = (value)=> {
        this.setState({
            generatedToken: value,
        })
        console.log('set token successful');
    }
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('homeToken')
          if(value !== null) {
            console.log(typeof value)
            this.setGeneratedToken(value)
          }
        } catch(e) {
          // error reading value
        }
        const keepToken = this.state.generatedToken
        console.log(keepToken)
        this.getPollingStations(keepToken);
      }
   
    /**this method set the state of generated  token */
    getPollingStations = (token)=> {
        
        axios({
            method: 'get',
            url: POLLING_STATION,
            headers: {
                'Authorization': 'Bearer '+token,
                'apikey': APIKEY,
            }
        }).then( function (response){
            //console.log("Just appeared ",(response.data.data.pollingstations[1]));
        }).catch(function (error){
            console.log(error);
        });
    }
    
    /**The method that set state of selected Item(polling Station)*/
    _selectedValue(index, item){
        this.setState({
            selectedText: item.name
        });
        console.log("Value selected : "+ this.state.selectedText)
    }
    /** This method sets the state result to the entered total votes */
    _enteredResult(text){
        //console.log("TEXT : "+ text)
        
        this.setState({
            result : text,
        });
    }

    /**Disable View on mount if polling station and candidate type is not selected */
    closeViewIfNoPollSelected=()=> {
        // if ((this.state.presPressed || this.state.parliaPressed == null)&& this.selectedText == null  ){
        return(
              
            <View>
              
             
            </View>
        )  
        
       
    }
    

    
    changePresButtonColor() {
       

        if(!this.state.presPressed){
            this.setState({
                toggleCandidates: false,
                parliaPressed: false,
                focusedPresButtonColor: '#1D5179',
                focusedPresTextColor: '#ffffff',
                focusedParliaButtonColor: '#C4C4C4',
                focusedParliaTextColor: 'black',
                toggleParliamentaryView: false,
                
            })
        }
    }
   
    changeParliaButtonColor() {
        
        //this.changeParliaStatus();
        if(!this.state.parliaPressed){
            this.setState({
                toggleCandidates: true,
                presPressed: false,
                focusedParliaButtonColor: '#1D5179',
                focusedParliaTextColor: '#ffffff',
                focusedPresButtonColor: '#C4C4C4',
                focusedPresTextColor: 'black',
                toggleParliamentaryView: true,
            })
        }
       
    }

 
    /**This method creates rejected ballot view */
    _rejectedBallotPapers=()=> {
    return(
        <View>
        {console.log("rejected ballot papers")}
            <View style={{flex:1,backgroundColor: '',flexDirection:'column',margin:15 }}>
                <View style={{backgroundColor:'', flexDirection:'row', flex:0.2,borderRadius:7,elevation:2}}>
                    {/* candidate Image */}
                    <Image style={{width: 40, height:40, backgroundColor:'#ffffff', borderRadius:100,marginLeft:20, alignSelf: 'center', color:'gray'}}
                    source={require('../assets/questionMarkBrown.png')}/>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row', alignSelf:'center',justifyContent:'center', marginLeft: 30, marginTop: 12}}>
                            <Text style={{fontSize:15, fontFamily:'Roboto', fontWeight:'500', alignSelf: 'center', justifyContent:'center' }}>
                                Rejected Ballots</Text>
                                {/* Party flag */}
                            {/* <Image style={{width: 40, height:40, backgroundColor:'#FFD4D4', borderRadius:100,marginLeft:10, alignSelf: 'center'}}
                            source={require('../assets/questionMark.jpg')}
                            /> */}
                        </View>
                        <TextInput 
                        style={{height:30, 
                        width: 185,
                        borderRadius: 50,
                        borderColor:'#C4C4C4',
                        borderWidth: 1, marginLeft: 10,
                        backgroundColor: '#ffffff',
                        marginBottom: 5,
                        marginLeft: 30,}}
                        keyboardAppearance={'default'}
                        keyboardType={'numeric'}
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
                        enablesReturnKeyAutomatically={true} /> 
                    </View>
                </View>  
            </View>
        </View>

    );
    }

   

    /**This method navigates to scanner */
    openScanner=()=>{
        this.props.navigation.navigate('ScannerDoc');
    }



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
                    dataSource={this.state.constituencyDataSource}
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
                <View style={{ flexDirection: 'row',backgroundColor: '',elevation: 0,}}>
                   
                        <TouchableOpacity style={{ height: 50,
                            width: Dimensions.get('window').width/2,
                            alignSelf: 'center',
                            justifyContent:'center',
                            borderColor:'gray',
                            borderWidth: 1,
                            backgroundColor:this.state.focusedPresButtonColor}}
                            onPress={()=> this.changePresButtonColor()}>
                            <Text style={{alignSelf:'center',fontWeight:'500', color:this.state.focusedPresTextColor}}>
                                PRESIDENTIAL
                            </Text>
                        </TouchableOpacity>
                   
                        <TouchableOpacity style={{ height: 50,
                            width: Dimensions.get('window').width/2,
                            backgroundColor: '#C4C4C4',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            borderColor:'gray',
                            borderRightWidth:1,
                            borderBottomWidth:1,
                            borderTopWidth:1,backgroundColor:this.state.focusedParliaButtonColor}}
                            onPress={()=> this.changeParliaButtonColor()}>
                            <Text style={{alignSelf:'center',fontWeight:'500', color:this.state.focusedParliaTextColor}}>
                                PARLIAMENTARY
                            </Text>
                        </TouchableOpacity>
                </View>
                 {/* This view displays the type of candidate (presidential or parliamentary) */}
                    {/* {this.state.toggleParliamentaryView == false? 
                        <PresidentialComponent navigation={this.props.navigation} />
                        :
                        <ParliamentaryComponent navigation={this.props.navigation}/>       
                    }   */}
                    {this.state.selectedText == null?
                    <View style={{alignItems:'center', justifyContent:'center', marginTop: '40%',
                        alignSelf:'center', borderRadius:10, backgroundColor:'white',
                        elevation:5, padding: 15}}>
                        <ArrowBack
                        name={'alert-circle'}
                        size={35}
                        color="red"
                        />
                        <Text>
                            Please select polling station code
                        </Text>
                    </View>
                    :
                        [
                          ( this.state.toggleParliamentaryView == false? 
                            <PresidentialComponent navigation={this.props.navigation} />
                            :
                            <ParliamentaryComponent navigation={this.props.navigation}/>       
                           )
                        ]
                     }
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
        borderWidth: 1,
    },
    parliamentary:{
        height: 50,
        width: Dimensions.get('window').width/2,
        backgroundColor: '#C4C4C4',
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor:'gray',
        borderRightWidth:1,
        borderBottomWidth:1,
        borderTopWidth:1,
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