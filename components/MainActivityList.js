import React, { Component, useEffect, useState} from 'react';
import {
    StyleSheet, Text,  View, StatusBar,
    Image, TouchableOpacity, Dimensions} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';



/**This functional component is called when any individual audio file is clicked */

export default function MainActivityList ({navigation, Route}){
    
    const [submittedIncidence, setSubmittedIncidence ] = useState([
        {incidence: 'gun Shot',
        description: 'Finished ballot papers',
        time: '4:50',
        streetName: 'St. Central Park',
        date: '3/5/1998',
        },
        {incidence: 'Late Submission',
        description: 'yeah they arrived late',
        time: '4:50',
        streetName: '29 Ameboe Street',
        date: '3/5/1998',
        },
        {incidence: 'Ballot Papers shortage',
        description: 'Just got finished',
        time: '4:50',
        streetName: '13 Quiet Street',
        date: '3/5/1998',
        },
        {incidence: 'gun Shot',
        description: 'Nothing really happened',
        time: '4:50',
        streetName: 'St. Central Park',
        date: '3/5/1998',
        },
        {incidence: 'Late Submission',
        description: 'yeah they arrived late',
        time: '4:50',
        streetName: '29 Ameboe Street',
        date: '3/5/1998',
        },
        {incidence: 'Ballot Papers shortage',
        description: 'Just got finished',
        time: '4:50',
        streetName: '13 Quiet Street',
        date: '3/5/1998',
        },
        {incidence: 'gun Shot',
        description: 'Nothing really happened',
        time: '4:50',
        streetName: 'St. Central Park',
        date: '3/5/1998',
        },
        {incidence: 'Late Submission',
        description: 'yeah they arrived late',
        time: '4:50',
        streetName: '29 Ameboe Street',
        date: '3/5/1998',
        },
        {incidence: 'Ballot Papers shortage',
        description: 'Just got finished',
        time: '4:50',
        streetName: '13 Quiet Street',
        date: '3/5/1998',
        },

    ]

    );
    
    useEffect(() => {
    
       
        return () => {
       
        }
    }, [])  
    return(
        <View style= {styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#174060"/>
                
            <FlatList
                data= {submittedIncidence}
                keyExtractor={(item, index)=> index.toString()}
                renderItem={ ({ item}) => (  
                    
                    <TouchableOpacity style={{flexDirection: 'row', margin: 5}}>
                        <View>
                            <Image 
                            style={styles.imageInBox}
                            source = {require('../assets/0ed1d28683ac1d158f80a4fea80629a1.jpg')}/>
                        </View>
                        
                        <View style={styles.incidence}>
                            <Text style={{fontSize:16, fontWeight:'500', fontFamily:'roboto'}}>{item.description}</Text>
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
