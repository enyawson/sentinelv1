import React, { Component, useEffect, useState} from 'react';
import {
    StyleSheet, Text,  View, StatusBar,
    Image, TouchableOpacity, Dimensions} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';



/**This functional component is called when any individual audio file is clicked */

export default function MainActivityList ({navigation, Route}){
    
    const [submittedIncidence, setSubmittedIncidence ] = useState(
        {incidence: '',
        description: '',
        time: '4:50',
        streetName: 'St. Central Park',
        date: '3/5/1998',
        },
        // {incidence: 'Late Submission',
        // description: 'yeah they arrived late',
        // time: '4:50',
        // streetName: '29 Ameboe Street',
        // date: '3/5/1998',
        // },
    
    );
    //Get the stored images to display
    const [receivedFiles, setReceivedFiles] = useState([]);
    
    useEffect(() => {
            getData();
            console.log("DISPLAY DATA ; "+ receivedFiles)
           
        return () => {
           
        }
    }, [receivedFiles])
    // newData.evidenceFiles = photos;
    // newData.incidenceValue = selectedIncidence;
    // newData.description = description;
    //newData.time = timeFileTaken;
    //newData.streetName = location;
    //newData.locationCord = locationCoordinates;

    /**function to loop through array of object */


     /**Get data to display from async storage */
      const getData =  async () => {
                try {
                    const value = await AsyncStorage.getItem('mainActivityData')
                    //console.log('Data to be displayed'+ AsyncStorage.getItem('mainActivityData'));
                    setReceivedFiles((JSON.parse(value)))

                    if(value !== null){

                        const retrievedData = JSON.parse(value)
                        console.log('value received '+ retrievedData[2].incidenceValue )
                        console.log('array '+ (value))
        
                    /**looping through array */
                    // for(let i=0; i<retrievedData.length; i++){
                    //     console.log('value[' + (i +1)+']'+ retrievedData[i].incidenceValue)
                    //     setSubmittedIncidence({
                    //         incidence: retrievedData[i].incidenceValue
                    //     })
                    // }
                    //    const{evidenceFiles, incidenceValue, description}=value;
                    //    console.log("evi" + evidenceFiles);
                    }
                    receivedData(retrievedData);
                   
                }catch(e){
                console.log('error with async getData');
                }      
                console.log('YES got it : '+ receivedFiles);
                 
            }  
    // }


     //get files to display
     const receivedData  = async(value) =>
     { 
        const data = value;
         setReceivedFiles(value);
        console.log ("VALUES ARE"+ data);
     }
 

    return(
        <View style= {styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#174060"/>
                
            <FlatList
                data= {receivedFiles}
                keyExtractor={(item, index)=> index.toString()}
                renderItem={ ({ item}) => (  
                    
                    <TouchableOpacity style={{flexDirection: 'row', margin: 5}}>
                        <View>
                            <Image 
                            style={styles.imageInBox}
                            source = {require('../assets/0ed1d28683ac1d158f80a4fea80629a1.jpg')}/>
                        </View>
                        
                        <View style={styles.incidence}>
                            <Text style={{fontSize:16, fontWeight:'500', fontFamily:'roboto'}}>{item[index].incidenceValue}</Text>
                            <Text style={{fontSize:12, marginBottom:5,}}>{item.streetName}</Text>
                        </View>
                        <View style={{right: 40,marginTop: 5}}>
                            <Text>{item.time}</Text>
                            <Text style={{right: 30}}>{item.date}</Text>
                        </View>
                        
                    </TouchableOpacity>
                     )   
                    }
                    
                />
            
         </View>   
            
            
     );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column', 
        backgroundColor: '#FFFFFF',
    },
    imageInBox: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignSelf:'center',
        backgroundColor: '#7E7E7E'
      },
    incidence: {
        backgroundColor:'#FFFFFF',
        margin: 2.5,
        borderBottomWidth:0.9,
        borderBottomColor: '#7E7E7E',
        width:290,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
    }
});
