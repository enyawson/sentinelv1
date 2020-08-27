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
import {Card} from 'react-native-paper';


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
    const { getOverHereTransferred } = route.params
    const { getLatitudeTransferred } = route.params
    const { getLongitudeTransferred } = route.params
    const { getTimeTransferred } = route.params
    const { getDateTransferred } = route.params

    
    console.log('TRANSFERRED:' + transferredImage )    

    return(
        <SafeAreaView style= {globalStyle.MainContainer}>
         <StatusBar barStyle="light-content" backgroundColor="#174060"/>
            <View flexDirection='column' flex={1} marginTop={5} 
            marginRight ={5}
            marginLeft ={5}
            borderWidth={1}
            borderRadius={3}
            borderColor='#7E7E7E'
            backgroundColor='green'
            >
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
                    <Card>
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
                    </Card>
                    
                    </ScrollView>
                </View> 
            </View>
               
                 {/* <TouchableOpacity style={styles.moreView}>
                        <Icon
                        name={'add-outline'} 
                        size={32}
                        color="black"
                        style={styles.moreIcon}
                        />
                 </TouchableOpacity>  */}
                </View>
                <View style={{justifyContent: 'center', backgroundColor:'brown', margin: 5}}>
                    <View style={{borderWidth: 1, 
                        borderColor:'#C4C4C4',
                        borderRadius:5,
                        width: 260, 
                        marginLeft: 10}}>
                        <Picker
                            selectedValue ={state.selectedIncidence}
                            style={{height:45, width: 260, 
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
                    <View marginBottom={5} marginLeft={10} marginTop={15}>
                        <Text style={styles.textStyle}>
                            Description
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}} >
                        <TextInput 
                            style={{height: 70, 
                            width: 260,
                            borderRadius: 8,
                            borderColor:'#C4C4C4',
                            borderWidth: 1, marginLeft: 10}}
                            onChangeText={(text) => setState({text})}
                            value={state.text}
                            multiline={true}
                            enablesReturnKeyAutomatically={true}
                            >
                        </TextInput>
                    <View style={{marginLeft: 20, marginTop: 15}}>


                        <TouchableOpacity style={styles.microphoneButton}>
                            <Microphone name="microphone"  size={21} 
                            color='white'/> 
                        </TouchableOpacity>
                         
                        </View>
                    </View>
                    <View marginBottom={5} marginLeft={10} marginTop={15}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{margin:10,
                                 fontFamily:'roboto', fontSize: 14,
                                 fontWeight:'bold'}}>
                                Submit as
                            </Text>
                            <Text style={{margin: 10}}>Anonymous</Text>    
                            <Text style={{margin: 10}}> or </Text>  
                            <Text style={{margin: 10}}>Sign In</Text>                   
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
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#1D5179',
        alignSelf:'center'
    },
    microphoneButton:{
        width: 40,
        height: 40,
        borderRadius:100,
        backgroundColor:'#1D5179'
    },
   
    
})