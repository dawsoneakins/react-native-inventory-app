import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  RefreshControl
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import {FormRow, styles} from '../components/UserForm'
import {mainstyles , colorstyles} from '../Shared/mainstyles'
import * as dblib from '../src/lib/DBLib';
import * as globState from '../Shared/GlobalState.js'

export default class UserProfileScreen extends React.Component {

  componentWillMount() {
    let path = this.props.navigation.getParam("from", null);
    if (path == null) {
      this.setState(state => {return {...state, user: globState.GlobalStateVar.currentUser}})
    }
  }

  state = {
    refreshing: false,
    user: this.props.navigation.getParam('user', {
      key: '',
      firstName: '',
      lastName: '',
      email: '',
      isAdmin: false,
      canAdd: false,
      canUpdate: false,
      canDelete: false,
      pass: ''
    }),
    loggedInUser: globState.GlobalStateVar.currentUser || {
        key: '',
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: false,
        canAdd: false,
        canUpdate: false,
        canDelete: false,
        pass: ''
    },
    operation: this.props.navigation.getParam('operation', 'update'),
    modalVisible: false,
    passConfirm: '',
  };

  setModalVisible = (visible) => {
    this.setState(prevState => {return {...prevState, modalVisible: visible}})
  }

  toggleAdmin = toggled => {
    console.log("Admin = " + this.state.user.isAdmin)
    this.setState(state => {
      return {...state, user: {...state.user, isAdmin: !toggled}}});
  }

  toggleCanAdd = toggled => {
    this.setState(state => {return {...state, user: {...state.user, canAdd: !toggled}}})
  }

  toggleCanUpdate = toggled => {
    this.setState(state => {return {...state, user: {...state.user, canUpdate: !toggled}}})
  }

  toggleCanDelete = toggled => {
    this.setState(state => {return {...state, user: {...state.user, canDelete: !toggled}}})
  }

  _updateUser = () => {
    dblib.updateEntireUser(this.state.user.key, this.state.user);
    this.props.navigation.navigate("UserList");
  }

  _passwordsMatch = (pass, conf) => {
    if (pass === conf) {
      return true
    }
    return false
  }


  render() {
    return (
      <ScrollView style={styles.container}      >
          <View>
            {this.props.navigation.getParam('from', null) && <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.from)}
              style={{width: '100%', paddingLeft: 5, paddingTop: 2}}>
              <Text style={{width: '100%', textAlign: 'left', color: '#4c98cf', fontSize: 18}}>Back to List</Text>
            </TouchableOpacity>}
            <Modal animationType="fade" transparent={true} visible={this.state.modalVisible}>
                <View style={mainstyles.modal}>
                  <Text style={{
                      fontSize: 22,
                      textAlign: 'center',
                      paddingBottom: 20
                    }}>Update Password</Text>
                  <Text style={{
                      fontSize: 18,
                      color: colorstyles.mediumBlue,
                      textAlign: 'center',
                      paddingBottom: 20
                    }}>{this.state.errorMsg}</Text>
                  <TextInput style={[mainstyles.inputBox, {marginBottom: 10}]} placeholder="New Password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState(
                        prevState => {return {...prevState, user: {...prevState.user, pass: text}}}) }/>
                  <TextInput style={[mainstyles.inputBox, {marginBottom: 10}]} placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState(
                        prevState => {return {...prevState, passConfirm: text}}) }/>
                    <Button raised title="Update" titleStyle={[mainstyles.buttonPadding, {width: '75%'}]}
                      onPress={() =>{
                        if (this._passwordsMatch(this.state.user.pass, this.state.passConfirm)) {
                          dblib.updateEntireUser(this.state.user.key, this.state.user);
                          this.setModalVisible(false);
                          this.setState(state => {return {...state, errorMsg: ''}})
                        } else {
                          this.setState(state => {return {...state, errorMsg: "Passwords do not match."}});
                        }
                      }}/>
                  <View style={{
                      height: 15
                    }}/>
                  <Button type='outline' raised onPress={() => {
                      this.setModalVisible(false)
                    }} title="Close" titleStyle={[mainstyles.buttonPadding, {width: '75%'}]}/>
                </View>
              </Modal>


            {this.state.operation == 'update' ?
            <Text style={styles.title}>User Profile</Text>
            : <Text style={styles.title}>Add A User</Text>}
            <Text style={{
                fontSize: 18,
                color: colorstyles.mediumBlue,
                textAlign: 'center',
                paddingBottom: 20
              }}>{this.state.errorMsg}</Text>
            <FormRow
                label="User ID:"
                type="text"
                text={this.state.user.key}
                permissions={this.state.loggedInUser.isAdmin}
                onChange={(text) => this.setState(
                    prevState => {return {...prevState, user: {...prevState.user, key: text}}}
                )}
            />
            <FormRow
              label="First Name:"
              type="text"
              text={this.state.user.firstName}
              permissions={this.state.loggedInUser.isAdmin}
              onChange={(text) => this.setState(
                prevState => {return {...prevState, user: {...prevState.user, firstName: text}}}
              )}
            />
            <FormRow
                label="Last Name:"
                type="text"
                text={this.state.user.lastName}
                permissions={this.state.loggedInUser.isAdmin}
                onChange={(text) => this.setState(
                    prevState => {return {...prevState, user: {...prevState.user, lastName: text}}}
                )}
            />
            <FormRow
                label="Email:"
                type="text"
                text={this.state.user.email}
                permissions={this.state.loggedInUser.isAdmin}
                onChange={(text) => this.setState(
                    prevState => {return {...prevState, user: {...prevState.user, email: text}}}
                )}
            />
            <FormRow
              label="Can Add:"
              type="check"
              checked={this.state.user.canAdd || this.state.user.isAdmin}
              permissions={this.state.loggedInUser.isAdmin}
              click={() => this.toggleCanAdd(this.state.user.canAdd)}
            />
            <FormRow
              label="Can Update:"
              type="check"
              checked={this.state.user.canUpdate || this.state.user.isAdmin}
              permissions={this.state.loggedInUser.isAdmin}
              click={() => this.toggleCanUpdate(this.state.user.canUpdate)}
            />
            <FormRow
              label="Can Delete:"
              type="check"
              checked={this.state.user.canDelete || this.state.user.isAdmin}
              permissions={this.state.loggedInUser.isAdmin}
              click={() => this.toggleCanDelete(this.state.user.canDelete)}
            />
            <FormRow
              label="Admin:"
              type="check"
              checked={this.state.user.isAdmin}
              permissions={this.state.loggedInUser.isAdmin}
              click={() => this.toggleAdmin(this.state.user.isAdmin)}
            />
          {this.state.operation == 'update' ? <FormRow label="Password:" type="button" buttonText="Change Password"
            press={() => this.setModalVisible(true)} /> :
              (<View>
                <FormRow
                label="Password:"
                type="password"
                text={this.state.user.password}
                permissions={this.state.loggedInUser.isAdmin}
                onChange={(text) => this.setState(
                    prevState => {return {...prevState, user: {...prevState.user, pass: text}}}
                )}
              />
              <FormRow
                label="Confirm Password:"
                type="password"
                text={this.state.passConfirm}
                permissions={this.state.loggedInUser.isAdmin}
                onChange={(text) => this.setState(
                    prevState => {return {...prevState, passConfirm: text}})}

              />
            </View>) }
          </View>

          {this.state.operation == 'update' ?
            (<View style={[styles.buttonRow, {paddingBottom: 50}]}>

              {this.state.loggedInUser.key == this.state.user.key && (<Button
                title="Log Out"
                type="outline"
                raised
                titleStyle={styles.buttonPadding}
                onPress={() => {this.props.navigation.navigate('MyLogin', {message: "You have logged out."})}}
              />)}
              <Button
                title="Update"
                type="solid"
                raised
                titleStyle={styles.buttonPadding}
                onPress={() => {
                  this._updateUser();
                }
              }
              />
            </View>)
            : (
              <View style={styles.buttonRow}>
                <Button
                title="Add User"
                type="solid"
                raised
                titleStyle={styles.buttonPadding}
                onPress={() => {
                  if (this._passwordsMatch(this.state.user.pass, this.state.passConfirm)) {
                    dblib.addUser(this.state.user.key,
                        this.state.user.firstName,
                        this.state.user.lastName,
                        this.state.user.email,
                        this.state.user.pass,
                        this.state.user.canAdd,
                        this.state.user.canUpdate,
                        this.state.user.canDelete,
                        this.state.user.isAdmin
                    );
                    this.props.navigation.navigate("UserList");
                  } else {
                    this.setState(state => {return {...state, errorMsg: "Passwords do not match."}});
                  }

                }}
                />
            </View>)
          }
          <View style={{padding: 5}} />
      </ScrollView>
    );
  }
}
