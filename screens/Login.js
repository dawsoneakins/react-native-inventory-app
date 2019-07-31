import React from 'react'
import {TextInput, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {NavigationScreenProp, NavigationState} from 'react-navigation'
import { Button } from 'react-native-elements';

import {mainstyles} from '../Shared/mainstyles'
import * as dblib from '../src/lib/DBLib.js';
import * as globState from '../Shared/GlobalState.js'

 class Login extends React.PureComponent {
   static navigationOptions = ({navigation}) => ({

       header: null
   })


     constructor(props) {
         super(props)
         this.state = {
            navigation: this.props.navigation,
            username: '',
            password: '',
          }
     }

     _login = async () => {
      const response = await dblib.checkLogin(this.state.username, this.state.password)
      if (response == -1) {
        this.setState(state => {return {...state, errMsg: "Your username or password is incorrect."}})
      }
      else {
        globState.updateCurrentUser(response);
        this.props.navigation.navigate('App');
      }


    }


    render() {
        return(
        <View style={mainstyles.centeredContainer}>
          {this.props.navigation.getParam('message', false) &&
            <Text style={{fontSize: 20, marginBottom: 10}}>
              {this.props.navigation.state.params.message}
            </Text>}
              <Text style={{fontSize: 20, marginBottom: 10}}>{this.state.errMsg}</Text>
            <View style={styles.inputContainer}>

                <TextInput style={mainstyles.inputBox}
                  placeholder="Username"
                  onChangeText={text => this.setState(state => {return {...state, username: text}})}/>
            </View>
            <View style={styles.inputContainer}>

                <TextInput style={mainstyles.inputBox}
                  placeholder="Password"
                  secureTextEntry={true}
                    onChangeText={text => this.setState(state => {return {...state, password: text}})}/>
            </View>
            <View style={mainstyles.buttonRow}>
              <Button
                title="Sign Up"
                type="outline"
                raised
                titleStyle={mainstyles.buttonPadding}
                onPress={()=>this.props.navigation.navigate('AccountSignUp') }
              />
              <Button
                title="Sign In"
                type="solid"
                raised
                titleStyle={mainstyles.buttonPadding}
                onPress={() => this._login()}



              />
            </View>


        </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    inputText: {
        fontSize: 20,
        width: '25%'
    },
    newUserText: {
        fontWeight: 'bold',
        fontSize: 20,
        width: '25%'
    }

})

export default Login
