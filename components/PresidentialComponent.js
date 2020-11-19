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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AsyncStorage from '@react-native-community/async-storage';


export default class PresidentialComponent extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});
        this.state ={

            inputItems: [{}],
            individualID: '',    // Id number or position of candidate on ballot paper
            result: " ",        // The total number of votes for each candidate
            partyName: '',      // The name of party(initials), used as secondary id to individualID
            presidential:[
                {
                    id: '1',
                    partyName: 'NPP',
                    imageOfCandidate: require('../assets/nana_akufo.jpg'),
                    candidateName: "Nana Akufo Addo",
                    partyImage: require('../assets/npp_flag.png'),
                    result: 0,  
                },
                {
                    id: '2',
                    partyName:'NDC',
                    imageOfCandidate: require('../assets/dramani.jpg'),
                    candidateName: "John M. Dramani",
                    partyImage: require('../assets/ndc.png'),
                    result: 0,  
                },
            
           
                {
                    id: '3',
                    partyName: 'GUM',
                    imageOfCandidate: require('../assets/christian.jpg'),
                    candidateName: "Christian K. Andrews",
                    partyImage: require('../assets/gum_flag.jpg'),
                    result: 0,  
                },
                {
                    id: '4',
                    partyName: 'CPP',
                    imageOfCandidate: require('../assets/greenstreet.jpg'),
                    candidateName: "Ivor K. Greenstreet",
                    partyImage: require('../assets/cpp_flag.jpg'),
                    result: 0,  
                },
                {
                    id: '5',
                    partyName: 'GFP',
                    imageOfCandidate: require('../assets/akua_donkor.jpg'),
                    candidateName: "Akua Donkor",
                    partyImage: require('../assets/gfp_flag.png'),
                    result: 0,  
                },
                {
                    id: '6',
                    partyName: 'GCPP',
                    imageOfCandidate: require('../assets/herbert.jpg'),
                    candidateName: "Henry H. Lartey",
                    partyImage: require('../assets/gcp_flag.jpg'),
                    result: 0,  
                },
                {
                    id: '7',
                    partyName: 'APC',
                    imageOfCandidate: require('../assets/alhassan.jpg'),
                    candidateName: "Hassan Ayariga",
                    partyImage: require('../assets/apc_flag.jpg'),
                    result: 0,  
                },
                {
                    id: '8',
                    partyName: 'Independent',
                    imageOfCandidate: require('../assets/alfred.png'),
                    candidateName: "Alfred K.W. Aseidu",
                    partyImage: require('../assets/no_flag.jpg'),
                    result: 0,  
                },
           
            ],                  // Presidential candidates contesting
            inputFocused: false,
            
        } 
    };
    
    componentDidMount(){
        console.log("presidential mounted")
        //get presidential data stored
         this.getPresidentialData();
         console.log("Item "+this.state.partyName + " result "+ this.state.result)
    }

    componentDidUpdate(prevProps, prevState){  
        if(prevState.inputFocused !== this.state.inputFocused){
            console.log(" TextInput Focus: "+ this.state.inputFocused)
        }
    }

    componentWillUnmount(){
    }
    

// ************************************************************************************
 /** setting states */ 

    /** This method sets the state (result) to the entered total votes */
    _enteredResult(text){
       
        this.setState({
            result : text,
        });
        //console.log('Result : '+ this.state.result)
    }
    /**set individualID state */
    setIndividualID(value){
        this.setState({
            individualID: value,
        })
        //console.log('id '+ this.state.individualID)
    }
    /** set partyName state*/
    setPartyName(value){
        this.setState({
            partyName: value,
        })
       // console.log('party name: '+ this.state.partyName)
    }
    /**set onFocus and onblur when textInput gain focus or loose focus */
    setInputIsOnFocus(){
        this.setState({
            inputFocused: true
        })
    }
    setInputIsOnBlur(){
        this.setState({
            inputFocused: false
        })
       
    }

    
  // ********************************************************************************************** 
   /**Functions and methods used */

    /**This method creates rejected ballot view */
    _rejectedBallotPapers=()=> {
    return(
        <View>
            <View style={{flex:1,backgroundColor: '',flexDirection:'column',margin:15 }}>
                <View style={{backgroundColor:'', flexDirection:'row', flex:0.2,borderRadius:7,elevation:2}}>
                    {/* candidate Image */}
                    <Image style={{width: 40, height:40, backgroundColor:'#ffffff', borderRadius:100,marginLeft:20, alignSelf: 'center',}}
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

    /**
     * This method saves entered result in async storage
     */
    _savePresidentialResultList = async()=> {
        //Create an object to save presidential details
        let eachPresidentialTotalVote= {};
        eachPresidentialTotalVote.id = this.state.individualID; 
        eachPresidentialTotalVote.partyName = this.state.partyName; 
        eachPresidentialTotalVote.result = this.state.result;

        // This saves data retrieved from each item in async storage
        let data = await AsyncStorage.getItem('presidentialData');
        data = data? JSON.parse(data) : [];
        data.push(eachPresidentialTotalVote);
        await AsyncStorage.setItem('presidentialData', JSON.stringify(data), () => {    
            console.log('PRESIDENTIAL DATA '+ data);
        });
    }

    /**This method retrieves presidential data from async storage */
    getPresidentialData = async () => {
       
        try {
            const data = await AsyncStorage.getItem('presidentialData')
            const value = JSON.parse(data);
            console.log('PRESIDENTIAL DATA,'+ data);
           
            if(value !== null){
                //setPicDetails(value);
            }
            console.log("PRESIDENTIAL ID & RESULT"+ value.id + " " + value.result);
        }catch(e){
            console.log('error with async getData');
        }     
       
    }

    /**This method clears presidential data  */
     removeDataStored = async () =>{
        try{
            await AsyncStorage.removeItem('presidentialData'); 
            console.log("presidential cleared")

        }catch(e){
            console.log('error')
        
     }
    }

    /** This method saves value of result after each entry */
    _saveResult=()=>{
        //check if inputting in text in done 
        if(this.state.inputFocused == false){
            this._savePresidentialResultList()
        }
        console.log("SAVE RESULT ON FOCUS FALSE")
    }

    inputtedItems=(item1, item2, index)=> {
        let itemData = {};
        itemData.result = item1;
        itemData.partyName = item2;
        itemData.index = index ;

        if(this.state.inputFocused == false){
            this.setState({
            inputItems:[...this.state.inputItems, itemData]
            })
            console.log(itemData);
        }
    }


    render()
    {
        return(
            <View style={styles.container}>
                {/* This flat list populates the list of candidates for presidential */}
             
                    <View>
                        
                    </View>  
                    <FlatList
                        ListHeaderComponent={
                            <View>
                               
                            </View>
                        }
                        data= {this.state.presidential}
                        keyExtractor={(item, index)=> index}
                        renderItem={ ({ item, index}) => (  
                            <View>
                            {/* {console.log(item.image)} */}
                                <View style={{flex:1,backgroundColor: '',flexDirection:'column',margin:15 }}>
                                    <View style={{backgroundColor:'', flexDirection:'row', flex:0.2,borderRadius:7,elevation:2}}>
                                        {/* candidate Image */}
                                        <Image style={{width: 80, height:80, backgroundColor:'#FFD4D4', borderRadius:100,marginLeft:20, alignSelf: 'center'}}
                                        source={item.imageOfCandidate}/>

                                        {/* candidate and party information */}
                                        <View style={{flexDirection:'column'}}>
                                            <View style={{flexDirection:'row', alignSelf:'center',justifyContent:'center', marginLeft: 10, marginTop: 12}}>
                                                <Text style={{fontSize:15, fontFamily:'Roboto', fontWeight:'500', alignSelf: 'center', justifyContent:'center' }}>
                                                    {item.candidateName}</Text>
                                                <Image style={{width: 40, height:40, backgroundColor:'#FFD4D4', borderRadius:100,marginLeft:10, alignSelf: 'center'}}
                                                source={item.partyImage}
                                                />
                                            </View>

                                            <TextInput 
                                                style={{height:30, 
                                                width: 185,
                                                borderRadius: 50,
                                                borderColor:'#C4C4C4',
                                                borderWidth: 1, marginLeft: 10,
                                                backgroundColor: '#ffffff',
                                                marginBottom: 5,
                                                }}
                                                keyboardAppearance={'default'}
                                                keyboardType={'numeric'}
                                                onFocus={()=>this.setInputIsOnFocus()}
                                                onBlur={()=> this.setInputIsOnBlur()}

                                                onChangeText={(text) =>{
                                                    item.result = text //change the value of result in object
                                                    // this._enteredResult(text); //  this method set new result to result state
                                                    // this.setIndividualID(item.id) // save the id of candidate to individual state
                                                    // this.setPartyName(item.partyName) // save the name of party 
                                                    // this._presidentialResultList();
                                                    //this.removeDataStored();
                                                    this.inputtedItems(text, item.partyName, item.id)
                                                    //this._saveResult();
                                                }}    
                                                textAlign={'center'}
                                                placeholder={'enter total votes'}
                                                fontSize={14}
                                                marginTop={5}
                                                padding={0}
                                                enablesReturnKeyAutomatically={true}
                                            /> 
                                            {/* {console.log('item'+ item.id + " " + " result" + item.result)} */}
                                        </View>
                                    </View>  
                                </View>
                             </View>
                            )   
                        }
                        ListFooterComponent={
                            <View>
                                 {/* Rejected Ballot Papers */}
                                 {this._rejectedBallotPapers()}
                            </View>
                        }
                    />
              
                {/* This button navigates to scanner */}
                <View style={{width: Dimensions.get('window').width, height:50, }}>
                    <TouchableOpacity style={{backgroundColor:'#1D5179', width: Dimensions.get('window').width, height:50, 
                        justifyContent:'center',alignSelf:'flex-end', margin: 0,borderRadius:0}}
                        onPress={()=>{ 
                           this.openScanner();
                        }}>
                        <Text style={{color: '#ffffff', justifyContent: 'center',
                            alignSelf:'center',  fontFamily:'Roboto', fontSize: 16}}>
                            Scan Result Slip/PinkSheet
                            {/* {console.log("NEXT PRESSED")} */}
                        </Text>
                    </TouchableOpacity>  
                </View>
                <KeyboardSpacer />   
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
    
      selectLabelTextStyle: {
        color: "#000",
        textAlign: "left",
        width: "99%",
        padding: 10,
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