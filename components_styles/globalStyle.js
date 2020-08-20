import {StyleSheet} from 'react-native'

const globalStyle = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor:'#f0f0f0',
      },
      logo: {
        width: 55,
        height: 35,
        marginTop:15,
        marginLeft: 25,
      },
      logoName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop:12,
        marginLeft: 86,
        color: '#ed7055',
        alignItems: 'center'
      },
      headerContainer: {
        flex: 0.45,
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        marginTop: 12,
        justifyContent:'space-between',
        alignContent: 'center',
      
      },
    
      containerImage: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#f0f0f0',
        alignSelf: 'center',
        alignSelf: 'stretch',
        marginTop: 5,
      },
      
      instructionContainer: {
        flex: 0.2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        alignSelf: 'stretch',
      },
      image: {
        width: 325,
        height: 205,
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'auto',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: "darkslategray",
      },
      alarmButton: {
        flexDirection: 'row',
        backgroundColor: '#ed7055',
        height: 40,
        width: 330,
        borderRadius: 5,
        alignContent:'center',
        justifyContent: 'center',
        marginTop: 25,
        alignSelf: 'center',
      },
      
      buttonInRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        alignSelf: 'center',
        padding: 10,
        
      },
      box: {
        width: 88,
        height: 67,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#Ffffff',
        borderRadius: 10,
        elevation: 5,
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      imageInBox: {
        width: 23,
        height: 23,
        justifyContent: 'center',
        alignSelf:'center',
      },
    
      bottomContainer: {
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        marginTop: 30,
        marginLeft: 30,
        marginRight:30,
        marginBottom: 30,
        backgroundColor: '#f0f0f0',
      },
      text: {
        fontSize: 12,
        justifyContent: 'center',
        alignSelf: 'center',
      },
      textBottom: {
        fontSize: 26,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 5,
        alignContent:'center',
      
        color:'#ed7055'
      },
      textBottomA: {
        fontSize: 12,
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight:10, 
        alignContent:'center',
        color: '#ed7055'
      },
       shadowMaker:{
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
       },
    });
export default globalStyle;