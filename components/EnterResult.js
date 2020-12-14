import React, { useState, Fragment } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform, Dimensions, ScrollView, ListItem, Alert
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
import {APIKEY, TOKEN_URL, POLLING_STATION, POLLING_SEARCH} from '../components/ConstantUrls';
import AsyncStorage from '@react-native-community/async-storage';
import { set, Value } from 'react-native-reanimated';
import SQLite from 'react-native-sqlite-storage';
import { Button } from '@material-ui/core';

   // let db = SQLite.openDatabase({name : "pollingStation.db", createFromLocation : "data_electorral.sqlite"});

let db

export default class EnterResult extends React.Component{
    constructor(props){
        super(props);
  

        this.state ={
            constituencyDataSource:'',
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
            cdata : [],
            notReady: 'true',

        }             

    db = SQLite.openDatabase({
            name:'electionsdb.sqlite',
            createFromLocation:1,
        },
        '',
        this.dbFailure,
        )
    }; 
    
    dbFailure(err){
     console.log(err)
    }
   
    populateDataSource(value){
        this.setState({
            constituencyDataSource: value,
        })
    }

    dataForPicker(){
        
        let temp = [];
        db.transaction(function (txn){
        txn.executeSql(
            "select pollingcode, pollingname from electoralareas limit 0,5",
            [],
            function(tx, res){
              
                for (let i = 0; i < res.rows.length; ++i){
                    temp.push(res.rows.item(i));  
                     this.setState({cdata:temp})
                } 
                console.log('let temp', this.state.cdata)    
               
            }

           
        )
        console.log(this.state.cdata)
    });
 

}
    componentDidMount(){
        console.log('Enter Result mounted')
        this.closeViewIfNoPollSelected();
  
        this.getData();
        this.dataForPicker()
        //this.getPollingStations();

       // this.sqliteData()
       
    
    }
    // pickerValues(temp){
    //     return(
    //         <RNPicker
    //                 dataSource={temp}
    //                 dummyDataSource={temp}
    //                 defaultValue={false}
    //                 pickerTitle ={"Polling Stations"}
    //                 showSearchBar={true}
    //                 disablePicker={false}
    //                 changeAnimation={"none"}
    //                 searchBarPlaceHolder = {"Search....."}
    //                 showPickerTitle ={true}
    //                 searchBarContainerStyle={this.props.searchBarContainerStyle}
    //                 pickerStyle={styles.pickerStyle}
    //                 pickerItemTextStyle={styles.listTextViewStyle}
    //                 selectedLabel={this.state.selectedText}
    //                 placeHolderLabel={this.state.placeHolderText}
    //                 selectLabelTextStyle={styles.selectLabelTextStyle}
    //                 placeHolderTextStyle={styles.placeHolderTextStyle}
    //                 dropDownImageStyle={styles.dropDownImageStyle}
    //                 dropDownImage= {require("../assets/ic_drop_down.png") }
    //                 selectedValue={(index, item) => this._selectedValue(index, item)}
                   
    //             />
    //     )
    // }

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
        //console.log('set token successful');
    }


    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('homeToken')
          if(value !== null) {
           //console.log( value)
            this.setGeneratedToken(value)
          }
        } catch(e) {
          // error reading value
        }
        
       
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
        //console.log("Value selected : "+ this.state.selectedText)
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
                {this.state.toggleParliamentaryView == false? 
                    <PresidentialComponent navigation={this.props.navigation} />
                    :
                    <ParliamentaryComponent navigation={this.props.navigation}/>
                }  
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

    // //remove scanned images
    //  removeDataStored = async () =>{
    //     try{
    //         await AsyncStorage.removeItem('scannedImages');
    //         //await AsyncStorage.removeItem('cropScannedImages');
    
    //     }catch(e){
    //         console.log('error')
    //     }
    // }


    /**This method navigates to scanner */
    openScanner=()=>{
        this.props.navigation.navigate('ScannerDoc');
    }

    _selectedValue(index, item){
        this.setState({
            selectedText: item.name
        });
    }

    _searchPollingStation=(text)=> {
        const self =  this;
        let formData = new FormData();
        formData.append('pollingname',text);

        let config ={
            method: 'post',
            url: POLLING_SEARCH,
            headers: {
                'apikey': APIKEY,
                'Authorization': 'Bearer '+ this.state.generatedToken,
                'Content-Type': 'application/json',
            },
            data : formData
        };
        axios(config)
        .then(function(response){
            if(response.error||response.data.length<=0)return
            //console.log(JSON.stringify(response.data));
            self.setState({constituencyDataSource:response.data.data.constituencies})
            //console.log(JSON.stringify(response.data.data.constituencies));
        })
        .catch(function(error){
            console.log(error);
        });
    }

    renderPicker(temp){
        return(
            <RNPicker
                    dataSource={temp}
                    dummyDataSource={temp}
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
                    selectedValue={(index, item) => this._selectedValue(index, item)}
                   
                />
        )
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
                    onPress={()=> this.props.navigation.popToTop()}
                    />

                    <Text style={{ color:"#6D6B6B", fontSize: 16, marginTop: 0,
                    fontFamily:'roboto',fontWeight: 'bold', alignSelf: 'center'}}>
                    POWERED BY SOFTMASTERS</Text>
                </View>
                {this.dataForPicker()}
                {/*********************PICKER************************* */}
                
                
                    {/* <TextInput 
                        style={{height:30, 
                        width: '90%',
                        borderRadius: 10,
                        borderColor:'#C4C4C4',
                        borderWidth: 1,
                        alignSelf:'center',
                        backgroundColor: '#ffffff',
                        marginBottom: 5,
                        }}
                        keyboardAppearance={'default'}
                        keyboardType={'default'}
                        onChangeText={this._searchPollingStation.bind(this)}  
                        textAlign={'center'}
                        placeholder={'enter polling station number or name'}
                        fontSize={14}
                        marginTop={5}
                        padding={0}
                        enablesReturnKeyAutomatically={true}
                    />  */}
                    {/* {this.state.constituencyDataSource.map(data=>{
                        return <ListItem key={data.pollingcode}>
                            <View></View>
                        </ListItem>
                    })} */}
                    {/* <View Style={{height: '20%',width: '20%',backgroundColor:'yellow'}}>
                        <FlatList
                                data= {this.state.constituencyDataSource}
                                keyExtractor={(item, index)=> index}
                                renderItem={ ({ item, index}) =>
                                <View >
                                    <Text>{item.pollingname}</Text>
                                </View>
                            }
                        />
                    </View> */}
                   
                
              
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
                   
                    {/* <View style={{alignItems:'center', justifyContent:'center', marginTop: '40%',
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
                    : */}
                    
                        
                           {this.state.toggleParliamentaryView == false? 
                            <PresidentialComponent navigation={this.props.navigation} />
                            :
                            <ParliamentaryComponent navigation={this.props.navigation}/>       
                           
                        
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