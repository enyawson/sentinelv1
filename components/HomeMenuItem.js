// import React, {Component} from 'react';

// import {View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Menu, {MenuItem, MenuDivider } from 'react-native-material-menu';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default class HomeMenuItem extends Component{
//     //private variable menu
//     _menu = null;

//     setMenuRef = ref =>{
//         this._menu = ref;
//     };

//     hideMenu = () => {
//         this._menu.hide();
//     };

//     showMenu = () => {
//         this._menu.show();
//     };

//     openActivityList = () =>{
//         this._menu.hide();
//         this.props.openActivityList();
//     }
//     logOut = () => {
//         this._menu.hide();
//         this.props.logOut();
//     }

//     render(){
//         return (
//             <View style={styles.container}>
//                 <Menu
//                     ref={this.setMenuRef}
//                     button ={
//                     <TouchableOpacity onPress={this.showMenu}>
//                         <Icon
//                             name={'ellipsis-vertical'} 
//                             size={24}
//                             color="black"
//                             style={{ marginRight: 18 }}
//                             onPress={this.showMenu}   
//                             />
//                     </TouchableOpacity>}
//                 >
//                     <MenuItem  onPress={this.openActivityList}> Activity</MenuItem>
//                     <MenuDivider />
//                     <MenuItem  onPress={this.logOut}> Log Out</MenuItem>
//                 </Menu>
//             </View>
           
//         );
//     }
        
//     }
    
// const styles= StyleSheet.create({
//     container: {
//         flex: 1, 
//         alignItems: 'center',
//         justifyContent: 'center',
//     }

// })
