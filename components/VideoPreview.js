import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import AsyncStorage from '@react-native-community/async-storage';

export default function videoPreview (route, navigation){
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [ 
        playerState, setPlayerState
    ] = useState(PLAYER_STATES.PLAYING);
    const[screenType, setScreenType] = useState('content');
    const [videoOrImage, setVideoOrImage] = useState('');

     // receive image data from previous page to preview
    //  const { itemToPreview } = route.params;
    //  console.log(itemToPreview)

    useEffect(() => {
        // retrieve video or image to be previewed
        getData();
      
        return () => {
            
        }
    }, [videoOrImage])

    // Retrieving image of video to be displayed 
    const getData = async()=>{
        try {
            const value = await AsyncStorage.getItem('previewVideoOrImage')
            console.log('Value of preview Data'+ value)
            if (value !== null){
                //set state of the previewed image or video
                setPreviewImageOrVideo(value);
            }
        } catch (e){
            console.log('error occurred in getting store activity preview data')
        }

    }

    // setting state of image or video to be previewed
    const setPreviewImageOrVideo = (path) =>{
        setVideoOrImage(path);
    }

    const onSeek = (seek)=> {
        //Handler for change in seekBar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) =>{
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onProgress = (data) => {
        //video Player will progress continue even if it ends
        if (!isLoading  && playerState !== PLAYER_STATES.ENDED){
            setCurrentTime(data.currentTime);
        }
    };

    const onReplay = ()=> {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onLoad = (data)=>{
        setDuration(data.duration);
        setIsLoading(false)
    }

    const onLoadStart = (data) => setIsLoading(true);
    
    const onEnd = ()=> setPlayerState(PLAYER_STATES.ENDED);

    const onError = () => alert ('error');

    const exitFullScreen =  ()=> {};

    const onFullScreen = ()=> {
        setIsFullScreen(isFullScreen);
        if(screenTYpe == 'content') 
        {
            setScreenType('cover')
        }else{
            setScreenType('content')
        }
        
    }

    const renderToolbar = ()=> (
        <View>
           <Text style={styles.toolbar}>toolbar</Text> 
        </View>
    )
    const onSeeking = (currentTime)=> setCurrentTime(currentTime);


    return (
          <View style ={{flex: 1}}>
              <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                onProgress={onProgress}
                paused={paused}
                ref={videoPlayer}
                resizeMode={screenType}
                source={{
                    uri: videoOrImage
                }
                }
                style={styles.mediaPlayer}
                volume={10}
                />

                <MediaControls 
                    duration={duration}
                    isLoading={isLoading}
                    mainColor = "rgba(12, 83, 175, 0.2)"
                    onFullScreen={onFullScreen}
                    onPaused={onPaused}
                    onReplay={onReplay}
                    onSeek = {onSeek}
                    onSeeking={onSeeking}
                    playerState={playerState}
                    progress={currentTime}
                    toolbar={renderToolbar()}
                /> 
            
            </View>   



    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding:10,
        borderRadius: 5,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left:0,
        bottom: 0,
        right: 0,
        backgroundColor:'black',
        justifyContent: 'center',
    },
})