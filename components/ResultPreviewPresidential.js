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
            scannerReady: true,
           
            //state from presidential component
            itemData: {
                result : null,
                partyName: null,
                index: null,
            },
            resultAfterEachEntry: [],
            onTextInputFocused: false,
           
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
        console.log('Enter Result preview mounted')
        this.getPresidentialData();
    }

    componentWillUnmount(){
        console.log("Result preview unmounted")
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.selectedText !== this.state.selectedText){
            //console.log("selected Text : "+ this.state.selectedText)
        }
        if(prevState.result !== this.state.result){
           // console.log("selected result : "+ this.state.result)
        }
      
        if(prevState.toggleParliamentaryView!== this.state.toggleParliamentaryView){
            //console.log("view: "+ this.state.toggleParliamentaryView)
        }
       
        
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

   
   
    /**This method retrieves presidential data from async storage */
    getPresidentialData = async () => {
        let presidentialCandidate = this.state.presidential;
        //console.log(presidentialCandidate);
       
        try {
            const data = await AsyncStorage.getItem('presidentialData')
            const value = JSON.parse(data);
            //console.log(typeof value);
           // console.log("index",value[0].index)
           
            if(value !== null){
               // set the state of the presidential data result to previously not submitted result,
                value.forEach(function(item,id){
                    let currentId = id
                    let currentResult = item.result
                    //loop through values to compare
                    presidentialCandidate.forEach(function(item, id){
                        if (currentId === id){
                            item.result = currentResult
                        }
                    })
                })
               // console.log(presidentialCandidate)
                //set the state of presidential to current state
                this.setState({
                    presidential: presidentialCandidate,
                })
              //  console.log(this.state.presidential)
            }
           
            }catch(e){
            //console.log('error with async getData');
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
        this.props.navigation.navigate('CameraScanner');
    }



    render()
    {
        return(
        <View style={styles.container}>
                       <StatusBar barStyle="light-content" backgroundColor="#174060"/>
            <View />
            
            <View style={{width:Dimensions.get('window').width, height: "10%",
                backgroundColor:'#1D5179', elevation: 5, flexDirection: 'row',}}>
                <TouchableOpacity
                    onPress={()=> this.props.navigation.goBack()}>
                    <ArrowBack
                    name={'arrow-back-outline'}
                    size={23}
                    color="white"
                    style={{margin:15, alignContent: 'center'}}/>  
                </TouchableOpacity>
                <View style={{flexDirection: 'column', justifyContent:'center', alignSelf:'center'}}>
                        <Text style={{alignSelf:'center',marginLeft: '15%',marginTop: 10, fontFamily:'roboto',fontSize:18,color:'white', }}>
                                PREVIEW RESULT
                        </Text>
                  
                        <Text style={{fontSize:14,color:'white',  marginTop:5,marginLeft: '30%', }}>
                                Polling Station Name 
                        </Text>
                 
                </View>
            </View>
                {/* presidential result  */}
                <View style={{flex: 1,
                flexDirection: 'column',
                marginTop: 0,
                backgroundColor: '#F2F2F2',}} >
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
                                                defaultValue={item.result}
                                                editable={false}
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
                                                onChangeText={(text) =>{
                                                    item.result = text //change the value of result in object
                                                    // this._enteredResult(text); //  this method set new result to result state
                                                    // this.setIndividualID(item.id) // save the id of candidate to individual state
                                                    // this.setPartyName(item.partyName) // save the name of party 
                                                    // this._presidentialResultList();
                                                    //this.removeDataStored();
                                                    this.setState({
                                                        itemData:{
                                                            result: item.result,
                                                            partyName: item.partyName,
                                                            index: index  
                                                        }
                                                    });
                                                    //this._saveResult();
                                                }}  
                                                
                                                textAlign={'center'}
                                                placeholder={'enter total votes'}
                                                fontSize={14}
                                                marginTop={5}
                                                padding={0}
                                                enablesReturnKeyAutomatically={true}
                                            /> 

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
                             Scan Result Slip/ Pinksheet
                            {/* {console.log("NEXT PRESSED")} */}
                        </Text>
                    </TouchableOpacity>  
                </View>
                 
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