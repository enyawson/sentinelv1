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
            presidential:[
                {
                id: 1,
                candidateImage: '',
                candidateName: " ",
                partyImage: " ",
                partyName: " ",
                result: " ",  
            },
            {
                id: 1,
                imageOfCandidate: ' ',
                partyImage: '',
                candidateName: '',
                result: ' ' 
              },
           
            ]
            
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
    setResult(text){
        this.setState({
            result : text
        });
    }

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
                            placeholder: "select polling station code or Name ",
                            underlineColorAndroid: "transparent",
                            fontSize:16,
                            height: 40,
                            
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
                    {/* presidential and parliamentary result  */}
                <View style={{ flex: 0.1,flexDirection:'row', backgroundColor: '', justifyContent:'center'}}>
                    <TouchableOpacity style={styles.presidential}>
                        <Text style={{alignSelf:'center', color:'gray'}}>
                            PRESIDENTIAL
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.parliamentary}>
                        <Text style={{alignSelf:'center', color:'gray'}}>
                            PARLIAMENTARY
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:1,backgroundColor: '',flexDirection:'column',margin:5 }}>
                <View style={{backgroundColor:'', flexDirection:'row', flex:0.2,borderRadius:5,elevation:2}}>
                    <View style={{backgroundColor: '#1D5179', width: 50,marginLeft: 5,justifyContent:'center'}}>
                        <Text style={{alignSelf:'center', color: 'white', fontSize: 20}}>1</Text>
                    </View>
                    <View style={{backgroundColor: '', width: 100, height: 100,justifyContent:'center'}}>
                        <View>
                        <Image 
                        style={styles.imageInBox}
                        source = { require('../assets/politicalCandidate.png') } />
                           <Text style={{alignSelf:'center', fontSize:12}}>
                               name: candidate 
                           </Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: '', width: 100, height: 100,justifyContent:'center'}}>
                        <Image 
                        style={styles.partyImage}                        source = { require('../assets/NDP_Ghana_logo.png') } />
                           <Text style={{alignSelf:'center', fontSize:18}}>
                               NDP
                           </Text>
                    </View>
                    <View style={{backgroundColor: '', width: 100, height: 100,justifyContent:'center',marginRight: 5}}>
                        <TextInput 
                                style={{height: 40, 
                                marginLeft: 5}}
                                onChangeText={(text) => 
                                this.setResult(text)
                                }
                                textAlignVertical={'top'}
                                value={this.state.result}
                                multiline={false}
                                placeholder={' Enter result'}
                                fontSize={14}
                                enablesReturnKeyAutomatically={true}
                            > 
                        </TextInput>
                    </View>

                </View>
                  
                {/* <FlatList
                data= {}
                keyExtractor={(item, index)=> index.toString()}
                renderItem={ ({ item }) => (  
                    
                   <View>   </View>
                )   
                }
                /> */}
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
        width: 140,
        height: 35,
        alignSelf: 'center',
        justifyContent:'center',
        borderRadius:5, 
        borderWidth: 1,
        borderColor:'gray',
        backgroundColor: '#ffffff',
        marginLeft: 10,
        marginRight:10,


    },
    parliamentary:{
        width: 140,
        height: 35,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius:5,  
        borderRadius:5, 
        borderWidth: 1,
        borderColor:'gray',
    },
    imageInBox:{
        width: 70,
        height: 70,
        justifyContent:'center',
        alignSelf: 'center',
    
    },
    partyImage:{
        width: 60,
        height: 60,
        justifyContent:'center',
        alignSelf: 'center',
    
    }
    
})