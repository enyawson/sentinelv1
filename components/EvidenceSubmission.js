import React from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    Image, 
    TouchableOpacity,
    Pressable,
    StatusBar,
} from 'react-native';
import globalStyle from '../components_styles/globalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';


export default function EvidenceSubmission ({navigation}){

   
    return(
        
        <View style= {globalStyle.MainContainer}>
         <StatusBar barStyle="light-content" backgroundColor="#1D5179"/>
            <View flexDirection='column' marginTop={20} 
            marginRight ={10}
            marginLeft ={10}
            borderWidth={1}
            borderColor='#7E7E7E'
            >
                <View styles={[styles.contentContainer, styles.imageContainer]}>
                    <ScrollView 
                        horizontal={true}
                        pagingEnabled={false}
                        showsHorizontalScrollIndicator={false}>
                        <Image 
                            style={styles.image}
                             source = { require('../assets/10fdcd199128418af42afd4b91d762a7.jpg') }>
                        </Image>
                        <Image 
                            style={styles.image}
                             source = { require('../assets/0ed1d28683ac1d158f80a4fea80629a1.jpg') }>
                        </Image>
                        <Image 
                            style={styles.image}
                             source = { require('../assets/6507381cd3361b79d0cfe921af583598.jpg') }>
                        </Image>
                        <Image 
                            style={styles.image}
                             source = { require('../assets/6507381cd3361b79d0cfe921af583598.jpg') }>
                        </Image>
                        <Image 
                            style={styles.image}
                             source = { require('../assets/6507381cd3361b79d0cfe921af583598.jpg') }>
                        </Image>
                    </ScrollView>
                </View> 
                 <TouchableOpacity style={styles.moreView}>
                        <Icon
                        name={'add-outline'} 
                        size={34}
                        color="black"
                        style={styles.moreIcon}
                        />
                 </TouchableOpacity> 
            </View>
            <View backgroundColor='red' margin={10}>
                <Text style={styles.textStyle}>
                    Type Of Incidence
                </Text>
            </View>
           
        
        </View>
    );
}

const styles = StyleSheet.create({

    imageContainer: {
        flexDirection: 'row',
    },
    image: {
        width: 113,
        height: 110,
        overflow: 'hidden',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    contentContainer: {
        paddingVertical: 20,
      
    },
    moreIcon: {
        alignSelf: 'center',  
        justifyContent:'center',
        margin: 1,
        
    },
    moreView:{
        backgroundColor:'#E7E7E7',
        borderRadius:20,
        alignSelf:'center',
        elevation: 6,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginBottom: 10,
    },
    textStyle:{
        
        marginLeft: 40,
        fontSize: 14,   
        fontFamily: 'roboto',
    }

    
})