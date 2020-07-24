
/**
 *Home Screen
 */

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';





export default function Home ({ navigation }){
  
    return (
      // Home page
    
      <View style= { styles.MainContainer }>
        <View style={styles.headerContainer}>
            <Text>Image #01</Text>
            <Text>Image #02</Text>
            <Text style={{paddingLeft: 80}}>VectorImage #03</Text> 
        </View>
        <View style={styles.containerAB}>
          <Image 
          style={styles.image}
          source = { require('../assets/voting.jpg') } /> 
        </View>
        <View style={styles.instructionContainer}>
          <Text style={styles.text}>
            Submit evidence of bad deeds to promote the
          </Text>
          <Text style={styles.text}>public good</Text>
        </View>
        <View style={styles.containerAB}>
          <View style={styles.boxInRows}>
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={() => navigation.navigate('PhotoLogic')}
                >
                <Image 
                style={styles.imageInBox}
                source = { require('../assets/cameraImage.png') } />
                <Text style={styles.text}>Photo</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.box}>
              <TouchableOpacity
                  style={styles.touchableButton}>
                  <Image 
                  style={styles.imageInBox}
                  source = { require('../assets/videoImage.png') } />
                  <Text style={styles.text}>Video</Text>
            </TouchableOpacity>
            </View> */}
          </View>
          <View style={styles.boxInRows}>
                <View style={styles.box}>
                  <TouchableOpacity
                    style={styles.touchableButton}>
                    <Image 
                    style={styles.imageInBox}
                    source = { require('../assets/audioImage.png') } />
                    <Text style={styles.text}>Voice</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.box}>
                <TouchableOpacity
                    style={styles.touchableButton}>
                    <Image 
                    style={styles.imageInBox}
                    source = { require('../assets/audioImage.png') } />
                    <Text style={styles.text}>Election {'\n'} Results </Text>
                  
                  </TouchableOpacity>
                </View>
          </View>
      </View>
      <View style={styles.bottomContainer} backgroundColor='#F0F0F0'> 
          <TouchableOpacity style={styles.button}>  
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
          <View style={styles.bottomContainerB}> 
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
    </View>
    );
  }

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor:'#f0f0f0',

  },
  text: {
    fontSize: 14,
    justifyContent: 'center',
    marginTop: 2,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#ed7055',
    height: 40,
    width: 315,
    borderRadius: 5,
    alignContent:'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  containerAB: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#F0F0F0',
    alignSelf: 'stretch',
  },
  bottomContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    
  
  },
  bottomContainerB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginBottom: 15,
  },
  headerContainer: {
    flex: 0.45,
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    width: 325,
    alignItems: 'center',
  },
  headerImagesContainer: {
    flexDirection: 'row', 
    alignContent: 'flex-start',
    
  },
  instructionContainer: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    alignSelf: 'stretch',
  },
  box: {
    width: 88,
    height: 67,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    margin: 25,
  },
  boxText: {
    color: 'darkslategray',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  boxInRows: {
    flex: 1,
    flexDirection: 'row',
    
    alignItems: 'center',
  },
  image: {
    width: 325,
    height: 200,
    borderRadius: 15,
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
  imageInBox: {
    width: 23,
    height: 23,
    justifyContent: 'center',
    alignSelf:'center',
  },
  touchableButton: {
    alignContent: 'stretch',
    alignItems: 'center',
  },
});
