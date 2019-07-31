import {StyleSheet} from 'react-native';

export const colorstyles = {
  turquoise: '#4AE8E0',
  lightBlue: '#4C98CF',
  mediumBlue: '#4874A8',
  lavender: '#5F5394',
  purple: '#524364',
  modalBlue: '#EEF5FA'
}

export const mainstyles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '80%',
    paddingTop: 30,
    paddingBottom: 50,
    marginTop: '25%',
    marginLeft: '10%',
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colorstyles.modalBlue,
    borderRadius: 10
  },
  inputBox: {
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 2,
    width: '75%',
    height: 45,
    fontSize: 20,
    paddingLeft: 5,
  },
  buttonPadding: { paddingLeft: 10, paddingRight: 10, fontSize: 22 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    width: '100%',
    paddingBottom: 10
  },
  inputContainer: {
      flexDirection: 'row',
      marginBottom: 10,
  },
  title: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },


});
