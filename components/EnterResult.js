import React, { useState, Fragment } from 'react';

import {
    StyleSheet, View, KeyboardAvoidingView,Text, Image, TouchableOpacity,StatusBar,
    TextInput, FlatList,ActivityIndicator, Platform
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

items = [
    {
      id: 1,
      name:'Ayawso-North Pol:CC0014',
    },
    {
      id: 2,
      name: 'Ablekuma-North Pol:CC0674',
    },
    {
      id: 3,
      name: 'Doodowa-Central Pol:CC0244',
    },
    {
      id: 4,
      name: 'Kasao-East Pol:CC0034',
    },
    {
      id: 5,
      name: 'Hafo-east Pol:CC00544',
    },
    {
      id: 6,
      name: 'Tain Pol:CC00554',
    },
    {
      id: 7,
      name: 'Paga  Pol:CC00454',
    },
    {
      id: 8,
      name: 'Boko Pol:CC0894',
    },
    {
        id: 9,
        name: 'Nima-Central Pol:CC0017', 
    }
    
  ];
// presidential:{
//     partyName: " ",
//     candidateName: " ",
//     result: " ",  
// },
// {
//     id: 1,
//     imageOfCandidate: ' ',
//     partyImage: '',
//     candidateName: '',
//     result: ' '

    
//   },
// parliamentary:{
//     partyName: " ",
//     candidateName: " ",
//     result: " ",  
// }

export default class EnterResult extends React.Component{
    constructor(props){
        super(props);
       // console.log({...props});

        this.state ={
            selectedItems:[
            // {
            //     id: 7,
            //     name: 'Praga Pol:CC0014',
            // },
            // {
            //     id: 8,
            //     name: 'Boko Pol:CC0014',
            // },
            // {
            //     id: 9,
            //     name: 'Nima Pol:CC0014',
            // }
            ],
        } 
    }


componentDidMount(){
}
componentWillUnmount(){
}
componentDidUpdate(){
}

    // getVerificationCode= (text) => {
    //     setVerificationCode(text);
    // }

    //  onFormSubmit (){
    //     //set the onSubmit state to true
    //     setOnSubmit(true);
    // }

    render()
    {
        return(
        <View style={styles.container}>
            <Fragment>
            {/* MultiSearch */}
                <SearchableDropdown
                    onItemSelect={(item) => {
                        const items = this.state.selectedItems;
                        items.push(item)
                        this.setState({ selectedItems: items });
                    }}
                    containerStyle = {{ padding: 5}}
                    onRemoveItem = {(item, index)=> {
                        const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                        this.setState({ selectedItems: items });
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222'}}
                    itemsContainerStyle={{ maxHeight: 140,
                    }}
                    items={items}
                    defaultIndex ={0}
                    resetValue={false}
                    textInputProps ={
                        {
                            placeholder: "select polling station code",
                            underlineColorAndroid: "transparent",
                            fontSize:16,
                            style: {
                                padding:12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 10,
                                
                            },
                            onTextChange: text => {
                                //check if text is in  the list
                                //as the user types in
                               alert(text) 
                            }
                        } 
                    }
                    listProps = {
                        {
                            nestedScrollEnabled: true,
                        }
                        
                    }
                    />
            </Fragment>
    
           
                <View style={{ flex: 1, backgroundColor: 'blue',}}>
                    
                </View>

                <View style={{flex:1,backgroundColor: 'yellow',}}>
                    
                </View>
            </View>
            
        
        );

    }
   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 0,
        backgroundColor: 'white'
    },
    contentContainer: {
    
    flex:1, 
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    
    },

    text: {
        fontFamily: 'roboto',
        fontSize: 16,
        fontWeight: 'bold', 
    }, 
    presidential:{
        width: 300,
        height: 40,
        justifyContent: 'center',
        borderRadius:5, 
        borderWidth: 1,
        borderColor:'#1D5179',
        backgroundColor: '#f0f0f0',


    },
    parliamentary:{
        width: 300,
        height: 40,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        borderRadius:5,  
        borderRadius:5, 
        borderWidth: 1,
        borderColor:'#1D5179'
    },
    
})