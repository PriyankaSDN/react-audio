import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Constants from '../Constants'
const window = Dimensions.get("window");

export default function RecordButton(props) {
  const { isRecording, isFinishRecorded, onPressHandler } = props

  let text = ''
  let startText = 'Tap to start'
  if (isRecording) {
    text = 'Recording...'
    startText = ''
  }
  if (isFinishRecorded) {
    text = ''
    startText = 'Tap to start'
  }

  if (isRecording) {
    return (
      <View style={styles.button}>
        <Icon name='microphone' size={105} color={Constants.APP_COLOR} />
        <Text style={styles.text}>{text}</Text>
      </View>
    )
  }
  return (
    <View style={{alignItems:'center', justifyContent:'center', paddingBottom:5}}>
      <TouchableOpacity onPress={onPressHandler} >
        {/* <Icon name='microphone' size={105} color={Constants.CUSTOM_RED}/> */}
        <Image style={{
          width: 180,
          height: 180,
          resizeMode: 'stretch',

        }}
          source={require("../../../../assets/record.png")}>
        </Image>


      </TouchableOpacity>
      <Text style={styles.textStart}>{startText}</Text>
    </View>
  )
}

RecordButton.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  isFinishRecorded: PropTypes.bool.isRequired,
  onPressHandler: PropTypes.func,
}

const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: Constants.APP_COLOR,
    marginBottom: 10,
  },

  text: {
    paddingTop: 5,
    fontSize: 16,
    color: '#bbbbbb',
  },

  textStart: {
    paddingTop: 10,
     marginLeft:5,
    justifyContent: 'center',
    fontSize: 16,
    alignItems: 'center',
    color: '#bbbbbb',
  },
})
