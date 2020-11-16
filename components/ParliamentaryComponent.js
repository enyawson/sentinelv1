import React from 'react';

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


export default class ParliamentaryComponent extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});
        this.state ={
            result: " ",
            parliamentary: [
                {
                    id: 1,
                    imageOfCandidate: require('../assets/avatar.png'),
                    candidateName: "Name of Candidate",
                    partyImage: require('../assets/no_flag.jpg'),
                    result: 0,  
                },
                {
                    id: 2,
                    imageOfCandidate: require('../assets/avatar.png'),
                    candidateName: "Name of Candidate",
                    partyImage: require('../assets/no_flag.jpg'),
                    result: 0,  
                },
                {
                    id: 3,
                    imageOfCandidate: require('../assets/avatar.png'),
                    candidateName: "Name of Candidate",
                    partyImage: require('../assets/no_flag.jpg'),
                    result: 0,  
                },
                {
                    id: 4,
                    imageOfCandidate: require('../assets/avatar.png'),
                    candidateName: "Name of Candidate",
                    partyImage: require('../assets/no_flag.jpg'),
                    result: 0,  
                },
                {
                    id: 5,
                    imageOfCandidate: require('../assets/avatar.png'),
                    candidateName: "Name of Candidate",
                    partyImage: require('../assets/no_flag.jpg'),
                    result: 0,  
                },
                {
                    id: 6,
                    imageOfCandidate: require('../assets/avatar.png'),
                    candidateName: "Name of Candidate",
                    partyImage: require('../assets/no_flag.jpg'),
                    result: 0,  
                },
                {
                    id: 7,
                    imageOfCandidate: require('../assets/avatar.png'),
                    candidateName: "Name of Candidate",
                    partyImage: require('../assets/no_flag.jpg'),
                    result: 0,  
                },
            ],
        } 
    };
    
    componentDidMount(){
        console.log("parliamentary mounted")
    }
    componentWillUnmount(){
    }
    componentDidUpdate(prevProps, prevState){   
    }



    /** This method sets the state (result) to the entered total votes */
    _enteredResult(text){
        console.log("TEXT : "+ text)
        
        this.setState({
            result : text,
        });
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
                {/* This flat list populates the list of candidates for presidential */}
             
              
                    <FlatList
                        data= {this.state.parliamentary}
                        keyExtractor={(item, index)=> index}
                        renderItem={ ({ item}) => (  
                            <View>
                            {console.log(item.image)}
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
                <View style={{width: Dimensions.get('window').width, height:42,backgroundColor: '', }}>
                    <TouchableOpacity style={{backgroundColor:'#1D5179', width: Dimensions.get('window').width, height:42, 
                        justifyContent:'center',alignSelf:'flex-end', margin: 0,borderRadius:0}}
                        onPress={()=>{ 
                            this.openScanner()
                        }}>
                        <Text style={{color: '#ffffff', justifyContent: 'center',
                            alignSelf:'center',  fontFamily:'Roboto', fontSize: 16}}>
                            Scan Result Slip/PinkSheet
                            {console.log("NEXT PRESSED")}
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