import React from 'react';
import {
    StyleSheet, Text,  View, StatusBar,
    Image, TouchableOpacity, Dimensions} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';



/**This functional component is called when any individual audio file is clicked */

export default class ActivityList extends React.Component{
    
    constructor(props,navigation){
        super();
        this.state = {
            receivedFiles: [],
            time: '4:50',
            streetName: 'St. Central Park',
            date: '3/5/1998',

        }
    }
    
    componentDidMount (){
        this.getData();

    }
    componentWillUnmount (){

    }
  
    // newData.evidenceFiles = photos;
    // newData.incidenceValue = selectedIncidence;
    // newData.description = description;
    //newData.time = timeFileTaken;
    //newData.streetName = location;
    //newData.locationCord = locationCoordinates;

    /**function to loop through array of object */


     /**Get data to display from async storage */
     getData =  async () => {
        try {
            const value = await AsyncStorage.getItem('mainActivityData')
            //console.log('Data to be displayed'+ AsyncStorage.getItem('mainActivityData'));
            this.setState(
                {
                    receivedFiles:  (JSON.parse(value)),
                    
                });
               

            if(value !== null){

                const retrievedData = JSON.parse(value)
                console.log('value received '+ retrievedData[2].incidenceValue )
                console.log('array '+ (value))

                 /**looping through array */
                // for(let i=0; i<retrievedData.length; i++){
                // console.log('value[' + (i +1)+']'+ retrievedData[3].evidenceFiles)
                //  }
                // console.log('value[1]'+ retrievedData[0].evidenceFiles[0])
            }
            receivedData(retrievedData);
            
        }catch(e){
        console.log('error with async getData');
        }      
        console.log('YES got it : '+ this.state.receivedFiles);
            
    }

        
    // }


     //get files to display
      receivedData  = async(value) =>
     { 
        const data = value;
        this.setState({
               receivedFiles: value,
        })
        console.log ("VALUES ARE"+ data);
     }
 
    render(){
         return(
        <View style= {styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#174060"/>
                <View style={{background: 'red', margin: 10}}>
                    <Image 
                    style={styles.previewImage}
                    source = { require('../assets/voting.jpg') }/>

                </View>
               
                <View style={{marginLeft:10,marginRight: 10, backgroundColor:'', marginLeft:20, marginRight:20}}>
                    <FlatList
                    data= {this.state.receivedFiles.reverse()}
                    keyExtractor={(item, index)=> index.toString()}
                    horizontal={true}
                    renderItem={ ({ item}) => (  
                        <View style={{flexDirection: 'row'}}> 
                            <Image 
                            style={styles.imageInBox}
                            source = {{ uri: "file://"+ item.evidenceFiles[0]}} />
                        </View>
                    )} 
                    />
                </View>
                <View style={{flexDirection:'row', backgroundColor:'', marginTop: 30, marginLeft: 10, marginRight: 10,}}>
                        <Text style={{fontFamily:'roboto',fontSize:16, fontWeight:'500', }}>
                            Incidence: 
                        </Text>
                        <Text style={{fontFamily:'roboto',fontSize:14, alignSelf:'center', marginLeft:20,  color: '#7E7E7E'}}>
                            value of incidence
                        </Text>
                </View>
                <View style={{flexDirection:'row', backgroundColor:'', marginTop:30, 
                marginLeft: 10, marginRight: 10, }}>
                    <Text style={{fontFamily:'roboto',fontSize:16, fontWeight:'500', marginRight:5}}>
                        Description: 
                    </Text>
                    <View style={{ alignSelf:'center',width:240, marginRight:5,borderWidth: 0, backgroundColor:''}}>
                        <Text style={{fontFamily:'roboto',fontSize:14, alignSelf:'center', marginLeft:5, alignSelf:'center', 
                        color: '#7E7E7E'}}>
                        The slapped him, immediately 
                        the officer 
                        retaliated. The reflex action was quick.
                        The Ashanti Regional Chairman for the New 
                     </Text>
                    </View>   
                </View>
                <View style={{flexDirection:'row', backgroundColor:'',margin:10, justifyContent:'space-evenly', marginTop:30,}}>
                    <View style={{alignSelf:'center'}}>
                        <Text style={{fontFamily:'roboto',fontSize:12, fontWeight:'600',color:'#7E7E7E', alignSelf:'center'}}> DATE</Text>
                        <Text style={{alignSelf:'center'}}>23/10/2020 </Text>
                    </View>
                        
                    <View>
                        <Text style={{fontFamily:'roboto',fontSize:12, fontWeight:'600',color:'#7E7E7E',alignSelf:'center'}}> TIME</Text>
                        <Text style={{alignSelf:'center'}}>12:23</Text>
                    </View>
                    <View>
                        <Text style={{fontFamily:'roboto',fontSize:12, fontWeight:'600',color:'#7E7E7E',alignSelf:'center'}}> LOCATION</Text>
                        <Text style={{alignSelf:'center'}}>Accra</Text>
                     </View>
                 </View>
                
            </View>   
                
     );
    }
   
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column', 
        backgroundColor: '#FFFFFF',
    },
    imageInBox: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignSelf:'center',
        marginLeft:5,
        marginRight:5,
        backgroundColor: '#7E7E7E'
      },
      previewImage:{
        width: 340,
        height: 250,
        alignSelf: 'center',
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
