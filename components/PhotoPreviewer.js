import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import  Trash from 'react-native-vector-icons/Ionicons';
import  Close from 'react-native-vector-icons/Ionicons';

export default  function PhotoPreviewer({route, navigation}){


  let { transferredImageItem }= route.params
    return(
        <View style={styles.preview}>
          <View style={{flexDirection: 'row', justifyContent:'space-between',marginBottom:50}}> 
            <ArrowBack
              name={'arrow-back-outline'}
              size={23}
              color="white"
              style={{margin:20, alignContent: 'center'}}
              onPress={()=> navigation.goBack()}
            />
            <Trash
              name={'trash-outline'}
              size={23}
              color="white"
              style={{alignContent: 'flex-end', margin:20}}
            />
        </View>
          
          <View style={{margin: 0,marginBottom:20, alignSelf:'center'}}>
              <Image
              style={{ width:600, height:400, resizeMode:'contain'}}   
              source = {{ uri: "file://"+ transferredImageItem}} 
            />
          </View>
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
     backgroundColor:'#8b8a8a', 
     alignSelf:'center',
  }
})

