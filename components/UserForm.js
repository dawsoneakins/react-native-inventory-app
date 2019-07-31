import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Icon, Button } from 'react-native-elements';


export const CheckBox = props =>
  props.checked ? (
    <Icon name="check-box" type="material" size={30} />
  ) : (
    <Icon name="check-box-outline-blank" type="material" size={30} />
  );

export const FormRow = props => {
  return (
    <View style={styles.formRow}>
      <Text style={styles.formRowText}>{props.label}</Text>
      {props.type == 'text' && props.permissions && (
        <TextInput style={styles.inputBox} value={props.text} onChangeText={props.onChange} />
      )}
      {props.type == 'text' && !props.permissions && (
        <Text style={styles.formRowText}>{props.text}</Text>
      )}
      {props.type == 'password' && (
        <TextInput style={styles.inputBox} value={props.text} secureTextEntry={true} onChangeText={props.onChange}/>
      )}
      {props.type == 'check' &&
        props.checked &&
        (props.permissions ? (
          <View>
            <TouchableOpacity onPress={props.click}>
              <Icon name="check-box" type="material" size={30} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Icon name="check-box" type="material" size={30} />
          </View>
        ))}
      {props.type == 'check' &&
        !props.checked &&
        (props.permissions ? (
          <View>
            <TouchableOpacity onPress={props.click}>
              <Icon name="check-box-outline-blank" type="material" size={30} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Icon name="check-box-outline-blank" type="material" size={30} />
          </View>
        ))}
      {props.type == 'button' && (
        <Button
          title={props.buttonText}
          type="solid"
          raised
          titleStyle={styles.buttonPadding}
          onPress={props.press}
        />
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
  },
  title: {
    marginTop: 30,
    marginBottom: 25,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
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
  buttonPadding: { paddingLeft: 10, paddingRight: 10 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
  },
});
