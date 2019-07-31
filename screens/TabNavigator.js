import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Login from "./Login"
import InventoryListScreen from "./InventoryList"
import AccountSignUp from "./AccountSignUp"
import ItemDetails from "./ItemDetails"
import UserListScreen from "./UserListScreen"
import UserProfileScreen from "./UserProfileScreen"
import SearchScreen from "./SearchScreen"
import DemoPage from './DemoPage'
import {Icon} from 'react-native-elements';
import {mainstyles, colorstyles} from '../Shared/mainstyles'

console.disableYellowBox = true;

const ItemStack = createSwitchNavigator({ItemList: InventoryListScreen, ItemDetails: ItemDetails});
const UserStack = createSwitchNavigator({UserList: UserListScreen, UserProfileScreen: UserProfileScreen})
const SearchStack = createSwitchNavigator({SearchScreen: SearchScreen, ItemDetails: ItemDetails});

const TabNavigator = createBottomTabNavigator({
    Items: {screen: ItemStack,
    navigationOptions: {
      tabBarIcon: () => (<Icon name='list' type='materialicons' size={25} color={colorstyles.lavender}/>),
    }},
    Search: {
      screen: SearchStack,
      navigationOptions:
        {tabBarIcon: () => (<Icon name='search' type='materialicons' size={25} color={colorstyles.lavender} />)}
      },
    Users: {
      screen: UserStack,
      navigationOptions:
        {tabBarIcon: () => (<Icon name='people-outline' type='materialicons' size={25} color={colorstyles.lavender} />)}
      },
    Profile: {
      screen: UserProfileScreen,
      navigationOptions:
        {tabBarIcon: () => (<Icon name='person' type='materialicons' size={25} color={colorstyles.lavender} />)}
      },

  }, {tabBarOptions: {
    showLabel: false,
    inactiveTintColor: colorstyles.mediumBlue,
  }
});

export default createAppContainer(TabNavigator);
