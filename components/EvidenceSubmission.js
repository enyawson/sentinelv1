import React, {useState} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { Picker } from '@react-native-community/picker';
import Microphone from 'react-native-vector-icons/FontAwesome5';

// number of items per row
const itemsPerRow = 4;

export default function EvidenceSubmission ({navigation}){

    const [state, setState]= useState({
        
        selectedIncidence: 'Please select incidence',
    });
    const [text, onChangeText] = useState({
        textInputted: '',
    })

   
    return(
        
        <SafeAreaView style= {globalStyle.MainContainer}>
         <StatusBar barStyle="light-content" backgroundColor="#174060"/>
            <View flexDirection='column' flex={1} marginTop={20} 
            marginRight ={10}
            marginLeft ={10}
            borderWidth={1}
            borderRadius={3}
            borderColor='#7E7E7E'
            >
                <View styles={[styles.contentContainer, styles.imageContainer]} >
                    <ScrollView 
                        horizontal={false}
                        pagingEnabled={false}
                        showsHorizontalScrollIndicator={true}
                        >
                     
                            <Image 
                                style={styles.image}
                                source = { require('../assets/10fdcd199128418af42afd4b91d762a7.jpg') }>
                            </Image>
                            <Image 
                                style={styles.image}
                                source = { require('../assets/0ed1d28683ac1d158f80a4fea80629a1.jpg') }>
                            </Image>
                            <Image 
                                style={styles.image}
                                source = { require('../assets/6507381cd3361b79d0cfe921af583598.jpg') }>
                            </Image>
                            <Image 
                                style={styles.image}
                                source = { require('../assets/6507381cd3361b79d0cfe921af583598.jpg') }>
                            </Image>
                        
                       
                    </ScrollView>
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
                <View style={{justifyContent: 'center'}}>
                    <View  marginBottom={5} marginLeft={10} marginTop={40}>
                        <Text style={styles.textStyle}>
                            
                        </Text>
                    </View>
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
    image: {
        width: 90,
        height: 90,
        overflow: 'hidden',
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
        alignSelf:'flex-end'
    },
    microphoneButton:{
        width: 40,
        height: 40,
        borderRadius:100,
        backgroundColor:'#1D5179'
    },
   
    
})