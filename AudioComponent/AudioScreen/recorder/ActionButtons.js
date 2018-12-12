import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Button
} from 'react-native'

import IconButton from './IconButton'
import TouchableOpacityClick from './TochableClick';
// import Icon from 'react-native-vector-icons/FontAwesome'
// import Constants from '../Constants'

export default function ActionButtons(props) {
  const {
    isFinishRecorded,
    isRecording,
    playPauseIcon,
    playPauseHandler,
    stopRecording
  } = props
  return (
    <View style={styles.buttonGroup}>


      <TouchableOpacityClick
        isDisabled={isFinishRecorded || !isRecording}
        onPressHandler={stopRecording}>
      </TouchableOpacityClick>


    </View>
  )
}

ActionButtons.propTypes = {
  isFinishRecorded: PropTypes.bool.isRequired,
  isRecording: PropTypes.bool.isRequired,
  playPauseIcon: PropTypes.string.isRequired,
  playPauseHandler: PropTypes.func.isRequired,
  stopRecording: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    flexDirection: 'column',
  },
})
