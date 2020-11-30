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
                console.log('value[5]'+ retrievedData[4].picDetail.dateTaken)
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

     /**
     * This method navigates to photo preview page
     * @param path image retrieved from flat list item in evidence page
     */
    // navigateEachActivity = (path) =>{
    //     this.props.navigation.navigate('ActivityPreview',
    //     {
    //         transferredItem: path,
        
    //     })      
    // }
 
    render(){
         return(
            
        <View style= {styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#174060"/>
            {this.state.receivedFiles == null? 
            
            <View>
                <Text style={{alignSelf:'center', justifyContent:'center'}}> </Text>
            </View> 
            :  
            <FlatList
                data= {this.state.receivedFiles.reverse()}
                keyExtractor={(item, index)=> index.toString()}
                renderItem={ ({ item }) => (  
                    
                    <TouchableOpacity style={{flexDirection: 'row', margin:8}}
                        onPress={()=> {this.props.navigation.navigate( 'ActivityPreview', {itemIndex: item}
                        )
                            // let value = item.evidenceFiles[0]
                            // console.log("INDEX OF IMAGE " + value)
                        }
                       
                        }>
                        <View>
                            <Image 
                            style={styles.imageInBox}
                            source = {{ uri: "file://"+ item.evidenceFiles[0]}} 
                            />
                            
                        </View>
                        
                        <View style={styles.incidence}>
                            <Text style={{fontSize:16, fontWeight:'500', fontFamily:'roboto'}}>{item.incidenceValue}</Text>
                            <Text style={{fontSize:12, marginBottom:5,}}>{item.picDetail.streetName}</Text>
                        </View>
                        <View style={{right: 40,marginTop: 5}}>
                            <Text style={{right:32, fontSize:12}}>{item.picDetail.dateTaken}</Text>
                            <Text style={{fontSize: 12, right: 8}}>{item.picDetail.timeTaken}</Text>
                        </View>
                        
                    </TouchableOpacity>
                     )   
                    }
                    
                />
             }
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
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignSelf:'center',
        backgroundColor: '#7E7E7E',
        
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
