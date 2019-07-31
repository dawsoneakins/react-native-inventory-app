import React from 'react'
import ReactNative from 'react-native'
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Modal
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {NavigationScreenProp, NavigationState, NavigationActions} from 'react-navigation'
import {Button} from 'react-native-elements'
import * as dblib from '../src/lib/DBLib.js';


import {mainstyles, colorstyles} from '../Shared/mainstyles'

const FormRow = props => (
  <View style={styles.formRow}>
  <Text style={styles.formRowText}>{props.field}</Text>
  <TextInput secureTextEntry={(
      props.field == 'Password' || props.field == 'Confirm Password')
      ? true
      : false} style={styles.inputBox} value={props.value} placeholder={props.field} onChangeText={props.onChange}/>
  </View>
)

class ItemDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log(props.navigation.state.params.name);
    }
state = {
    item: {
        name: this.props.navigation.state.params.name || null,
        itemCode: this.props.navigation.state.params.itemCode || null,
        description: this.props.navigation.state.params.description || null,
        price: this.props.navigation.state.params.price || null,
        category: this.props.navigation.state.params.category || null,
        barcode: this.props.navigation.state.params.barcode || null,
        user: this.props.navigation.state.params.user || null,
        cost: this.props.navigation.state.params.cost || null,
        itemCount: this.props.navigation.state.params.itemCount || 0,
        minThreshold: this.props.navigation.state.params.minThreshold || null
    },
    modalVisible: false,
    operation: this.props.navigation.getParam('operation', 'add'),
    errorMsg: "",
}

  _verifyForm = async => {
      let verified = false;
      console.log("Starting verification");
      if (this.state.item.name == "" || this.state.item.name == null) {
        this.setState(state => {return {...state, errorMsg: "The name of the item should not be empty."}});
        console.log("Item name incorrect")
      }
      else if ((this.state.item.itemCount != "" && this.state.item.itemCount != null)
        && !/^\d+$/.test(this.state.item.itemCount)) {
        this.setState(state => {return {...state, errorMsg: "The count should be a number."}});
      }
      else if ((this.state.item.minThreshold != "" && this.state.item.minThreshold != null) &&
        !/^\d+$/.test(this.state.item.minThreshold)) {
        this.setState(state => {return {...state, errorMsg: "The mininum threshold should be a number."}});
      }
      else if ((this.state.item.price != "" && this.state.item.price != null) &&
          (!/^[0-9]*\.[0-9][0-9]+$/.test(this.state.item.price) && !/^\d+$/.test(this.state.item.price))) {
        this.setState(state => {return {...state, errorMsg: "Price should be in a number or decimal format."}});
      }
      else {
        verified = true;
      }
      return verified;
  }

  _itemUpdate = async () => {
    let verified = await this._verifyForm();
    if (verified) {
      dblib.updateEntireItem(this.state.item.itemCode, this.state.item);
      this.props.navigation.navigate(this.props.navigation.state.params.from)
    }
    else {
      this.forceUpdate();
    }
  }

  _itemAdd = async () => {
    let verified = await this._verifyForm();
    if (verified) {
      dblib.addItemfromApp(this.state.item.itemCode || "default-code", this.state.item.category, this.state.item.description, this.state.item.itemCount || 0, this.state.item.minThreshold, this.state.item.name, this.state.item.price);
      this.props.navigation.navigate('ItemList');
    }
    else {
      this.forceUpdate();
    }
  }


  setModalVisible(visible) {
    this.setState((state) => {
      return {
        ...state,
        modalVisible: visible
      }
    });
  }



  stringify = value => {
    return value ? value.toString() : null
  }

  render() {
    return (<KeyboardAwareScrollView scrollEnabled={true} contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      {<TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.from)}
        style={{width: '100%', paddingLeft: 5, paddingTop: 2}}>
        <Text style={{width: '100%', textAlign: 'left', color: '#4c98cf', fontSize: 18}}>Back to List</Text>
      </TouchableOpacity>}
      {this.state.operation == 'add'
          ? (<Text style={mainstyles.title}>Create An Item</Text>)
          : (<Text style={mainstyles.title}>Update Item</Text>)
      }
      <Text style={{fontSize: 18, paddingBottom: 10, color: colorstyles.mediumBlue}}>{this.state.errorMsg}</Text>
      <Modal animationType="fade" transparent={true} visible={this.state.modalVisible}>
              <View style={mainstyles.modal}>
                <Text style={{
                    fontSize: 22,
                    textAlign: 'center',
                    paddingBottom: 20
                  }}>Delete item?</Text>
                <Button raised onPress={() => {
                    this.setModalVisible(false)
                    dblib.deleteItem(this.state.item.itemCode)
                    this.props.navigation.navigate(this.props.navigation.state.params.from)
                }} title="Delete" titleStyle={[mainstyles.buttonPadding, {width: '75%'}]}/>
                <View style={{
                    height: 15
                  }}/>
                <Button type='outline' raised onPress={() => {
                    this.setModalVisible(false)
                  }} title="Close" titleStyle={[mainstyles.buttonPadding, {width: '75%'}]}/>
              </View>
            </Modal>
            <FormRow field="Item Name" value={this.stringify(this.state.item.name)} onChange={(text) => this.setState(prevState => {
         return {
           ...prevState,
           item: {
             ...prevState.item,
             name: text
           }
         }
       })}/>
     <FormRow field="Item Code" value={this.stringify(this.state.item.itemCode)} onChange={(text) => this.setState(prevState => {
          return {
            ...prevState,
            item: {
              ...prevState.item,
              itemCode: text
            }
          }
        })}/>
      <FormRow field="Description" value={this.stringify(this.state.item.description)} onChange={(text) => this.setState(prevState => {
          return {
            ...prevState,
            item: {
              ...prevState.item,
              description: text
            }
          }
        })}/>
      <FormRow field="Price" value={this.stringify(this.state.item.price)} onChange={(text) => this.setState(prevState => {
          return {
            ...prevState,
            item: {
              ...prevState.item,
              price: text
            }
          }
        })}/>
      <FormRow field="Category" value={this.stringify(this.state.item.category)} onChange={(text) => this.setState(prevState => {
          return {
            ...prevState,
            item: {
              ...prevState.item,
              category: text
            }
          }
        })}/>
      <FormRow field="Item Count" value={this.stringify(this.state.item.itemCount)} onChange={(text) => this.setState(prevState => {
          return {
            ...prevState,
            item: {
              ...prevState.item,
                itemCount: text
            }
          }
        })}/>
      <FormRow field="Minimum Threshold" value={this.stringify(this.state.item.minThreshold)} onChange={(text) => this.setState(prevState => {
          return {
            ...prevState,
            item: {
              ...prevState.item,
              minThreshold: text
            }
          }
        })}/>


      {this.state.operation == 'add' && (<View style={mainstyles.buttonRow}>
        <Button title="Add New Item" type="solid" raised titleStyle={mainstyles.buttonPadding} onPress={this._itemAdd}/>
      </View>)}
      {this.state.operation == 'edit' && (<View style={mainstyles.buttonRow}><Button
          title="Delete Item"
          type="outline"
          raised
          titleStyle={mainstyles.buttonPadding}
          onPress={() => {
                this.setModalVisible(true)
              }}/>
        <Button
          title="Update Item"
          type="solid"
          raised
          titleStyle={mainstyles.buttonPadding}
          onPress={this._itemUpdate}
        />
    </View>) }
      <View style={{
          height: 50
        }}/>
    </KeyboardAwareScrollView>)
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000099'
  },
  inputContainer: {
    flex: .1,
    flexDirection: 'row'
  },
  inputText: {
    color: '#ccffff',
    fontSize: 20
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  formRowText: {
    fontSize: 25,
    width: '40%',
  },
  inputBox: {
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    width: '50%',
    paddingLeft: 2,
    fontSize: 20,
  },
})

export default ItemDetails
