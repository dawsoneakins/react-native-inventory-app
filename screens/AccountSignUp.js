import React from 'react'
import ReactNative from 'react-native'
import {TextInput, StyleSheet, TouchableOpacity, Text, View} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {NavigationScreenProp, NavigationState} from 'react-navigation'
import {Button} from 'react-native-elements'
import * as dblib from '../src/lib/DBLib';

import {mainstyles, colorstyles} from '../Shared/mainstyles'




const FormRow = props => (
  <View style={mainstyles.inputContainer}>
    <TextInput
     secureTextEntry={(props.field == 'Password' || props.field == 'Confirm Password') ? true : false }
     style={mainstyles.inputBox}
     value={props.value}
     placeholder={props.field}
     onChangeText={props.onChange}
     />
  </View>
)


class AccountSignUp extends React.PureComponent {
    static navigationOptions = ({navigation}) => ({

        headerStyle: (
            <TouchableOpacity
            onPress={()=> navigation.goBack}
            >
                <Text>
                    Back
                </Text>
            </TouchableOpacity>
        )
    })
    constructor(props){
        super (props);
        this.state = {
            account: {
              email: '',
              username: '',
              pass: '',
              firstName: '',
              lastName: '',
              address: '',
              city: '',
              state: '',
              zip: '',
              phoneNumber: ''},
            confirmPassword: '',
            errorMsg: ''
        }
    }
    // InputInfo(value) {
    //     return (
    //         <View style={styles.inputContainer}>
    //             <Text style={styles.inputText}>{value}</Text>
    //             <TextInput/>
    //         </View>
    //     )
    // }

   _confirmPassword = (pass, confPass) => {
     if (pass === confPass) {
       return true
     }
     return false
   }

   _formVerification = () => {
     let passwordCheck = this._confirmPassword(this.state.account.pass, this.state.confirmPassword);
     if (!passwordCheck) {
       this.setState(state => {return {...state, errorMsg: "The passwords don't match."}});
       return false;
     }
    for (var prop in this.state.account) {
       console.log("a cycle")
       console.log(this.state.account[prop]);
       if (this.state.account[prop] === '') {
         this.setState(state => {return {...state, errorMsg: "Fields should not be empty."}});
         return false;
       }
     }
     return true;
   }

    render() {
        const {navigation, email, username, password, confirmPassword, firstName, lastName, address, city, state, zip, phoneNumber} = this.props
        return (
        <KeyboardAwareScrollView
          scrollEnabled={true}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingTop: 10}}
         >

           <Text style={mainstyles.title}>Create a New Account</Text>

           <FormRow field="Email" value={this.state.account.email}
             onChange={(text) => this.setState(state => {return {...state, account: {...this.state.account, email: text}}})}  />
           <FormRow field="Username" value={this.state.account.username}
             onChange={(text) => this.setState(state => {return {...state, account: {...this.state.account, username: text}}})} />
           <FormRow field="Password" value={this.state.account.pass}
             onChange={(text) => this.setState(state => {return {...state, account: {...this.state.account, pass: text}}})} />
           <FormRow field="Confirm Password" value={this.state.confirmPassword}
             onChange={(text) => this.setState(state => {return {...state, confirmPassword: text}})} />
           <FormRow field="First Name" value={this.state.account.firstName}
             onChange={(text) => this.setState(state => {return {...state, account: {...this.state.account, firstName: text}}})} />
           <FormRow field="Last Name" value={this.state.account.lastName}
             onChange={(text) => this.setState(state => {return {...state, account: {...this.state.account, lastName: text}}})} />
           <FormRow field="Address" value={this.state.account.address}
             onChange={(text) => this.setState(state => {return {...state, account: {...this.state.account, address: text}}})} />
           <FormRow field="City" value={this.state.account.city}
             onChange={(text) => this.setState(state => {return {...state, account: {...this.state.account, city: text}}})} />
           <FormRow field="State" value={this.state.account.state}
             onChange={(text) => this.setState(state => {return {...state, account: {...this.state.account, state: text}}})} />
           <FormRow field="Zip Code" value={this.state.account.zip}
             onChange={(text) => this.setState(state => {return {...state, account: {...this.state.account, zip: text}}})} />
           <FormRow field="Phone" value={this.state.account.phoneNumber}
             onChange={(text) => this.setState(state => {return {...state, account: {...this.state.account, phoneNumber: text}}})} />

           <Text style={{fontSize: 18, color: colorstyles.mediumBlue, marginTop: 10, marginBottom: 10}}>
             {this.state.errorMsg}
           </Text>
             <Button
               title="Create Account"
               type="solid"
               raised
               titleStyle={mainstyles.buttonPadding}
               onPress={
                 async () =>
                 {
                   if (this._formVerification()) {
                   let accountId = await dblib.addAccount(this.state.account);
                   dblib.addUser(
                     this.state.account.username,
                     this.state.account.firstName,
                     this.state.account.lastName,
                     this.state.account.email,
                     this.state.account.pass,
                     true,
                     true,
                     true,
                     true,
                     accountId
                   )
                   this.props.navigation.navigate('MyLogin', {message: "Your account has been created."});
                   }
                 }}
             />

        <View style={{height: 50}} />
      </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 15
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default AccountSignUp
