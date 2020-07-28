
/**
 *Home Screen
 */
import React  from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CopyRight from 'react-native-vector-icons/FontAwesome5';


export default function Home ({ navigation }){

  /**
   * This function exit app 
   */
  // disableBackButton = () => {
  //   BackHandler.exitApp();
  //   return true;
  // }

  /**
   * This method is called when components are mounted
   * component mounts adds an event listener to the following parameters
   */
  // componentWillMount() 
  // {
  //   BackHandler.addEventListener('hardwareBackPress', disableBackButton);
  // }
  // /**
  //  * This method is called when components unmount
  //  */
  // componentWillUnmount()
  // {
  //   BackHandler.removeEventListener('hardwareBackPress', disableBackButton);
  // }
  
    return (
      // Home page
    
      <View style= { styles.MainContainer }>
        <View style={styles.headerContainer}>
          <Image style={styles.logo}
          source= {require('../assets/electionWatch.png')}/>
          <View style={{marginTop: 20}}>
          <Icon
            name={'ellipsis-vertical'} 
            size={24}
            color="black"
            style={{ marginRight: 18 }}/>

          </View>
          
        </View>
        <View style={{alignSelf: 'center', marginTop: 50,}}>
          <Image 
          style={styles.image}
          source = { require('../assets/voting.jpg') }>
          </Image> 
        </View>
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
        {/* <View style={styles.instructionContainer}>

          <Text style={styles.text}>
            Submit evidence of bad deeds to promote the
          </Text>
          <Text style={styles.text}>public good</Text>
        </View> */}
        
        <View style={styles.buttonInRowContainer} marginTop= {15}>
            <View style={styles.box} marginRight={35}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PhotoLogic')}
                >
                <Image 
                style={styles.imageInBox}
                source = { require('../assets/cameraImage.png') } />
                <Text style={styles.text}>Photo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity>
               <Image style={styles.imageInBox}
                source = { require('../assets/formIcon.png') }/>
                <Text style={styles.text}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonInRowContainer}>
                <View style={styles.box} marginRight={35}>
                  <TouchableOpacity>
                    <Image 
                    style={styles.imageInBox}
                    source = { require('../assets/audioImage.png') } />
                    <Text style={styles.text}>Voice</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.box}>
                <TouchableOpacity>
                    <Image 
                    style={styles.imageInBox}
                    source = { require('../assets/resultImage.png') } />
                    <Text style={styles.text}> Results </Text>
                </TouchableOpacity>
                </View>    
          </View>
      <View style={styles.bottomContainer}> 
            <TouchableOpacity>
                <Text>Location</Text>
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
      <CopyRight name="copyright" size={14} 
        alignContent='center'
        marginTop={10}
        color="#1D5179"
        marginRight={10}/>
      <Text style={styles.textBottom}>by SoftMasters</Text>
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
    width: 90,
    height: 45,
    marginTop:15,
    marginLeft: 25,
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
    shadowOpacity: 0.3,
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
    marginTop: 30,
    marginLeft: 30,
    marginRight:30,
    marginBottom: 30,
   
  
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textBottom: {
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 5,
    alignContent:'center',
  
    color: '#1D5179'
  },

  
});
