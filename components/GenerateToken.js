import axios from 'axios';
import {APIKEY, MAIN_URL, TOKEN_URL} from '../components/ConstantUrls';
import AsyncStorage from '@react-native-community/async-storage';

export const generateToken = () => {
    const data = JSON.stringify({"apikey": APIKEY});
    const config = {
        method: 'post',
        url: TOKEN_URL,
        headers: {
            'Accept': 'application/json',
            'content-Type': 'application/json'
        },
        data : data,
    };
    axios(config)
    .then(function (response){
 
    //console.log(JSON.stringify(response.data.data.accessToken));
        return response
    // AsyncStorage.setItem('generatedToken',response.data.data.accessToken);
    })
    .catch(function (error){
    console.log(error);
    })
}