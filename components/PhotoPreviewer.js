import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import PhotoLogic from './PhotoLogic';


export default  function PhotoPreviewer({route, navigation}){


 const {otherParam} = route.params
    return(
        <View style={styles.preview}>
          <Text>
          {JSON.stringify(otherParam)}
          </Text>

        </View>
    );
}
const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  }, 
})

