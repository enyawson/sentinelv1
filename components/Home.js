
/**
 *Home Screen
 */

import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';





export default function Home ({ navigation }){
  
    return (
      // Home page
    
      <View style= { styles.MainContainer }>
        <View style={styles.headerContainer}>
          <Text style={{marginLeft: 25, marginTop: 5, alignContent: 'center'}}>logo</Text>
          <Image 
          style={styles.logo} 
          source = { require('../assets/softmastersLogo.png') } 
          />
          <Icon
            name={'ellipsis-vertical'} 
            size={23}
            color="black"
            style={{ marginLeft: 11, marginBottom:8}}/>
        </View>
        <View style={{alignSelf: 'center'}}>
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
    </View>
    );
  }

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor:'#f0f0f0',
  },
  logo: {
    width: 200,
    height: 100,
    marginRight: 50,
    marginTop:10
  },
  headerContainer: {
    flex: 0.45,
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },

  text: {
    fontSize: 14,
    justifyContent: 'center',
    marginTop: 2,
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
    backgroundColor: '#f0f0f0',
  },
  
});
