import React from 'react';
import {
    StyleSheet, Text,  View, StatusBar,
    Image, TouchableOpacity, Dimensions} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import LocationMap from './LocationMap';





/**This functional component is called when any individual audio file is clicked */

export default class ActivityList extends React.Component{
    
    constructor(props,navigation){
        super(props);
       // console.log({...props});

        this.state = {
            receivedFiles: '',
            time: '4:50',
            streetName: 'St. Central Park',
            date: '3/5/1998',
            itemsEvidenceFiles: [],
            initialViewState: false //boolean to check the state of the preview image

        }
    }
    
    componentDidMount (){
        this.getData();
        // this.getItemParam();
       


    }
    componentWillUnmount (){

    }
    //get item itemIndex on each activity click
    // getItemParam(){
    //     this.props.navigation.getParam(transferredItem, null);
    //     console.log('TRANSFERRED ITEM :'+ transferredItem)
    // }
  
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
    //toggle view state 
    toggleView =()=> {
        setState({
            initialViewState: true,
        })
    }

     initialStateOfView =(value)=>{
            const data = value;
             this.setState({
            receivedFiles: data,
            initialViewState: true,
                
        })
    }
    //get files to display
    receivedData  = (value) =>
    { 
        const data = value;
        this.setState({
            initialViewState: true,
            receivedFiles: value,
        })
        console.log ("VALUES ARE"+ value);
    }
 
    render () {
      
        // const { navigation } = this.props;
        // const itemIndex = navigation.getParam('itemIndex', 'NO-ID');
       
        // console.log("INDEX "+ itemIndex);
        
        // console.log("INDEX " + itemIndex);
         console.log(itemIndex);
         console.log("ITEMS PHOTOS")
        // console.log("time "+itemIndex.picDetail.timeTaken)
        // console.log("date "+itemIndex.picDetail.dateTaken)
        // console.log("incidence "+itemIndex.incidenceValue)
        // console.log("des "+itemIndex.description)
        const { itemIndex } = this.props.route.params;
        console.log(itemIndex)
        console.log("file:/"+itemIndex.evidenceFiles[0]);
       
       
        
        
        return(
        <View style= {styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#174060"/>
            <View style={{width:Dimensions.get('window').width, height: 60,
             backgroundColor:'#1D5179', elevation: 5, flexDirection: 'row',}}>
                <TouchableOpacity
                onPress={()=> this.props.navigation.goBack()}>
                   <ArrowBack
                    name={'arrow-back-outline'}
                    size={23}
                    color="white"
                    style={{margin:15, alignContent: 'center'}}
                />  
                </TouchableOpacity>
                <View style={{flexDirection: 'column', justifyContent:'center', }}>
                <Text style={{marginLeft:90, marginRight:0,marginTop: 10, fontFamily:'roboto',fontSize:18,color:'white'}}>{itemIndex.incidenceValue}</Text>
                    <View style={{flexDirection: 'row',marginLeft:50, }}>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={{fontSize:12,color:'white', top:0, marginRight:5, }}>
                                Time: 
                            </Text>
                            <Text style={{fontSize:12,color:'white', top:0}}>
                            {itemIndex.picDetail.timeTaken}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:12,color:'white', top:0, marginLeft: 15,marginRight:5, }}>
                                Date: 
                            </Text>
                            <Text style={{fontSize:12,color:'white', top:0, marginRight:5, }}>
                                {itemIndex.picDetail.dateTaken}
                            </Text>
                        </View>
                    </View>
                  
                </View>
            </View>
                <View style={{background: 'red', margin: 10}}>
                {this.receivedFiles==null? 
                    
                    <Image 
                    style={styles.previewImage}
                    source = { { uri: "file://"+itemIndex.evidenceFiles[0]}}/>
                    :
                    <Image 
                    style={styles.previewImage}
                    source = { { uri: "file://"+this.state.receivedFiles}}/>
                    
                }
                    

                </View>
               
                <View style={{marginLeft:10,marginRight: 10, backgroundColor:'', marginLeft:20, marginRight:20}}>
                    <FlatList
                    data= {itemIndex.evidenceFiles}
                    keyExtractor={(item, index)=> index.toString()}
                    horizontal={true}
                    renderItem={ ({ item }) => (  
                        <TouchableOpacity 
                            onPress={()=> this.receivedData(item)}>
                            <View style={{flexDirection: 'row'}}>                
                            <Image 
                            style={styles.imageInBox}
                            source = {{ uri: "file://"+itemIndex.evidenceFiles[0]}} />
                        </View>
                        </TouchableOpacity>
                        
                    )} 
                    />
                </View>
                <View style={{flexDirection:'row', backgroundColor:'', marginTop: 10, marginLeft: 10, marginRight: 10,}}>
                        {/* <Text style={{fontFamily:'roboto',fontSize:16, fontWeight:'500', }}>
                            Incidence: 
                        </Text> */}
                        {/* <Text style={{fontFamily:'roboto',fontSize:14, alignSelf:'center', marginLeft:20,  color: '#7E7E7E'}}>
                            value of incidence
                        </Text> */}
                </View>
                <View style={{flexDirection:'row', backgroundColor:'', marginTop:5, 
                marginLeft: 10, marginRight: 10, }}>
                    <Text style={{fontFamily:'roboto',fontSize:16, fontWeight:'500', marginRight:5}}>
                        Description: 
                    </Text>
                    <View style={{ alignSelf:'center',width:240, marginRight:5,borderWidth: 0, backgroundColor:''}}>
                    <ScrollView 
                    style={{width: 240, height:90}}>
                         <Text style={{fontFamily:'roboto',fontSize:14, alignSelf:'center', marginLeft:5, alignSelf:'center', 
                            color: '#7E7E7E'}}>
                            {itemIndex.description}
                            </Text>
                    </ScrollView>  
                    </View>   
                    </View>
                        <Text style={{marginLeft:10}}>Location</Text>
                        <View style={{flex:2, backgroundColor:'',}}>
                        <LocationMap />
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
