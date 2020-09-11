import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import ArrowBack from 'react-native-vector-icons/Ionicons';
import  Trash from 'react-native-vector-icons/Ionicons';

export default  function PhotoPreviewer({route, navigation}){


  let { transferredImageItem }= route.params
    return(
        <View style={styles.preview}>
          <View style={{flexDirection: 'row'}}> 
            <ArrowBack
              name={'arrow-back-outline'}
              size={23}
              color="white"
              style={{margin:15, alignContent: 'center'}}
              onPress={()=> navigation.goBack()}
            />
            <Trash
              name={'arrow-back-outline'}
              size={23}
              color="white"
              style={{alignContent: 'flex-end'}}
            />
          </View>
          
          
          <Image
              style={{ width:400, height:400, resizeMode:'cover'}}   
              source = {{ uri: "file://"+ transferredImageItem}} 
          />

        </View>
    );
}
const styles = StyleSheet.create({
  preview: {
    flex: 1,
    
  }, 
})

