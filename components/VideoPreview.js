import React from 'react';

import {
    StyleSheet, View,

} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Video from 'react-native-video';


export default class VideoPreview extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});

        this.state ={
           repeat: false,
           muted: false,
           volume: 1,
           resizeMode: 'contain',//mode: none, cover, stretch, contain
           duration: 0.0, //video's duration set on event onLoad
           currentTime: 0.0, //set on event onProgress
           paused: true, //check if video is pausing or not
           rateText: '1.0', //rate value in component Picker
           pausedText: 'play',//view to user: 'Play'-when video is pausing, 
           //'Pause' when video is playing
           hideControls: false,//hide control button when video is playing and show it 
           //when user clicks on video
        } 
       
        
    }


componentDidMount(){
    console.log('video preview mounted')
}
componentWillUnmount(){
}
componentDidUpdate(){
}

//  onLoad = (data) => {
//      //set duration
//      this.setState({duration: data.duration});
//  }
//  onProgress = (data)=> {
//      //set current time
//      this.setState({currentTime: data.currentTime});
//  }

//  onEnd = ()=>{
//      //set pausedText and paused, set video current time to 0
//      this.setState({pausedText: 'Play', paused: true});

//      this.video.seek(0);
//  }
    render()
    {
        const { itemToPreview } = this.props.route.params;
        console.log("itemToPreview :"+ itemToPreview);
        return(
        <View style={styles.container}>
            <TouchableOpacity
            style={styles.fullScreen}
            onPress={()=> this.setState({paused: !this.state.paused})}>
                <Video source={require('../assets/funny_cat.mp4')}
                    ref={(ref)=> {this.video = ref }}
                    style ={styles.fullScreen}
                    repeat={this.state.repeat}
                    rate={this.state.rate}
                    volume ={this.state.volume}
                    muted = {this.state.muted}
                    resizeMode={this.state.resizeMode}
                    paused = {this.state.paused}
                    onLoad ={this.onLoad}
                    onProgress = {this.onProgress}
                    onEnd = {this.onEnd}
                    onBuffer ={this.onBuffer}
                    onError = {this.videoError}/>

            </TouchableOpacity>
         </View>
        );

    }
   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'black'
    },

    text: {
        fontFamily: 'roboto',
        fontSize: 16,
        fontWeight: 'bold', 
    }, 
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
   
    
    
})