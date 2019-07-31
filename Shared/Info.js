import React from 'react'
import { Text, TextInput, View } from 'react-native';

import styles from './styles'

const InputInfo = (value) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputText}>{value}</Text>
            <TextInput/>
        </View>
    )
}

export default InputInfo
