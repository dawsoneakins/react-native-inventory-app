import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView, Switch, FlatList, TouchableOpacity, TouchableHighlight, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import {testList} from '../src/test-constants/TestList'
import {InventoryHeader, InventoryListRow} from '../components/InventoryFlatList'
import {NavigationActions} from 'react-navigation';
import { SearchableFlatList } from "react-native-searchable-list";
import * as dblib from '../src/lib/DBLib.js';

export default class SearchScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
    header: null
})

constructor(props) {
    super(props);
    this.state = {
        data: [],
        searchTerm: "",
        searchAttribute: "name",
        ignoreCase: true,
        searchname: true,
        refreshing: false,
    };
}


navigateEdit = NavigationActions.navigate({
    routeName: 'ItemDetails',
    params: {
        operation: 'edit',
        from: 'SearchScreen'
    }
})

async getData() {
        try {
            var itemData = await dblib.getAllItemsArrayPromise();
            this.setState({
                data: itemData
            })
        } catch(err) {
            console.log('Uh oh, spadoodios: ' + err.message);
        }
}

async componentDidMount(){
    await this.getData();
}

renderHeader = () => {
    return <InventoryHeader/>
}

alertButton(buttonPushed) {
        alert('I pushed the button for: ' + buttonPushed);

    }


alertButtonLong(buttonPushed) {
        alert('I long pressed the button for: ' + buttonPushed);
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getData().then(() => {
            this.setState({refreshing: false});
        });
    }

    render() {
        const { data, searchTerm, searchAttribute, ignoreCase, searchName } = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView>
                        <View style={styles.searchbox}>
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder={
                                    searchName
                                        ? "Search Item Code"
                                        : "Search Item Name"
                                }
                                onChangeText={searchTerm => this.setState({ searchTerm })}
                            />
                            {/*<Icon*/}
                            {/*    name="search"*/}
                            {/*    type="materialicon"*/}
                            {/*    color="#517fa4"*/}
                            {/*    size={38}*/}
                            {/*/>*/}
                            <View>
                                <Switch
                                    style={styles.switch}
                                    value={searchName}

                                    onValueChange={value => {
                                        this.setState({ searchName: value });
                                        this.state.searchName == true ? this.setState({searchAttribute: "name"}) :
                                            this.setState({searchAttribute: "itemCode"});
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{padding: 20}} />
                        <SearchableFlatList
                            style={styles.list} data={data} searchTerm={searchTerm}
                            searchAttribute={searchAttribute} ignoreCase={ignoreCase}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }
                            renderItem={({ item }) => (

                                <React.Fragment>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('ItemDetails', {
                                        operation: 'edit',
                                        from: 'SearchScreen',
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
                                        cost: item.cost,})} onLongPress={() => this.alertButtonLong(item.name)} underlayColor="white">
                                        <View style={styles.flatview}>
                                            <Text style={styles.name}>{item.name}</Text>
                                            <Text style={styles.itemCode}>Item code: {item.itemCode}</Text>
                                        </View>
                                    </TouchableHighlight>
                                </React.Fragment>
                            )}
                            keyExtractor={item => item.key}

                            />
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        marginTop: 30,
        marginBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    input: {
        width: 300,
        height: 35,
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    searchbox: {
        flexDirection: 'row',
        borderColor: 'gray',
        backgroundColor: '#fff',
        borderWidth: 1,
        marginRight: 20,},
    searchInputs: {
        flexDirection: "row"
    },
    search: {
        flex: 8,
        marginBottom: 20,
        borderColor: "#524364",
        borderBottomWidth: 3,
        padding: 10
    },
    switch: {
        flex: 2

},
    listItem: {
        padding: 10,
        borderColor: "#524364",
        borderWidth: 1,
        borderRadius: 10,
        margin: 2,
        backgroundColor: "#4ae8e0"
    },
    info: {
        padding: 10,
        marginTop: 20,
        borderColor: "#4ae8e0",
        borderWidth: 1
    },
    row: {
        flexDirection: "row",
        backgroundColor: "#4ae8e0"
    },
    row1: {
        flexDirection: "row"
    },
    prop: {
        flex: 1,
        padding: 10
    },
    val: {
        alignSelf: "center",
        flex: 1
    },
    flatview: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
    },
    name: {
        fontFamily: 'Verdana',
        fontSize: 18
    },
    itemCode: {
        color: '#4ae8e0'
    }
});
