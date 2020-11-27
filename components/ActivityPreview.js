import React from 'react';
import {
    StyleSheet, Text,  View, StatusBar,
    Image, TouchableOpacity, Dimensions} from 'react-native';
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import LocationMap from './LocationMap';
import { ThreeDRotationSharp } from '@material-ui/icons';
import Play from 'react-native-vector-icons/Ionicons';
import  Add from 'react-native-vector-icons/Ionicons';





/**This functional component is called when any individual audio file is clicked */

export default class ActivityPreview extends React.Component{
    
    constructor(props,navigation){
        super(props);
      // console.log({...props});

        this.state = {
            imageClicked: '',
            imageClickedState: false,
            time: '4:50',
            streetName: 'St. Central Park',
            date: '3/5/1998',
            itemsEvidenceFiles: [],
            initialViewState: false, //boolean to check the state of the preview image
            count: 0,

        }
    }
    
    componentDidMount (){
        //this.getData();
        // this.getItemParam();

    }
    componentWillUnmount (){

    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.imageClicked !== this.state.imageClicked){
           // console.log("imageClick state changed");
           // console.log("new selected is : "+ this.state.imageClicked);
        }
        if (prevState.imageClickedState !==this.state.imageClickedState){
           // console.log("imageClickState state changed");
            //console.log("new selected is : "+ this.state.imageClickedState);
        }  
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
                //console.log('value received '+ retrievedData[2].incidenceValue )
               // console.log('array '+ (value))

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
        //console.log('YES got it : '+ this.state.receivedFiles);
            
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
        let data = value;
        //console.log ("ITEM SELECTED "+ data);
        //console.log ("ITEM STATE "+ this.state.imageClickedState);

        
        this.setState({
            imageClicked: data,
            imageClickedState: true,
        })
        
        // //console.log("RECEIVED FILES "+ this.state.receivedFiles + initialViewState)
        // console.log("ITEM CLICKED STATE : "+ this.state.imageClickedState);
    }
 /**This method checks for the extension of file (jpg or mp4) */
 checkExtensionOfFile=(item, itemIndex)=>{
    //set the state of extension 
    let ext = item.split('.').pop();
    //console.log("Extension "+ ext);
    if (ext == 'jpg'){
       
         return(
            <Image
            style={{ width:115, height:214,margin:1, resizeMode:'cover'}}   
            source = {{ uri: "file://"+ item}}/>
     )
    } 
    if (ext == 'mp4'){ 
        return(
            <View>
                <Image
                style={{ width:115, height:214,margin:1, resizeMode:'cover'}}   
                source = {{ uri: "file://"+ item}}/>
                <View style={{ backgroundColor: 'black',
                 position:'absolute',justifyContent:'center',alignItems: 'center',margin:1,
                 width: 115 , height: 214,opacity:0.5}}>
                    <Play
                    name={'play-circle-outline'}
                    size={35}
                    color="white"/>   
                </View>  
            </View>
            )  
        }
    //this.countPics(itemIndex);
    console.log(itemIndex)    
}
 countFiles = (value)=> {
    //  const value = 1;
    //  let countState = this.state.count;
     this.setState({
         count:  value,
     })
     console.log("I am in hurraay"+this.state.count)
 }
    //save path of video to display in videoPreview
    storeData =async (value)=> {
    try{
        await AsyncStorage.setItem('previewVideoOrImage',value)
        } catch (e) {
            console.log('error saving video for preview')
        }
    }

    showPreview =(path)=>{
     //set the state of extension 
    let ext = path.split('.').pop();
    //console.log("show Preview ready")
    //console.log(path)
    if (ext == 'mp4'){
        this.storeData(path);
        return(
        this.props.navigation.navigate( 'VideoPreview')
        )
    } 
    if (ext == 'jpg'){
        return(
            this.props.navigation.navigate('PhotoPreviewer',{transferredImageItem: path})
        )
    }
    
    //else show preview for image
 
}
    render () {
        
        const { itemIndex } = this.props.route.params; //list of items received from an activityList
         console.log(itemIndex.picDetail)
        //console.log(typeof Number(itemIndex.picDetail.locationLat))
        let counter = 0;
        let myCounterArray  = [];
        myCounterArray = itemIndex.evidenceFiles;
        myCounterArray.forEach(function(item){
            const value = 1;
            counter = counter + value;  
        })
        
        
        
     
        return(
        <View style= {styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#174060"/>
            <View />
            
            {/* <View style={{width:Dimensions.get('window').width, height: 60,
                backgroundColor:'#1D5179', elevation: 5, flexDirection: 'row',}}>
                <TouchableOpacity
                    onPress={()=> this.props.navigation.goBack()}>
                    <ArrowBack
                    name={'arrow-back-outline'}
                    size={23}
                    color="white"
                    style={{margin:15, alignContent: 'center'}}/>  
                </TouchableOpacity>
                <View style={{flexDirection: 'column', justifyContent:'center', }}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{alignSelf:'center',marginLeft:45,marginTop: 10, fontFamily:'roboto',fontSize:13,color:'white', fontWeight: 'bold' }}>
                                INCIDENT: 
                        </Text>
                        <Text style={{alignSelf:'center',marginLeft:2,marginTop: 10, fontFamily:'roboto',fontSize:13,color:'white'}}>
                            {itemIndex.incidenceValue.toUpperCase()}
                        </Text>
                    </View> 
                    <View style={{flexDirection: 'row',marginLeft:50, }}>
                         <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:13,color:'white', top:0, marginLeft: 0,marginRight:2,fontWeight:'bold' }}>
                                DATE: 
                            </Text>
                            <Text style={{fontSize:13,color:'white', top:0, marginRight:5, }}>
                                {itemIndex.picDetail.dateTaken}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <Text style={{fontSize:12,color:'white', top:0, marginRight:2,fontWeight:'bold'  }}>
                                TIME: 
                            </Text>
                            <Text style={{fontSize:12,color:'white', top:0}}>
                            {itemIndex.picDetail.timeTaken}
                            </Text>
                        </View>
                       
                    </View>
                  
                </View>
            </View> */}
            
           
                {/* <View style={{background: '', margin: 10}}>
                    {this.state.imageClickedState==false? 
                        <Image 
                        style={styles.previewImage}
                        source = { { uri: "file://"+itemIndex.evidenceFiles[0]}}/>
                        :
                        <Image 
                        style={styles.previewImage}
                        source = { { uri: "file://"+this.state.imageClicked}}
                            resizeMode={'contain'}
                        /> 
                        used in onpress button on individual item
                        onPress={()=> {this.receivedData(item)}
                    }
                    
                </View> */}
               
                <View style={{flex: 1.5,marginRight: 5, backgroundColor:'', marginLeft:5,
                 marginTop: 10, borderWidth:0,padding:2, alignItems:'center'}}>
                    <FlatList
                        data= {itemIndex.evidenceFiles}
                        keyExtractor={(item, index)=> index.toString()}
                        horizontal={true}
                        renderItem={ ({ item }) => (  
                        <TouchableOpacity
                            onPress={()=> this.showPreview(item)}>
                            <View style={{flexDirection: 'row'}}>         
                                {this.checkExtensionOfFile(item)}
                               
                            </View>
                        </TouchableOpacity>
                        
                    )}

                    />
                    <Text style={{fontSize:12}}> {itemIndex.picDetail.locationLat}  {itemIndex.picDetail.locationLng} </Text>
                    <Text style={{fontSize:12}}> {itemIndex.picDetail.dateTaken} </Text>
                <TouchableOpacity style={styles.addPhotoButton}>
                   <Text style={{color:'white', justifyContent:'center',alignSelf:'center'}}> {counter}</Text> 
                </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', backgroundColor:'', marginTop: 10, marginLeft: 10, marginRight: 10,}}>
                        {/* <Text style={{fontFamily:'roboto',fontSize:16, fontWeight:'500', }}>
                            Incidence: 
                        </Text> */}
                        {/* <Text style={{fontFamily:'roboto',fontSize:14, alignSelf:'center', marginLeft:20,  color: '#7E7E7E'}}>
                            value of incidence
                        </Text> */}
                </View>
                <View style={{flexDirection:'row', flex:0.5,backgroundColor:'', marginTop:5, 
                    marginLeft: 10, marginRight: 10, borderWidth: 0}}>
                    <Text style={{fontFamily:'roboto',fontSize:15, fontWeight:'500', marginRight:0}}>
                        Description: 
                    </Text>
                    <View style={{ alignSelf:'center',borderWidth: 0, backgroundColor:''}}>
                        <ScrollView 
                        >
                            <Text style={{fontFamily:'roboto',fontSize:15, alignSelf:'center',
                             marginLeft:5, alignSelf:'center', padding:0,
                                color: '#7E7E7E'}}>
                                {itemIndex.description}
                                {/* BUILD SUCCESSFUL in 54s
                                263 actionable tasks: 2 executed, 261 up-to-date
                                info Connecting to the development server...
                                info Starting the app on "03744098AJ014469"...
                                Starting: Intent 
                                PS D:\soft\s */}
                                </Text>
                        </ScrollView>  
                    </View>   
                 </View>
                        <Text style={{marginLeft:10}}></Text>
                        <View style={{flex:2, backgroundColor:'',}}>
                        <LocationMap 
                            incidence={itemIndex.incidenceValue} 
                            description={itemIndex.description} 
                            lat={Number(itemIndex.picDetail.locationLat)}
                            lng={Number(itemIndex.picDetail.locationLng)}
                        />
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
        width: 80,
        height: 85,
        justifyContent: 'center',
        alignSelf:'center',
        margin:2,
        backgroundColor: '#7E7E7E'
      },
      playPhotoButton:{
        
        justifyContent: 'center',
        alignItems: 'center',
        // width: 100, 
        // height: 100,
        marginTop: 25,
        backgroundColor: 'black',
        borderRadius: 100,
        alignSelf:'center',
        opacity: 0.5,
    },
      previewImage:{
        width: 340,
        height: 250,
        alignSelf: 'center',
       
      },
      addPhotoButton:{
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        borderRadius: 100,
        backgroundColor: '#ed7055',
        position: 'absolute',
        left: 0,
        top: 0, 
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
