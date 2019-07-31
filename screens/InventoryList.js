import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Image,
  Picker,
  RefreshControl
} from 'react-native';
import {Icon, Button, Divider} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import {testList} from '../src/test-constants/TestList';
import {InventoryHeader, InventoryListRow} from '../components/InventoryFlatList';
import {GlobalState} from '../Shared/GlobalState'
import * as dblib from '../src/lib/DBLib.js';

import {mainstyles, colorstyles} from '../Shared/mainstyles'


class InventoryListScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      originalInventoryList: testList,
      inventoryList: null, //testList,// GlobalState.inventoryList,
      categoryList: ["All Categories"], // ["All Categories","Grocery","Pet","Frozen"],// null,
      countModalVisible: false,
      currentModalItem: null,
      itemNameSort: false,
      countSort: false,
      categorySort: false,
      priceSort: false,
      nameIcon: null,
      countIcon: null,
      categoryIcon: null,
      priceIcon: null,
      categoryPicker: '0',
      currentModalItemCount: '',
      didUpdate: false,
      modalErrorMsg: "",
    };
  }

  // Get the category list!
  async getData() {
    try {
      var categoryData = await dblib.getAllItemsCategoriesPromise();
      var itemList = await dblib.getAllItemsArrayPromise()
      this.setState({
        categoryList: categoryData,
        inventoryList: itemList,
        originalInventoryList: itemList
      })
    } catch(err) {
      console.log('Uh oh, spadoodios: ' + err.message);
    }
  }

  async componentDidMount(){
    await this.getData();

  }


  static navigationOptions = ({navigation}) => ({
      header: null
  })

  setCountModalVisible = (visible, item) => {
    this.setState(prevState => {return {...prevState, countModalVisible: visible, currentModalItem: item}})
  }

  renderHeader = () => {
    //return <InventoryHeader/>
    const InventoryHeader =
        <View style={{
      // backgroundColor: colorstyles.turquoise,
          backgroundColor: '#4c98cf',
      paddingBottom: 5
    }}>

      <View style={{
        flexDirection: 'row',
        paddingTop: 5,
        paddingLeft: '2%',
        alignItems: 'center'
      }}>
        <TouchableOpacity style={{width: '30%'}} onPress={sortItemName.bind(this)}>
          <View style={{
            paddingVertical: 5,
            paddingHorizontal: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text numberOfLines={1} style={styles.textItem}>
              Item Name
            </Text>

            <Icon
                name= {this.state.nameIcon}
                type='evilicon'/>
          </View>
        </TouchableOpacity>
        <View style={styles.spacer}/>
        <TouchableOpacity style={{
          width: '20%',
          paddingRight: 5,
          textAlign: 'right'
        }} onPress={sortCount.bind(this)}>
          <View style={{
            paddingVertical: 5,
            paddingHorizontal: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text style={[styles.textItem, {textAlign: 'right', width: '100%'}]}>Count</Text>
            <Icon
                name= {this.state.countIcon}
                type='evilicon'/>
          </View>

        </TouchableOpacity>
        <View style={styles.spacer}/>
        <TouchableOpacity style={{
          width: '28%',
          paddingRight: 5
        }} onPress={sortCategory.bind(this)}>
          <View style={{
            paddingVertical: 5,
            paddingHorizontal: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text numberOfLines={1} style={[styles.textItem, {textAlign: 'right', width: '100%'}]}>Category</Text>
            <Icon
                name= {this.state.categoryIcon}
                type='evilicon'/>
          </View>

        </TouchableOpacity>
        <View style={styles.spacer}/>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '18%', paddingRight: 3}}>
          <TouchableOpacity onPress={sortPrice.bind(this)}>
            <View style={{
              paddingVertical: 5,
              paddingHorizontal: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text numberOfLines={1} style={styles.textItem}>Price</Text>
              <Icon
                  name= {this.state.priceIcon}
                  type='evilicon'/>
            </View>

          </TouchableOpacity>
        </View>
      </View>
    </View>
    function sortItemName() {
      let sortToggle = this.state.itemNameSort;
      let sortedList = '';
      let iconImg;
          if (this.state.itemNameSort) {
            sortedList = this.state.inventoryList.sort((a, b) => a.name.localeCompare(b.name));
            iconImg = 'chevron-up';
          } else {
            sortedList = this.state.inventoryList.sort((a, b) => b.name.localeCompare(a.name));
            iconImg = 'chevron-down';
          }
          this.setState({
            inventoryList: sortedList,
            itemNameSort: !sortToggle,
            nameIcon: iconImg,
            countIcon: null,
            categoryIcon: null,
            priceIcon: null
          });
      this.forceUpdate();
      console.log(this.state.itemNameSort);
    }
    function sortCount() {
      let sortToggle = this.state.countSort;
      let sortedList = '';
      let iconImg;
      if (this.state.countSort) {
        sortedList = this.state.inventoryList.sort((a, b) => a.itemCount - b.itemCount);
        iconImg = 'chevron-up';
      } else {
        sortedList = this.state.inventoryList.sort((a, b) => b.itemCount - a.itemCount);
        iconImg = 'chevron-down';
      }
      this.setState({
        inventoryList: sortedList,
        countSort: !sortToggle,
        nameIcon: null,
        countIcon: iconImg,
        categoryIcon: null,
        priceIcon: null
      });

      this.forceUpdate();
      console.log(this.state.countSort);
    }

    function sortCategory() {
      let sortToggle = this.state.categorySort;
      let sortedList = '';
      let iconImg;
      if (this.state.categorySort) {
        sortedList = this.state.inventoryList.sort((a, b) => a.category.localeCompare(b.category));
        iconImg = 'chevron-up';
      } else {
        sortedList = this.state.inventoryList.sort((a, b) => b.category.localeCompare(a.category));
        iconImg = 'chevron-down';
      }
      this.setState({
        inventoryList: sortedList,
        categorySort: !sortToggle,
        nameIcon: null,
        countIcon: null,
        categoryIcon: iconImg,
        priceIcon: null
      });

      this.forceUpdate();
      console.log(this.state.categorySort);
    }

    function sortPrice() {
      let sortToggle = this.state.priceSort;
      let sortedList = '';
      let iconImg;
      if (this.state.priceSort) {
        sortedList = this.state.inventoryList.sort((a, b) => a.price - b.price);
        iconImg = 'chevron-up';
      } else {
        sortedList = this.state.inventoryList.sort((a, b) => b.price - a.price);
        iconImg = 'chevron-down';
      }
      this.setState({
        inventoryList: sortedList,
        priceSort: !sortToggle,
        nameIcon: null,
        countIcon: null,
        categoryIcon: null,
        priceIcon: iconImg
      });

      this.forceUpdate();
      console.log(this.state.priceSort);
    }

  return InventoryHeader;
  }


  navigateAdd = NavigationActions.navigate({
    routeName: 'ItemDetails',
    params: {
      operation: 'add',
      from: 'ItemList'
    }
  })

  navigateEdit = NavigationActions.navigate({
    routeName: 'ItemDetails',
    params: {
      operation: 'edit',
      from: 'ItemList'
    }
  })

  onPickerValueChange = (value, string) => {
    if (value == '0') {
      // Show all items
      this.setState({
        categoryPicker: value,
        inventoryList: this.state.originalInventoryList
      });
    }
    else {
      // Show filtered items
      console.log(this.state.categoryList[value]);
      var filteredList = this.state.originalInventoryList.filter(obj => {
        return obj.category == this.state.categoryList[value]
      })
      this.setState({
        categoryPicker: value,
        inventoryList: filteredList
      });
    }

    this.forceUpdate();
  }
 // TODO fix the numerical compare
  // TODO Undefined

  _onRefresh = () => {
    this.setState({
      refreshing: true,
      nameIcon: null,
      countIcon: null,
      categoryIcon: null,
      priceIcon: null,
      categoryPicker: '0'
    });
    this.getData().then(() => {
      this.setState({refreshing: false});
      this.forceUpdate();
    });
  }

  _modalCountUpdate = () => {
    var isNumber = /^\d+$/.test(this.state.currentModalItemCount);
    if (this.state.currentModalItemCount == "" || !isNumber) {
      this.setState(state => {return {...state, modalErrorMsg: "The count needs to be a number."}});
    }
    else {
      dblib.updateItem(this.state.currentModalItem.itemCode, 'itemCount', this.state.currentModalItemCount);
      if (this.state.modalErrorMsg != "") {
        this.setState(state => {return {...state, modalErrorMsg: ""}})
      }
      this.setCountModalVisible(false);


    }
  }


  render() {

    return (
     <View style={styles.MainContainer}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
                  refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                  }
      >
        <View style={{height: 40, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-end'}}>
          <Text style={styles.title}>Inventory</Text>
          <Picker
              selectedValue={this.state.categoryPicker}
              style={{height: 30, width: 170}}
              onValueChange={this.onPickerValueChange.bind(this)}
              >
            {this.state.categoryList.map((item, index) => {
              return (<Picker.Item label={item} value={index} key={index}/>)
            })}
          </Picker>
      </View>
      <Modal animationType="fade" transparent={true} visible={this.state.countModalVisible}>
          <View style={mainstyles.modal}>
            <Text>{this.state.modalErrorMsg}</Text>
            <Text style={{
                fontSize: 22,
                textAlign: 'center',
                paddingBottom: 20
              }}>Update Item Count</Text>
            <TextInput style={[mainstyles.inputBox, {marginBottom: 10}]}
                       onChangeText={(text) => this.setState({currentModalItemCount: text})}
                       placeholder={this.state.currentModalItem != null ?
                this.state.currentModalItem.itemCount.toString() : "0"}/>

              <Button raised title="Update"
                      onPress={() => {
                        console.log(this.state.currentModalItemCount);
                        this._modalCountUpdate();
                        this.setState(state => {return {...state, currentModalItemCount: ''}})
                        this.getData();
                      }}
                      titleStyle={[mainstyles.buttonPadding, {width: '75%'}]} />
            <View style={{
                height: 15
              }}/>
            <Button type='outline' raised onPress={() => {
                this.setCountModalVisible(false)
              }} title="Close" titleStyle={[mainstyles.buttonPadding, {width: '75%'}]}/>
          </View>
        </Modal>

      <FlatList data={this.state.inventoryList} extraData={this.state} renderItem={({item}) =>
        <InventoryListRow item={item} press={() => this.props.navigation.navigate('ItemDetails', {
          operation: 'edit',
          from: 'ItemList',
          name: item.name,
          key: item.key,
          category: item.category,
          barcode: item.barcode,
          description: item.description,
          itemCode: item.itemCode,
          itemCount: item.itemCount,
          minThreshold: item.minThreshold,
          price: item.price,
          user: item.user,
          cost: item.cost,})}
          openModal={() => this.setCountModalVisible(true, item)}/>}
          ListHeaderComponent={this.renderHeader}
      >
      </FlatList>
     </ScrollView>
       <TouchableOpacity onPress={() => this.props.navigation.dispatch(this.navigateAdd)} style={{
         justifyContent: 'center',
         flexDirection: 'row',
         paddingTop: 10,
         paddingBottom: 10,
         paddingRight: 5,
         alignItems: 'center'
       }}>
         <Button
             icon={
               <Icon
                   name='plus-circle'
                   type='font-awesome'
                   color='#4c98cf'
                    />
             }
             iconLeft
             raised
             title="  Add New Item"
             onPress={() => this.props.navigation.dispatch(this.navigateAdd)}
         />
       </TouchableOpacity>

     </View>
    );
  }
}

const styles = StyleSheet.create({
  textItem: {
    fontSize: 18,
    marginRight: 2,
    color: "white"
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    //color: '#34495e',
    color: '#4c98cf',
    width: '55%'
  },
  spacer: {
    width: 5
  },
  TouchableOpacityStyle:{

    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  },
  MainContainer :{

    justifyContent: 'center',
    flex:1,
    margin: 10
  }
})

export default InventoryListScreen
