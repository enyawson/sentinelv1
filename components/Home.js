
/**
 *Home Screen
 */
import React , { useState, useEffect }  from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import CopyRight from 'react-native-vector-icons/FontAwesome5';
import  More from 'react-native-vector-icons/Ionicons';
import {Menu,MenuProvider, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';



export default function Home ({ navigation }){

  const [isopen, setOpened]=useState('false')

useEffect(() => {

  return () => {
  
  }
}, [])

const turnPopUpOn =()=>{
  setTurnPop(true);
  console.log('pop up')
}


    return (
      // Home page
      
      <View style= { styles.MainContainer }>
        <View style={{backgroundColor:'',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:5}}>
          <Text style={styles.logoName}>Election Watch</Text>
         
          <Menu style={{backgroundColor:'', marginLeft:60, margin:20}}>
              <MenuTrigger>
                <More
                    name={'ellipsis-vertical'} 
                    size={24}
                    color="black"
                    style={{ marginRight: 10 }}/>
              </MenuTrigger>
              <MenuOptions customStyles={optionStyles}>
                <MenuOption onSelect={()=>navigation.navigate('ActivityList')} text='Activities'/>
                <MenuOption onSelect={()=>alert('Save')} text='Log Out'/>
              </MenuOptions>
          </Menu>
       
        </View>
        
          <View style={{alignSelf: 'center', marginTop: 0,}}>
            <Image 
            style={styles.image}
            source = { require('../assets/voting.jpg') }>
            </Image> 
          </View>
        <View style={{marginTop: 10}}/>
      
        <TouchableOpacity style={styles.alarmButton}>  
            <Text style={{
              color: 'white',
              fontSize:18, 
              fontFamily:'roboto', 
              fontWeight:'bold', 
              alignSelf: 'center',
              padding: 10,
            }}>ALARM
            </Text>
            <Image 
              style={styles.imageInBox}
              source = { require('../assets/megaPhone.png') }/>
        </TouchableOpacity>
        <View style={styles.buttonInRowContainer} marginTop= {15}>
            <View style={styles.box} marginRight={35}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PhotoLogic')}
                >
                <Image 
                style={styles.imageInBox}
                source = { require('../assets/photo.png') } />
                <Text style={styles.text}>Pics & Video</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity
               onPress={()=>navigation.navigate('SignUp')}>
               <Image style={styles.imageInBox}
                source = { require('../assets/add.png') }/>
                <Text style={styles.text}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonInRowContainer}>
                <View style={styles.box} marginRight={35}>
                  <TouchableOpacity
                  onPress={()=> navigation.navigate('AudioRecorder')}>
                    <Image 
                    style={styles.imageInBox}
                    source = { require('../assets/microphone.png') } />
                    <Text style={styles.text}>Voice</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.box}>
                <TouchableOpacity
                  onPress={()=>navigation.navigate('ActivityPreview')}>
                    <Image 
                    style={styles.imageInBox}
                    source = { require('../assets/resultImage.png') } />
                    <Text style={styles.text}> Results </Text>
                </TouchableOpacity>
                </View>    
          </View>
      <View style={styles.bottomContainer}> 
            <TouchableOpacity>
                <Text>Locate</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Results</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Help</Text>
            </TouchableOpacity>
      </View>
     <View style={{alignContent: 'center', marginTop:10,
      flexDirection:'row', 
      justifyContent:'center'}}>
      
      <Text style={styles.textBottomA}>developed by</Text>
      <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection:'row'}}>
        <CopyRight name="copyright" size={14} 
        alignContent='center'
        marginTop={10}
        color='#ed7055'
        marginRight={10}/>
         <Text style={styles.textBottom}>SOFTMASTERS</Text>
      </View>
      
     
     </View>
    </View>
    );
  }

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor:'#f0f0f0',
  },
  logo: {
    width: 55,
    height: 35,
    marginTop:15,
    marginLeft: 25,
  },
  logoName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft:75,
    margin: 0,
    color: '#ed7055',

    
    
   
  },
  headerContainer: {
    flex: 0.45,
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    marginTop: 12,
    justifyContent:'space-between',
    alignContent: 'center',
  
  },

  containerImage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#f0f0f0',
    alignSelf: 'center',
    alignSelf: 'stretch',
    marginTop: 5,
  },
  
 
  instructionContainer: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    alignSelf: 'stretch',
  },
  image: {
    width: 325,
    height: 205,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'auto',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: "darkslategray",
  },
  alarmButton: {
    flexDirection: 'row',
    backgroundColor: '#ed7055',
    height: 40,
    width: 330,
    borderRadius: 5,
    alignContent:'center',
    justifyContent: 'center',
    marginTop: 25,
    alignSelf: 'center',
  },
  
  buttonInRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    alignSelf: 'center',
    padding: 10,
    
  },
  box: {
    width: 88,
    height: 67,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#Ffffff',
    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  imageInBox: {
    width: 23,
    height: 23,
    justifyContent: 'center',
    alignSelf:'center',
  },

  bottomContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    margin: 30,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textBottom: {
    fontSize: 26,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 5,
    alignContent:'center',
  
    color:'#ed7055'
  },
  textBottomA: {
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight:10, 
    alignContent:'center',
    color: '#ed7055'
  },
  
});
const optionStyles = {
  optionTouchable: {
    underlayColor: 'red',
    activeOpacity: 40,
  },
  optionWrapper: {
    margin: 5,
    alignSelf: 'center',
   
    
  },
  optionText: {
    color: 'black',
    fontSize: 16,
  },
  optionsContainer: {
    backgroundColor: 'white',
    padding: 0,
    width: 120,
    height:100
  },
};
