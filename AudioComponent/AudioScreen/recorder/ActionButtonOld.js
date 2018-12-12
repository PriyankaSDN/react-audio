import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet
} from 'react-native'

import IconButton from './IconButton'

export default function ActionButtonOld(props) {
  const {
    isFinishRecorded, 
    isRecording, 
    playPauseIcon, 
    playPauseHandler, 
    stopRecording
  } = props
  return (
    <View style={styles.buttonGroup}>
      <IconButton 
        iconName='stop-circle-o' 
        isDisabled={isFinishRecorded || !isRecording} 
        onPressHandler={stopRecording} 
      />
      <IconButton 
        iconName={playPauseIcon}
        isDisabled={!isFinishRecorded || isRecording} 
        onPressHandler={playPauseHandler} 
      />
    </View>
  )
}

ActionButtonOld.propTypes = {
  isFinishRecorded: PropTypes.bool.isRequired,
  isRecording: PropTypes.bool.isRequired,
  playPauseIcon: PropTypes.string.isRequired,
  playPauseHandler: PropTypes.func.isRequired,
  stopRecording: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
  },
})
