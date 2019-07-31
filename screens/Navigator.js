import AccountSignUp from './AccountSignUp'
import InventoryListScreen from './InventoryList'
import ItemDetails from './ItemDetails'
import Login from './Login'
import SearchScreen from './SearchScreen'
import UserListScreen from './UserListScreen'
import UserProfileScreen from './UserProfileScreen'
import TabNavigator from './TabNavigator'
import {
  createBottomTabNavigator,
  createMaterialBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";





const AuthStack = createStackNavigator({ MyLogin: Login, AccountSignUp: AccountSignUp});
const LoginSwitch = createSwitchNavigator({TabNavigator: TabNavigator})
const AppContainer = createAppContainer(createSwitchNavigator(
  {Auth: AuthStack,
  App: LoginSwitch,
  },

  {
    initialRouteName: 'Auth'
  }
))
export default AppContainer;
