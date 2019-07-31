import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  ScrollView
} from 'react-native';
import {Icon, Button} from 'react-native-elements';

import {mainstyles, colorstyles} from '../Shared/mainstyles';
import {GlobalState} from '../Shared/GlobalState'

export const InventoryListRow = props => (

//TO-DO: Update the props, eg. props.itemname, in this with actual data attributes from the database
    <View style={{
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '2%',
        alignItems: 'flex-end'
    }}>
        <TouchableOpacity onPress={props.press} style={{
            width: '30%',
            paddingRight: 5
        }}>
            <Text numberOfLines={1} style={[
                styles.textItem, {
                    color: colorstyles.lightBlue
                }
            ]}>
                {props.item.name}
            </Text>
        </TouchableOpacity>
  <View style={styles.spacer}/>
  <View style={{
      width: '20%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: 5
    }}>
    <Text style={styles.textItem}>{props.item.itemCount}</Text>
    <TouchableOpacity onPress={props.openModal}>
      {
        props.item.count > 0
          ? (<Icon name="edit" type="materialicons" color={colorstyles.lightBlue} size={20}/>)
          : (<Icon name="add-circle" type="materialicons" color={colorstyles.lightBlue} size={20}/>)
      }
    </TouchableOpacity>
  </View>

  <View style={{
      width: '28%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: 5
    }}>
    <Text numberOfLines={1} style={styles.textItem}>{props.item.category}</Text>
  </View>
  <View style={{
      width: '18%',
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }}>
    <Text numberOfLines={1} style={styles.textItem}>{props.item.price}</Text>
  </View>
</View>)

export const InventoryHeader = props => (<View style={{
    backgroundColor: colorstyles.turquoise,
    paddingBottom: 5
  }}>

  <View style={{
      flexDirection: 'row',
      paddingTop: 5,
      paddingLeft: '2%',
    }}>
    <TouchableOpacity style={{width: '30%'}} onPress={sortButton.bind(this, 'Item Name')}>
      <Text numberOfLines={1} style={styles.textItem}>
        Item Name
      </Text>
    </TouchableOpacity>
    <View style={styles.spacer}/>
    <TouchableOpacity style={{
        width: '20%',
        paddingRight: 5,
        textAlign: 'right'
      }}>
      <Text style={[styles.textItem, {textAlign: 'right', width: '100%'}]}>Count</Text>
    </TouchableOpacity>
    <View style={styles.spacer}/>
    <TouchableOpacity style={{
        width: '28%',
        paddingRight: 5
      }}>
      <Text numberOfLines={1} style={[styles.textItem, {textAlign: 'right', width: '100%'}]}>Category</Text>
    </TouchableOpacity>
    <View style={styles.spacer}/>
    <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '18%', paddingRight: 3}}>
    <TouchableOpacity>
      <Text numberOfLines={1} style={styles.textItem}>Price</Text>
    </TouchableOpacity>
  </View>
  </View>
</View>)

function sortButton(fieldName) {
    console.log('Sort' + this.item);
}

const styles = StyleSheet.create({
  textItem: {
    fontSize: 18,
    marginRight: 2,
  },
  title: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e',
    width: '65%'
  },
  spacer: {
    width: 5
  }
})

