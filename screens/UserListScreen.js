import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import {mainstyles, colorstyles} from '../Shared/mainstyles';
import { GlobalState, GlobalStateVar } from '../Shared/GlobalState.js';
import * as dblib from '../src/lib/DBLib.js';

const UserRow = props => (
  <TouchableOpacity onPress={props.press}>
    <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
      <Text style={styles.listItemFont}>
        {props.firstName} {props.lastName}
      </Text>
      <View>
        {props.isAdmin ? (
          <Icon
            name="supervisor-account"
            type="materialicons"
            color={colorstyles.lightBlue}
            size={25}
          />
        ) : null}
      </View>
    </View>
  </TouchableOpacity>
);
const keyExtractor = (item, index) => {
  return item.index;
};

class UserListScreen extends React.PureComponent {
  // TODO: Replace with Globalstate vars
    state = {
      userData: [],
      refreshing: false
    };

  async getData() {
    try {
      var getUserData = await dblib.getAllUsersArrayPromise();
      var sortedList = getUserData.sort((a, b) => a.firstName.localeCompare(b.firstName));


      this.setState({
        userData: sortedList
      })
    } catch(err) {
      console.log('Uh oh, spadoodios: ' + err.message);
    }
  }

  async componentDidMount(){
    await this.getData();
  }

// End TODO


  static navigationOptions = ({navigation}) => ({

      header: null
  })

  navUserUpdate = inUser =>
  (NavigationActions.navigate({
  routeName: 'UserProfileScreen',
  params: {
    operation: "update",
    user: inUser
  }
}))

navUserAdd = NavigationActions.navigate({
  routeName: 'UserProfileScreen',
  params: {
    operation: "add",
    from: 'UserList'
  }
})
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getData().then(() => {
      this.setState({refreshing: false});
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>User List</Text>
        <FlatList
          data={this.state.userData}
           renderItem={({ item }) => <UserRow {...item} press={() =>
            {
              this.props.navigation.navigate("UserProfileScreen", {user: {...item}, operation: "update", from: 'UserList'})
             //this.props.navigation.dispatch(this.navUserUpdate({item}));
           }}
              />}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />
          }

        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(this.navUserAdd)}>
            <Icon
              name="add-circle"
              type="materialicons"
              color={colorstyles.lightBlue}
              size={65}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  listItemFont: {fontSize: 20, width: '85%', paddingLeft: '2%'},
  buttonContainer: {marginBottom: 50}
});

export default UserListScreen
