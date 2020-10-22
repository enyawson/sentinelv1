import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import  Trash from 'react-native-vector-icons/Ionicons';
import  Close from 'react-native-vector-icons/Ionicons';

export default  function PhotoPreviewer({route, navigation}){


  let { transferredImageItem }= route.params
    return(

        <View style={styles.preview}>
            <View style={{margin: 0,marginBottom:20, alignSelf:'center'}}>
                <Image
                style={{ width:Dimensions.get('window').width, height:Dimensions.get('window').height, resizeMode:'cover'}}   
                source = {{ uri: "file://"+ transferredImageItem}} 
              />
            </View>
              <View style={{position: 'absolute', marginBottom:0, alignSelf:'center' , bottom: 10}}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress= {()=> navigation.goBack()}>
                    <ArrowBack
                        name={"close-outline"}
                        size={40}
                        color="black"
                        style={{ alignContent: 'center', alignItems:'center',margin: 5}}
                    />
                  </TouchableOpacity>
              </View>
            <View style={{position:'absolute', left: 15, top: 20}}> 
              <ArrowBack
                name={'arrow-back-outline'}
                size={23}
                color="white"
                style={{margin:0, alignContent: 'center'}}
                onPress={()=> navigation.goBack()}
              />
            </View>
            <View style={{position:'absolute', right:20, top: 20}}> 
              <Trash
                name={'trash-outline'}
                size={23}
                color="white"
                style={{alignContent: 'flex-end', margin:0}}
              />
            </View>
          </View>
    );
}
const styles = StyleSheet.create({
  preview: {
    flex: 1,
    backgroundColor: '#000',
  }, 
  closeButton: {
    borderRadius: 100,
     width: 50, 
     height: 50, 
     backgroundColor:'white', 
     alignSelf:'center',
  }
})

