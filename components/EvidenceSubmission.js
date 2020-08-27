import React, { useState } from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    Image, 
    TouchableOpacity,
    StatusBar,
    TextInput,
    Pressable,
    Button,
   
} from 'react-native';
import globalStyle from '../components_styles/globalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { Picker } from '@react-native-community/picker';
import Microphone from 'react-native-vector-icons/FontAwesome5';
import  Add from 'react-native-vector-icons/Ionicons';
import  Trash from 'react-native-vector-icons/Ionicons';





// number of items per row
const itemsPerRow = 4;

export default function EvidenceSubmission ({route, navigation}){

    const [state, setState]= useState({
        
        selectedIncidence: 'Please select incidence',
    });
    const [text, onChangeText] = useState({
        textInputted: '',
    })
    //state to hold transferred image
    const[imgState, setImageState] = useState({
        retrievedImage: null,
    });
    

    //navigating value of image from photoLogic to this page
    const { transferredImage }= route.params
    const { getLatitudeTransferred } = route.params
    const { getLongitudeTransferred } = route.params
    const { getTimeTransferred } = route.params
    const { getDateTransferred } = route.params

    
    console.log('TRANSFERRED:' + transferredImage )    

    return(
        <SafeAreaView style= {globalStyle.MainContainer}>
         <StatusBar barStyle="light-content" backgroundColor="#174060"/>
           {/* <TouchableOpacity style={styles.trashButton}>
                    <Trash
                       name={'trash-outline'}
                       size={30}
                       color="black"  
                    />   
            </TouchableOpacity> */}
         
            <View flexDirection='column' flex={1} marginTop={30} 
            marginRight ={5}
            marginLeft ={5}
            borderWidth={1}
            borderRadius={3}
            borderColor='#7E7E7E'>
                <View
                style={{width: 65,
                height: 85,
                borderRadius:3, 
                borderWidth: 0.4,
                borderColor:'#DCDCDC',
                margin: 5,
                shadowOpacity:0.3,
                shadowColor:"#000",
                backgroundColor:'#FFFFF0'}}>
                    <View styles={[styles.contentContainer, styles.imageContainer]} >
                        <ScrollView 
                        horizontal={false}
                        pagingEnabled={false}
                        showsHorizontalScrollIndicator={true}>
                            <View>
                                <Image style={{width: 65, height: 65, borderTopRightRadius:3,borderTopLeftRadius:3}}
                                source= { {uri: `data:image/jpeg;base64, ${transferredImage}`}}/>
                                <View style={{flexDirection:'row',justifyContent:'center'}}>
                                    <Text style={styles.text}>{getLatitudeTransferred}</Text>
                                    <Text style={styles.text}>{getLongitudeTransferred}</Text>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'center'}}>
                                    <Text style={styles.text}>{getDateTransferred},</Text>
                                    <Text style={styles.text}> {getTimeTransferred}</Text>
                                </View>
                            </View> 
                        </ScrollView>
                    </View> 
                </View>
            </View>
            <TouchableOpacity style={styles.addPhotoButton}>
                    <Add
                       name={'add'}
                       size={30}
                       color="white"  
                    />   
            </TouchableOpacity>

            <View style={{justifyContent: 'center', margin:5 ,flex: 1.2}}>
                <View style={{borderWidth: 1, 
                    borderColor:'#C4C4C4',
                    borderRadius:5,
                    width: 270, 
                    marginLeft: 5,
                    marginBottom: 0,
                    marginTop: 15}}>
                    <Picker
                        selectedValue ={state.selectedIncidence}
                        style={{height:45, width: 270, 
                        fontFamily:'roboto', 
                        fontStyle:'normal',
                        fontWeight:'normal'}}
                        onValueChange={(itemValue, itemIndex) =>
                            setState({selectedIncidence: itemValue})
                        }
                    >
                        
                    <Picker.Item label="Non-Compliance" value="Gun Shot"/>
                    <Picker.Item label="Logistics" value="Stolen ballot boxes"/>
                    <Picker.Item label="Harassment" value="Misunderstanding leading"/>
                    <Picker.Item label="Interference" value="Faulty"/>
                    <Picker.Item label="Violence" value="Power"/>
                    <Picker.Item label="Delays" value="fight"/>
                    <Picker.Item label="Confusion" value="Late"/>
                    <Picker.Item label="Chaos" value="controlling"/>
                    <Picker.Item label="Power Failure" value="Standard"/>
                    </Picker>
                </View>
                <View marginBottom={0} marginLeft={5} marginTop={15}>
                    <Text style={styles.textStyle}>
                        Description
                    </Text>
                </View>
                <View style={{flexDirection:'row'}} >
                    <View>
                        <TextInput 
                            style={{height: 70, 
                            width: 270,
                            borderRadius: 8,
                            borderColor:'#C4C4C4',
                            borderWidth: 1, marginLeft: 5}}
                            onChangeText={(text) => setState({text})}
                            value={state.text}
                            multiline={true}
                            enablesReturnKeyAutomatically={true}>
                        </TextInput>
                    </View>
                        <TouchableOpacity style={styles.microphoneButton}>
                            <Microphone name="microphone" 
                            size={21} 
                            color='white'
                            /> 
                        </TouchableOpacity>
                </View>
                <View marginBottom={0} marginLeft={0} marginTop={15}  marginBottom={15} >
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{margin:10,marginRight:20,
                                fontFamily:'roboto', fontSize: 14,
                                fontWeight:'bold', 
                                }}>
                            Submit as
                        </Text>
                        <View style={styles.radioCircumference}>
                            <TouchableOpacity style={styles.radioButton}></TouchableOpacity>
                        </View>
                        <Text style={{marginLeft: 5, marginRight: 0, marginTop: 10}}>anonymous</Text>  
                        <Text style={{marginLeft: 10, marginRight: 10, marginTop: 10, fontWeight:'bold'}}> or </Text>
                        <View style={styles.radioCircumference}>
                            <TouchableOpacity style={styles.radioButton}></TouchableOpacity>
                        </View>
                        <Text style={{marginTop: 10,marginLeft: 5, marginRight: 0}}>Sign In</Text>                   
                    </View>
                </View>
            
                <TouchableOpacity
                    style={styles.button}>
                    <Text style={{color:'white', 
                        alignSelf:'center',
                        fontSize: 18,
                        }}>
                        Next
                    </Text>
                </TouchableOpacity>   
            </View>
           
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    imageContainer: {
        flexDirection: 'row',
        
    },
    text:{
        color: "#000",
        fontSize: 6,
    },
    image: {
        width: 90,
        height: 90,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    contentContainer: {
        paddingVertical: 20,
      
    },
   
    moreIcon: {
        alignSelf: 'center',  
        justifyContent:'center',
        margin: 1,
    },
    moreView:{
        backgroundColor:'#E7E7E7',
        borderRadius:20,
        alignSelf:'center',
        elevation: 6,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginBottom: 10,
    },
    textStyle:{
        fontSize: 14,   
        fontFamily: 'roboto',
        fontWeight: 'bold'
    },
    button: {
        width: 100,
        height: 45,
        margin: 10,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#1D5179',
        alignSelf:'center'
    },
    microphoneButton:{
        width: 48,
        height: 48,
        borderRadius:100,
        backgroundColor:'#1D5179',
        alignSelf: 'center',
        marginLeft: 15,
        justifyContent:'center',
        alignItems: 'center',
    },
    addPhotoButton:{
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        borderRadius: 100,
        backgroundColor: '#1D5179',
        position: 'absolute',
        right: 12,
        top: 5, 
    },
    trashButton: {
        width: 30,
        height: 40,
        marginLeft: 250,
        marginTop: 5,
        justifyContent: 'center',
    },
    radioButton: {
        width: 19,
        height: 19,
        borderRadius: 100,
        margin: 1.5,
    },
    radioCircumference: {
        borderRadius: 100, 
        borderWidth: 1, 
        borderColor:'black',
        width:24, 
        height: 24,
        marginTop: 7,
    },

    
})