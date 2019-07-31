import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as dblib from '../src/lib/DBLib';

function addUserDemo() {
    dblib.addUser('DemoUser', 'Demo', 'User', 'demouser@example.com', 'demopassword', '123 Demo Lane', 'DemoCity', 'OH', '12345', '555-555-5555');
}

function deleteUserDemo() {
    dblib.deleteUser('DemoUser');
}

function deactivateUserDemo() {
    dblib.deactivateUser('DemoUser');
}

function updateUserDemo() {
    dblib.updateUser('DemoUser', 'firstName', 'UpdatedDemoFirstName!')
}

export default class DemoPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.headerStyle}>Demo Buttons</Text>
            <Button
        onPress={addUserDemo}
        title="Add User"
        color="#4ae8e0"
        accessibilityLabel="Add user to firebase"
            />
            <Button
        onPress={updateUserDemo}
        title="Update User"
        color="#5f5394"
        accessibilityLabel="Update user in firebase"
            />

            <Button
        onPress={deactivateUserDemo}
        title="Deactivate User"
        color="#4874a8"
        accessibilityLabel="Add user to firebase"
            />
            <Button
        onPress={deleteUserDemo}
        title="Delete User"
        color="#4c98a8"
        accessibilityLabel="Delete user from firebase"
            />


            </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    title: {
        marginTop: 50,
        marginBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    headerStyle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '300',
        marginBottom: 24
    },
});
